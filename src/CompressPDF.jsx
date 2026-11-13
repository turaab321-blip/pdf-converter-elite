
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + ' KB';
    }
    return (bytes / 1048576).toFixed(2) + ' MB';
  }

  async function compressPDF() {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const bytes = await file.arrayBuffer();

      const pdf = await PDFDocument.load(bytes);

      const compressed = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false
      });

      const originalSize = file.size;
      const compressedSize = compressed.byteLength;

      if (compressedSize >= originalSize) {
        setResult({
          original: originalSize,
          compressed: compressedSize,
          reduced: false
        });
        return;
      }

      const blob = new Blob([compressed], {
        type: 'application/pdf'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download =
        file.name.replace(/\.pdf$/i, '') + '_compressed.pdf';

      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);

      setResult({
        original: originalSize,
        compressed: compressedSize,
        reduced: true
      });

    } catch (err) {
      console.error(err);
      setError(
        'Unable to compress this PDF. Make sure it is valid and not password-protected.'
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
      <h2>Compress PDF</h2>

      <p>
        Try to reduce PDF file size without changing its pages.
      </p>

      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={e => {
          setFile(e.target.files?.[0] || null);
          setError('');
          setResult(null);
        }}
      />

      <p>
        {file
          ? `${file.name} (${formatSize(file.size)})`
          : 'No file selected'}
      </p>

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>
            Original Size: {formatSize(result.original)}
          </p>

          <p>
            New Size: {formatSize(result.compressed)}
          </p>

          {result.reduced ? (
            <p style={{ color: 'green' }}>
              File compressed successfully!
            </p>
          ) : (
            <p style={{ color: '#b45309' }}>
              This PDF could not be made smaller
              with basic compression.
            </p>
          )}
        </div>
      )}

      <button
        onClick={compressPDF}
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
        {loading ? 'Compressing...' : 'Compress PDF'}
      </button>
    </section>
  );
}
