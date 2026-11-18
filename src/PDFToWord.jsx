
import { useState } from 'react';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:3001'
    : 'https://pdf-converter-elite.onrender.com')
).replace(/\/+$/, '');

export default function PDFToWord() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleFile(event) {
    const selected = event.target.files?.[0];

    setError('');
    setSuccess('');
    setFile(null);

    if (!selected) return;

    if (!/\.pdf$/i.test(selected.name)) {
      setError('Please select a valid PDF file.');
      return;
    }

    if (selected.size > 20 * 1024 * 1024) {
      setError('Maximum file size is 20 MB.');
      return;
    }

    setFile(selected);
  }

  async function convertToWord() {
    if (!file || loading) return;

    setLoading(true);
    setError('');
    setSuccess('');

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      240000
    );

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${API_BASE_URL}/api/pdf-to-word`,
        {
          method: 'POST',
          body: formData,
          signal: controller.signal
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(
          data.error || 'Conversion failed. Please try again.'
        );
      }

      const blob = await response.blob();

      const header = new Uint8Array(
        await blob.slice(0, 2).arrayBuffer()
      );

      if (header[0] !== 80 || header[1] !== 75) {
        throw new Error('Invalid Word file received.');
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, '') + '.docx';

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 30000);

      setSuccess('Conversion successful! Your Word file has been downloaded.');

    } catch (err) {
      setError(
        err.name === 'AbortError'
          ? 'Conversion timed out. Please try a smaller PDF.'
          : err.message || 'Conversion failed.'
      );
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <div style={{
      maxWidth: '650px',
      width: '100%',
      margin: '25px auto',
      padding: '24px',
      boxSizing: 'border-box',
      background: '#ffffff',
      border: '1px solid #dbe3ed',
      borderRadius: '16px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      textAlign: 'center',
      color: '#1e293b'
    }}>

      <h2 style={{ marginTop: 0 }}>
        Convert PDF to Word
      </h2>

      <p style={{ color: '#475569', lineHeight: 1.6 }}>
        Convert PDF documents into Word files while preserving
        text, images, tables and layout as closely as possible.
      </p>

      <div style={{
        border: '2px dashed #2563eb',
        background: '#eff6ff',
        padding: '28px 14px',
        borderRadius: '12px',
        margin: '22px 0'
      }}>

        <label
          htmlFor="pdf-word-upload"
          style={{
            display: 'inline-block',
            background: '#1d4ed8',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '13px 25px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Select PDF File
        </label>

        <input
          id="pdf-word-upload"
          type="file"
          accept=".pdf,application/pdf"
          disabled={loading}
          onChange={handleFile}
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            opacity: 0
          }}
        />

        <p style={{
          marginBottom: 0,
          overflowWrap: 'anywhere',
          color: '#334155'
        }}>
          {file ? file.name : 'Maximum file size: 20 MB'}
        </p>

      </div>

      <button
        type="button"
        onClick={convertToWord}
        disabled={!file || loading}
        style={{
          width: '100%',
          padding: '15px',
          border: 'none',
          borderRadius: '9px',
          fontSize: '16px',
          fontWeight: 700,
          color: '#ffffff',
          background: !file || loading ? '#64748b' : '#15803d',
          cursor: !file || loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Converting PDF to Word...' : 'Convert to Word'}
      </button>

      {loading && (
        <div role="status" aria-live="polite">
          <progress
            aria-label="PDF conversion in progress"
            style={{ width: '100%', marginTop: '20px' }}
          />

          <p style={{ color: '#475569' }}>
            Please wait. Larger documents or server startup
            may take longer.
          </p>
        </div>
      )}

      {error && (
        <p role="alert" style={{
          color: '#b91c1c',
          background: '#fef2f2',
          padding: '12px',
          borderRadius: '8px'
        }}>
          {error}
        </p>
      )}

      {success && (
        <p role="status" style={{
          color: '#166534',
          background: '#f0fdf4',
          padding: '12px',
          borderRadius: '8px'
        }}>
          {success}
        </p>
      )}

      <p style={{
        fontSize: '13px',
        color: '#475569',
        marginTop: '20px'
      }}>
        Free conversion. No watermark. No registration required.
        Files are temporarily processed on our server.
        Scanned PDFs may not contain editable text. <a href="https://github.com/turaab321-blip/pdf-converter-elite" target="_blank" rel="noopener noreferrer">Source Code (AGPL-3.0)</a>.
      </p>
    </div>
  );
}

