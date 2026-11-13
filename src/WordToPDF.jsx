
import { useState } from 'react';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:3001' : '')
).replace(/\/+$/, '');

export default function WordToPDF() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function convertToPDF() {
    if (!file) {
      setError('Please select a DOCX file.');
      return;
    }

    setBusy(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${API_BASE_URL}/api/word-to-pdf`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Conversion failed.');
      }

      const blob = await response.blob();

      if (!blob.size) {
        throw new Error('The converted PDF is empty.');
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = file.name.replace(/\.docx$/i, '') + '.pdf';

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 60000);

      setSuccess('PDF downloaded successfully!');

    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to convert this document.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      style={{
        maxWidth: 650,
        margin: '50px auto',
        padding: 30,
        background: '#ffffff',
        borderRadius: 18,
        textAlign: 'center',
        boxShadow: '0 12px 35px rgba(20,24,60,0.08)'
      }}
    >
      <h2>Word to PDF</h2>

      <p style={{ color: '#64748b' }}>
        Convert Word documents to PDF while preserving
        their original layout and formatting.
      </p>

      <input
        type="file"
        accept=".docx"
        onChange={e => {
          setFile(e.target.files?.[0] || null);
          setError('');
          setSuccess('');
        }}
      />

      {file && (
        <p style={{ marginTop: 15 }}>
          Selected: {file.name}
        </p>
      )}

      {error && (
        <p style={{ color: '#dc2626' }}>
          {error}
        </p>
      )}

      {success && (
        <p style={{ color: '#16a34a' }}>
          {success}
        </p>
      )}

      <button
        onClick={convertToPDF}
        disabled={busy || !file}
        style={{
          marginTop: 25,
          padding: '15px 30px',
          background: '#f23869',
          color: '#ffffff',
          border: 0,
          borderRadius: 12,
          fontWeight: 700,
          cursor: busy ? 'wait' : 'pointer',
          opacity: busy || !file ? 0.6 : 1
        }}
      >
        {busy ? 'Converting...' : 'Convert to PDF'}
      </button>
    </section>
  );
}
