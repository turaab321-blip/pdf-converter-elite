
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { zipSync, strToU8 } from 'fflate';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function escapeXML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
}

function columnName(index) {
  let result = '';
  let n = index + 1;

  while (n > 0) {
    n--;
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }

  return result;
}

function createExcel(rows) {
  const rowXML = rows.map((row, rowIndex) => {
    const cells = row.map((value, colIndex) => {
      const address = `${columnName(colIndex)}${rowIndex + 1}`;

      return (
        `<c r="${address}" t="inlineStr">` +
        `<is><t xml:space="preserve">` +
        `${escapeXML(value)}` +
        `</t></is></c>`
      );
    }).join('');

    return `<row r="${rowIndex + 1}">${cells}</row>`;
  }).join('');

  const worksheet = `<?xml version="1.0" encoding="UTF-8"?>
    <worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
      <sheetData>${rowXML}</sheetData>
    </worksheet>`;

  const workbook = `<?xml version="1.0" encoding="UTF-8"?>
    <workbook
      xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
      xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
      <sheets>
        <sheet name="Sheet1" sheetId="1" r:id="rId1"/>
      </sheets>
    </workbook>`;

  const workbookRels = `<?xml version="1.0" encoding="UTF-8"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
      <Relationship
        Id="rId1"
        Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"
        Target="worksheets/sheet1.xml"/>
    </Relationships>`;

  const rootRels = `<?xml version="1.0" encoding="UTF-8"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
      <Relationship
        Id="rId1"
        Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"
        Target="xl/workbook.xml"/>
    </Relationships>`;

  const contentTypes = `<?xml version="1.0" encoding="UTF-8"?>
    <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
      <Default Extension="rels"
        ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
      <Default Extension="xml" ContentType="application/xml"/>
      <Override PartName="/xl/workbook.xml"
        ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
      <Override PartName="/xl/worksheets/sheet1.xml"
        ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
    </Types>`;

  return zipSync({
    '[Content_Types].xml': strToU8(contentTypes),
    '_rels/.rels': strToU8(rootRels),
    'xl/workbook.xml': strToU8(workbook),
    'xl/_rels/workbook.xml.rels': strToU8(workbookRels),
    'xl/worksheets/sheet1.xml': strToU8(worksheet)
  }, { level: 6 });
}

export default function PDFToExcel() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function convertPDF() {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setLoading(true);
    setError('');

    let pdf = null;

    try {
      const data = new Uint8Array(await file.arrayBuffer());

      pdf = await pdfjsLib.getDocument({ data }).promise;

      // All PDF pages go into ONE Excel sheet.
      const allRows = [];
      let hasText = false;

      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();

        const lines = new Map();

        for (const item of content.items) {
          if (
            typeof item.str !== 'string' ||
            !item.str.trim()
          ) continue;

          hasText = true;

          const x = item.transform[4];
          const y = item.transform[5];
          const key = Math.round(y / 3) * 3;

          if (!lines.has(key)) {
            lines.set(key, []);
          }

          lines.get(key).push({
            x,
            text: item.str.trim()
          });
        }

        const pageRows = [...lines.entries()]
          .sort((a, b) => b[0] - a[0])
          .map(([, items]) =>
            items
              .sort((a, b) => a.x - b.x)
              .map(item => item.text)
          );

        // Append every page's rows to the same sheet.
        allRows.push(...pageRows);
      }

      if (!hasText) {
        throw new Error('No selectable text found.');
      }

      if (allRows.length > 1048576) {
        throw new Error('Excel row limit exceeded.');
      }

      const output = createExcel(allRows);

      const blob = new Blob([output], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download =
        file.name.replace(/\.pdf$/i, '') + '.xlsx';

      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);

    } catch (err) {
      console.error(err);
      setError(
        'Unable to convert this PDF. Please use a PDF containing selectable text.'
      );
    } finally {
      if (pdf) await pdf.destroy();
      setLoading(false);
    }
  }

  return (
    <section style={{
      maxWidth: 650,
      margin: '50px auto',
      padding: 30,
      background: '#fff',
      borderRadius: 16,
      textAlign: 'center'
    }}>
      <h2>PDF to Excel Converter</h2>

      <p>
        Convert all PDF pages into one Excel worksheet.
      </p>

      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={e => {
          setFile(e.target.files?.[0] || null);
          setError('');
        }}
      />

      <p>
        {file ? file.name : 'No file selected'}
      </p>

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      <button
        onClick={convertPDF}
        disabled={loading}
        style={{
          background: '#e44747',
          color: '#fff',
          border: 0,
          padding: '14px 25px',
          borderRadius: 10,
          cursor: loading ? 'wait' : 'pointer',
          fontWeight: 700
        }}
      >
        {loading ? 'Converting...' : 'Convert to Excel'}
      </button>
    </section>
  );
}
