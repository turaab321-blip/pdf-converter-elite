
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  PageBreak
} from 'docx';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFToWord() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function convertPDF() {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    let pdf = null;

    try {
      const data = new Uint8Array(await file.arrayBuffer());

      pdf = await pdfjsLib.getDocument({ data }).promise;

      const paragraphs = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);

        await page.render({
          canvasContext: context,
          viewport
        }).promise;

        const imageBlob = await new Promise((resolve, reject) => {
          canvas.toBlob(
            blob => blob ? resolve(blob) : reject(new Error('Image creation failed.')),
            'image/png'
          );
        });

        const imageData = new Uint8Array(
          await imageBlob.arrayBuffer()
        );

        const pageWidth = 11906;
        const pageHeight = 16838;

        const maxWidth = 595;
        const maxHeight = 842;

        const ratio = Math.min(
          maxWidth / canvas.width,
          maxHeight / canvas.height
        );

        const width = Math.round(canvas.width * ratio);
        const height = Math.round(canvas.height * ratio);

        if (i > 1) {
          paragraphs.push(
            new Paragraph({
              children: [new PageBreak()]
            })
          );
        }

        paragraphs.push(
          new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [
              new ImageRun({
                data: imageData,
                transformation: {
                  width,
                  height
                },
                type: 'png'
              })
            ]
          })
        );
      }

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                size: {
                  width: 11906,
                  height: 16838
                },
                margin: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                }
              }
            },
            children: paragraphs
          }
        ]
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, '') + '.docx';

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 60000);

      setSuccess('Word document downloaded successfully!');

    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to convert this PDF.');
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
      borderRadius: 18,
      textAlign: 'center',
      boxShadow: '0 12px 35px rgba(20,24,60,0.08)'
    }}>
      <h2>PDF to Word Converter</h2>

      <p style={{ color: '#64748b' }}>
        Preserve PDF pages, colors, images and layout in Word.
      </p>

      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={e => {
          setFile(e.target.files?.[0] || null);
          setError('');
          setSuccess('');
        }}
      />

      <p>{file ? file.name : 'No file selected'}</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <button
        onClick={convertPDF}
        disabled={loading || !file}
        style={{
          background: '#f23869',
          color: '#fff',
          border: 0,
          padding: '14px 25px',
          borderRadius: 10,
          cursor: loading ? 'wait' : 'pointer',
          fontWeight: 700
        }}
      >
        {loading ? 'Converting...' : 'Convert to Word'}
      </button>
    </section>
  );
}
