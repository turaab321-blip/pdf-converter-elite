import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function mergePDFs() {
    if (files.length < 2) {
      setError('Please select at least two PDF files.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const merged = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        pages.forEach(page => merged.addPage(page));
      }

      const output = await merged.save();
      const blob = new Blob([output], {
        type: 'application/pdf'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'merged.pdf';
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      setError(
        'Unable to merge these PDFs. Check that the files are valid and not password-protected.'
      );
    } finally {
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
      <h2>Merge PDF Files</h2>
      <p>Combine multiple PDF files into one document.</p>

      <input
        type="file"
        accept=".pdf,application/pdf"
        multiple
        onChange={e => {
          setFiles(Array.from(e.target.files));
          setError('');
        }}
      />

      <p>{files.length} file(s) selected</p>

      {files.map((file, index) => (
        <p key={index}>{index + 1}. {file.name}</p>
      ))}

      {error && <p style={{color:'red'}}>{error}</p>}

      <button
        onClick={mergePDFs}
        disabled={loading}
        style={{
          background: '#e44747',
          color: '#fff',
          border: 0,
          padding: '14px 25px',
          borderRadius: 10,
          cursor: 'pointer',
          fontWeight: 700
        }}
      >
        {loading ? 'Merging...' : 'Merge PDF'}
      </button>
    </section>
  );
}