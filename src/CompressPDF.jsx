
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const levels = {
  high: { scale: 1.5, quality: 0.82 },
  medium: { scale: 1.2, quality: 0.65 },
  low: { scale: 1, quality: 0.45 }
};

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

function downloadPDF(bytes, filename) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);

  const blob = new Blob([copy.buffer], {
    type: 'application/pdf'
  });

  if (blob.size < 100) {
    throw new Error('Generated PDF is empty.');
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  async function compressPDF() {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    let loadingTask = null;
    let source = null;

    try {
      const inputBytes = new Uint8Array(
        await file.arrayBuffer()
      );

      const originalSize = inputBytes.byteLength;

      if (originalSize < 100) {
        throw new Error('The selected PDF is empty.');
      }

      const originalPDF = await PDFDocument.load(
        inputBytes.slice()
      );

      const optimized = await originalPDF.save({
        useObjectStreams: true
      });

      let bestBytes = optimized;
      let method = 'lossless';

      // Try image compression when basic optimization
      // does not reduce the file significantly.
      if (optimized.byteLength >= originalSize * 0.95) {
        loadingTask = pdfjsLib.getDocument({
          data: inputBytes.slice(),
          useSystemFonts: true
        });

        source = await loadingTask.promise;

        const output = await PDFDocument.create();
        const settings = levels[quality];

        for (
          let pageNumber = 1;
          pageNumber <= source.numPages;
          pageNumber++
        ) {
          const page = await source.getPage(pageNumber);

          const viewport = page.getViewport({
            scale: settings.scale
          });

          const canvas = document.createElement('canvas');

          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);

          const context = canvas.getContext('2d', {
            alpha: false
          });

          if (!context) {
            throw new Error('Canvas is not available.');
          }

          context.fillStyle = '#ffffff';
          context.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
          );

          await page.render({
            canvasContext: context,
            canvas,
            viewport,
            background: '#ffffff'
          }).promise;

          const imageBlob = await new Promise(
            (resolve, reject) => {
              canvas.toBlob(
                blob => {
                  if (blob && blob.size > 0) {
                    resolve(blob);
                  } else {
                    reject(
                      new Error('Image conversion failed.')
                    );
                  }
                },
                'image/jpeg',
                settings.quality
              );
            }
          );

          const imageBytes = await imageBlob.arrayBuffer();
          const image = await output.embedJpg(imageBytes);

          const pageSize = page.getViewport({
            scale: 1
          });

          const newPage = output.addPage([
            pageSize.width,
            pageSize.height
          ]);

          newPage.drawImage(image, {
            x: 0,
            y: 0,
            width: pageSize.width,
            height: pageSize.height
          });

          page.cleanup();
          canvas.width = 0;
          canvas.height = 0;
        }

        const imagePDF = await output.save({
          useObjectStreams: true
        });

        if (imagePDF.byteLength < bestBytes.byteLength) {
          bestBytes = imagePDF;
          method = 'image';
        }
      }

      // Never download a larger file.
      if (bestBytes.byteLength >= originalSize) {
        setResult({
          original: originalSize,
          compressed: originalSize,
          reduced: false
        });
        return;
      }

      // Verify the generated PDF before downloading.
      const verified = await PDFDocument.load(
        bestBytes.slice()
      );

      if (verified.getPageCount() === 0) {
        throw new Error('Generated PDF has no pages.');
      }

      downloadPDF(
        bestBytes,
        file.name.replace(/\.pdf$/i, '') +
          '_compressed.pdf'
      );

      setResult({
        original: originalSize,
        compressed: bestBytes.byteLength,
        reduced: true,
        method
      });

    } catch (err) {
      console.error('PDF compression error:', err);
      setError(
        err.message ||
        'Unable to compress this PDF.'
      );
    } finally {
      if (source && typeof source.destroy === 'function') {
        await source.destroy().catch(() => {});
      } else if (
        loadingTask &&
        typeof loadingTask.destroy === 'function'
      ) {
        await loadingTask.destroy().catch(() => {});
      }

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
        Reduce PDF file size with adjustable compression.
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

      <label htmlFor="compression-quality">
        Compression Level
      </label>

      <select
        id="compression-quality"
        value={quality}
        onChange={e => setQuality(e.target.value)}
        style={{
          display: 'block',
          margin: '12px auto',
          padding: 10,
          borderRadius: 8
        }}
      >
        <option value="high">
          High Quality (Less Compression)
        </option>
        <option value="medium">
          Balanced (Recommended)
        </option>
        <option value="low">
          Smaller File (Lower Quality)
        </option>
      </select>

      <p style={{
        fontSize: 13,
        color: '#666'
      }}>
        Image compression may flatten PDF pages.
        Selectable text, links and forms may be lost.
        Always keep your original PDF.
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
            <>
              <p style={{ color: 'green' }}>
                File compressed successfully!
              </p>

              <p>
                Saved: {(
                  (1 -
                    result.compressed / result.original) *
                  100
                ).toFixed(1)}%
              </p>

              {result.method === 'image' && (
                <p style={{ color: '#b45309' }}>
                  PDF pages were compressed as images.
                </p>
              )}
            </>
          ) : (
            <p style={{ color: '#b45309' }}>
              This PDF could not be made smaller.
              Your original file is unchanged.
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
