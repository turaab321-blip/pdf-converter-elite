import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function JPGtoPDF() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function convert() {
    if (!files.length) {
      return setError('Please select at least one image.');
    }

    setBusy(true);
    setError('');

    try {
      const pdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        let image;

        if (file.type === 'image/png') {
          image = await pdf.embedPng(bytes);
        } else if (file.type === 'image/jpeg') {
          image = await pdf.embedJpg(bytes);
        } else {
          throw new Error('Only JPG and PNG images are supported.');
        }

        const page = pdf.addPage([image.width, image.height]);

        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height
        });
      }

      const output = await pdf.save();

      const url = URL.createObjectURL(
        new Blob([output], { type: 'application/pdf' })
      );

      const link = document.createElement('a');
      link.href = url;
      link.download = 'images-to-pdf.pdf';
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      setError(err.message || 'Unable to convert images.');
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
      <h2>JPG to PDF</h2>
      <p>Convert JPG or PNG images into one PDF document.</p>

      <input
        type="file"
        accept="image/jpeg,image/png"
        multiple
        onChange={e => {
          setFiles(Array.from(e.target.files));
          setError('');
        }}
      />

      <p>{files.length} image(s) selected</p>

      {files.map((file, i) => (
        <p key={i}>{i + 1}. {file.name}</p>
      ))}

      {error && <p style={{color:'red'}}>{error}</p>}

      <button
        onClick={convert}
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
        {busy ? 'Converting...' : 'Convert to PDF'}
      </button>
    </section>
  );
}