import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function SplitPDF() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function splitPDF() {
    if (!file) return setError('Please select a PDF file.');

    setBusy(true);
    setError('');

    try {
      const source = await PDFDocument.load(await file.arrayBuffer());
      const total = source.getPageCount();
      const selected = new Set();

      for (const part of pages.split(',')) {
        const item = part.trim();

        if (!/^\d+(\s*-\s*\d+)?$/.test(item)) {
          throw new Error('Enter pages like 1,3,5-7.');
        }

        const [start, end = start] = item.split('-').map(Number);

        if (start < 1 || end > total || start > end) {
          throw new Error('Page numbers must be between 1 and ' + total + '.');
        }

        for (let i = start; i <= end; i++) {
          selected.add(i - 1);
        }
      }

      if (!selected.size) {
        throw new Error('Enter at least one page number.');
      }

      const result = await PDFDocument.create();
      const copied = await result.copyPages(
        source,
        [...selected].sort((a, b) => a - b)
      );

      copied.forEach(page => result.addPage(page));

      const bytes = await result.save();
      const url = URL.createObjectURL(
        new Blob([bytes], { type: 'application/pdf' })
      );

      const link = document.createElement('a');
      link.href = url;
      link.download = 'split.pdf';
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      setError(err.message || 'Unable to split this PDF.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section style={{
      maxWidth: 650,
      margin: '50px auto',
      padding: 30,
      background: 'white',
      borderRadius: 16,
      textAlign: 'center'
    }}>
      <h2>Split PDF</h2>
      <p>Extract selected pages into a new PDF.</p>

      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={e => {
          setFile(e.target.files[0] || null);
          setError('');
        }}
      />

      <p>Enter pages to extract (example: 1,3,5-7)</p>

      <input
        value={pages}
        onChange={e => setPages(e.target.value)}
        placeholder="1,3,5-7"
        style={{
          padding: 14,
          width: '100%',
          maxWidth: 320,
          border: '1px solid #ddd',
          borderRadius: 10
        }}
      />

      {error && <p style={{color:'red'}}>{error}</p>}

      <div style={{marginTop:20}}>
        <button
          onClick={splitPDF}
          disabled={busy}
          style={{
            background: '#e44747',
            color: 'white',
            border: 0,
            padding: '14px 25px',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          {busy ? 'Processing...' : 'Split PDF'}
        </button>
      </div>
    </section>
  );
}