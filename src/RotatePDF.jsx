import { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';

export default function RotatePDF() {
  const [file, setFile] = useState(null);
  const [angle, setAngle] = useState(90);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function rotatePDF() {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setBusy(true);
    setError('');

    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer());

      pdf.getPages().forEach(page => {
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + Number(angle)) % 360));
      });

      const bytes = await pdf.save();
      const url = URL.createObjectURL(
        new Blob([bytes], { type: 'application/pdf' })
      );

      const link = document.createElement('a');
      link.href = url;
      link.download = 'rotated.pdf';
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError(
        'Unable to rotate this PDF. Make sure it is valid and not password-protected.'
      );
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
      <h2>Rotate PDF</h2>
      <p>Rotate every page of your PDF document.</p>

      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={e => {
          setFile(e.target.files[0] || null);
          setError('');
        }}
      />

      <p>Select rotation angle</p>

      <select
        value={angle}
        onChange={e => setAngle(Number(e.target.value))}
        style={{
          padding: 14,
          border: '1px solid #ddd',
          borderRadius: 10,
          minWidth: 200
        }}
      >
        <option value={90}>90° Clockwise</option>
        <option value={180}>180°</option>
        <option value={270}>270° Clockwise</option>
      </select>

      {error && <p style={{color:'red'}}>{error}</p>}

      <div style={{marginTop:25}}>
        <button
          onClick={rotatePDF}
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
          {busy ? 'Processing...' : 'Rotate PDF'}
        </button>
      </div>
    </section>
  );
}