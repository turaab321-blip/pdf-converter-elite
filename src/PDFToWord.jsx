
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  PageBreak,
  TextRun
} from 'docx';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFToWord() {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState('editable');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [progress, setProgress] = useState(0);

  async function convertPDF() {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setProgress(0);

    let pdf = null;

    try {
      const data = new Uint8Array(
        await file.arrayBuffer()
      );

      pdf = await pdfjsLib.getDocument({ data }).promise;

      const paragraphs = [];
      let extractedCharacters = 0;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        if (i > 1) {
          paragraphs.push(
            new Paragraph({
              children: [new PageBreak()]
            })
          );
        }

        if (mode === 'editable') {
          const content = await page.getTextContent();

          let line = '';

          for (const item of content.items) {
            if (typeof item.str !== 'string') continue;

            line += item.str + ' ';
            extractedCharacters += item.str.trim().length;

            if (item.hasEOL) {
              if (line.trim()) {
                paragraphs.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: line.trim(),
                        size: 24
                      })
                    ],
                    spacing: { after: 120 }
                  })
                );
              }

              line = '';
            }
          }

          if (line.trim()) {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: line.trim(),
                    size: 24
                  })
                ],
                spacing: { after: 120 }
              })
            );
          }

        } else {
          const viewport = page.getViewport({
            scale: 2
          });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);

          await page.render({
            canvasContext: context,
            viewport
          }).promise;

          const imageBlob = await new Promise(
            (resolve, reject) => {
              canvas.toBlob(
                blob => blob
                  ? resolve(blob)
                  : reject(new Error('Image creation failed.')),
                'image/png'
              );
            }
          );

          const imageData = new Uint8Array(
            await imageBlob.arrayBuffer()
          );

          const ratio = Math.min(
            595 / canvas.width,
            842 / canvas.height
          );

          paragraphs.push(
            new Paragraph({
              spacing: { before: 0, after: 0 },
              children: [
                new ImageRun({
                  data: imageData,
                  transformation: {
                    width: Math.round(canvas.width * ratio),
                    height: Math.round(canvas.height * ratio)
                  },
                  type: 'png'
                })
              ]
            })
          );

          canvas.width = 0;
          canvas.height = 0;
        }

        page.cleanup();

        setProgress(
          Math.round((i / pdf.numPages) * 100)
        );
      }

      if (
        mode === 'editable' &&
        extractedCharacters === 0
      ) {
        throw new Error(
          'No editable text was found. This PDF may contain scanned images. Please use Preserve Original Layout mode.'
        );
      }

      const margin = mode === 'editable' ? 1000 : 0;

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
                  top: margin,
                  right: margin,
                  bottom: margin,
                  left: margin
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
      link.download =
        file.name.replace(/\.pdf$/i, '') +
        (mode === 'editable' ? '-editable' : '-layout') +
        '.docx';

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(
        () => URL.revokeObjectURL(url),
        60000
      );

      setSuccess('Word document downloaded successfully!');

    } catch (err) {
      console.error(err);
      setError(
        err.message || 'Unable to convert this PDF.'
      );
    } finally {
      try {
        if (pdf) await pdf.destroy();
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <section style={{
      maxWidth: 650,
      width: 'calc(100% - 32px)',
      margin: '30px auto',
      padding: '24px',
      boxSizing: 'border-box',
      background: '#fff',
      borderRadius: 18,
      textAlign: 'center',
      boxShadow: '0 12px 35px rgba(20,24,60,0.08)'
    }}>
      <h2 style={{ color: '#15183c' }}>
        PDF to Word Converter
      </h2>

      <p style={{
        color: '#475569',
        lineHeight: 1.7
      }}>
        Convert PDF files into editable Word documents
        or preserve their original visual layout.
      </p>

      <fieldset
        disabled={loading}
        style={{
          border: 0,
          padding: 0,
          margin: '24px 0',
          textAlign: 'left'
        }}
      >
        <legend style={{
          fontWeight: 700,
          color: '#15183c',
          marginBottom: 12
        }}>
          Choose Conversion Mode
        </legend>

        {[
          {
            value: 'editable',
            title: 'Editable Word Document',
            description:
              'Extract selectable PDF text into editable Word content. Original formatting may change.'
          },
          {
            value: 'layout',
            title: 'Preserve Original Layout',
            description:
              'Keep the visual appearance of PDF pages as images in Word. Text will not be editable.'
          }
        ].map(option => (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: 16,
              marginBottom: 12,
              borderRadius: 12,
              border: mode === option.value
                ? '2px solid #be185d'
                : '2px solid #e2e8f0',
              background: mode === option.value
                ? '#fff1f5'
                : '#f8fafc',
              cursor: 'pointer'
            }}
          >
            <input
              type="radio"
              name="conversion-mode"
              value={option.value}
              checked={mode === option.value}
              onChange={() => {
                setMode(option.value);
                setError('');
                setSuccess('');
              }}
              style={{
                accentColor: '#be185d',
                marginTop: 5
              }}
            />

            <span>
              <strong style={{
                display: 'block',
                color: '#15183c',
                marginBottom: 5
              }}>
                {option.title}
              </strong>

              <span style={{
                color: '#475569',
                fontSize: 14,
                lineHeight: 1.6
              }}>
                {option.description}
              </span>
            </span>
          </label>
        ))}
      </fieldset>

      <label
        htmlFor="pdf-word-file"
        style={{
          display: 'block',
          fontWeight: 700,
          color: '#15183c',
          marginBottom: 12
        }}
      >
        Select PDF File
      </label>

      <input
        id="pdf-word-file"
        type="file"
        accept=".pdf,application/pdf"
        disabled={loading}
        onChange={e => {
          setFile(e.target.files?.[0] || null);
          setError('');
          setSuccess('');
          setProgress(0);
        }}
        style={{
          maxWidth: '100%',
          color: '#334155'
        }}
      />

      <p style={{
        color: '#475569',
        overflowWrap: 'anywhere'
      }}>
        {file ? file.name : 'No file selected'}
      </p>

      <div
        aria-live="polite"
        style={{
          minHeight: 48,
          margin: '12px 0'
        }}
      >
        {loading && (
          <>
            <progress
              aria-label="Conversion progress"
              value={progress}
              max={100}
              style={{
                width: '100%',
                accentColor: '#be185d'
              }}
            />

            <p style={{ color: '#334155' }}>
              Processing: {progress}%
            </p>
          </>
        )}

        {error && (
          <p role="alert" style={{ color: '#b91c1c' }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ color: '#166534' }}>
            {success}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={convertPDF}
        disabled={loading || !file}
        style={{
          background: loading || !file
            ? '#64748b'
            : '#be185d',
          color: '#ffffff',
          border: 0,
          padding: '15px 28px',
          borderRadius: 10,
          cursor: loading
            ? 'wait'
            : !file
              ? 'not-allowed'
              : 'pointer',
          fontWeight: 700,
          width: '100%',
          maxWidth: 320
        }}
      >
        {loading ? 'Converting...' : 'Convert to Word'}
      </button>

      <p style={{
        fontSize: 13,
        color: '#475569',
        lineHeight: 1.7,
        marginTop: 20
      }}>
        Scanned PDFs without selectable text require OCR
        for editable conversion. This tool does not
        currently include OCR.
      </p>
    </section>
  );
}
