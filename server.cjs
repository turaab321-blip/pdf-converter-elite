
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { execFile } = require('child_process');
const { promisify } = require('util');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const app = express();
const execFileAsync = promisify(execFile);

const allowedOrigins = new Set([
  'https://pdfconverterelite.xyz',
  'https://www.pdfconverterelite.xyz',
  'https://pdf-converter-elite.turaab321.workers.dev',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
]);

(process.env.FRONTEND_URL || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean)
  .forEach(value => {
    try {
      allowedOrigins.add(new URL(value).origin);
    } catch {
      console.error('Invalid FRONTEND_URL:', value);
    }
  });

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    try {
      const normalizedOrigin = new URL(origin).origin;

      return callback(null,
        allowedOrigins.has(normalizedOrigin) ||
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(normalizedOrigin)
      );
    } catch {
      return callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86400
}));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 1
  }
});

const sofficePath =
  process.env.LIBREOFFICE_PATH ||
  (process.platform === 'win32'
    ? 'C:\\Program Files\\LibreOffice\\program\\soffice.exe'
    : '/usr/bin/libreoffice');

const pythonPath =
  process.env.PYTHON_PATH ||
  (process.platform === 'win32'
    ? path.join(
        __dirname,
        '.venv-pdf-test',
        'Scripts',
        'python.exe'
      )
    : '/opt/pdf-venv/bin/python');

let conversionBusy = false;

function reserveConversion(req, res, next) {
  if (conversionBusy) {
    return res.status(503).json({
      error: 'Server is busy. Please try again shortly.'
    });
  }

  conversionBusy = true;
  next();
}

function uploadFile(req, res, next) {
  upload.single('file')(req, res, error => {
    if (error) {
      conversionBusy = false;
      return res.status(400).json({
        error: 'Invalid upload or file exceeds 20 MB.'
      });
    }

    next();
  });
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PDF Converter Elite',
    libreoffice: sofficePath,
    python: pythonPath
  });
});

// Advanced PDF to Word
app.post(
  '/api/pdf-to-word',
  reserveConversion,
  uploadFile,
  async (req, res) => {
    let folder;

    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Please upload a PDF file.'
        });
      }

      if (
        !/\.pdf$/i.test(req.file.originalname) ||
        req.file.buffer.subarray(0, 1024)
          .indexOf(Buffer.from('%PDF-')) === -1
      ) {
        return res.status(400).json({
          error: 'Please upload a valid PDF file.'
        });
      }

      folder = await fs.mkdtemp(
        path.join(os.tmpdir(), 'pdf-word-')
      );

      const input = path.join(folder, 'document.pdf');
      const output = path.join(folder, 'document.docx');

      await fs.writeFile(input, req.file.buffer);

      const pythonCode = [
        'from pdf2docx import Converter',
        'import sys',
        'c = Converter(sys.argv[1])',
        'try:',
        '    c.convert(sys.argv[2], multi_processing=False)',
        'finally:',
        '    c.close()'
      ].join('\n');

      await execFileAsync(
        pythonPath,
        ['-c', pythonCode, input, output],
        {
          timeout: 120000,
          windowsHide: true,
          maxBuffer: 4 * 1024 * 1024,
          env: {
            ...process.env,
            OMP_NUM_THREADS: '1',
            OPENBLAS_NUM_THREADS: '1',
            MKL_NUM_THREADS: '1'
          }
        }
      );

      const docx = await fs.readFile(output);

      if (
        docx.length < 4 ||
        docx.subarray(0, 2).toString() !== 'PK'
      ) {
        throw new Error('Invalid DOCX generated.');
      }

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );

      res.setHeader(
        'Content-Disposition',
        'attachment; filename="converted.docx"'
      );

      res.setHeader('Cache-Control', 'no-store');

      res.send(docx);

    } catch (error) {
      console.error('PDF TO WORD ERROR:', error);

      if (!res.headersSent) {
        res.status(500).json({
          error: process.env.NODE_ENV === 'production'
            ? 'Conversion failed. Please try a smaller or different PDF.'
            : error.message
        });
      }

    } finally {
      if (folder) {
        await fs.rm(folder, {
          recursive: true,
          force: true
        }).catch(console.error);
      }

      conversionBusy = false;
    }
  }
);

// Existing Word to PDF
app.post(
  '/api/word-to-pdf',
  reserveConversion,
  uploadFile,
  async (req, res) => {
    let folder;

    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Please upload a Word document.'
        });
      }

      if (!/\.docx$/i.test(req.file.originalname)) {
        return res.status(400).json({
          error: 'Please upload a DOCX file.'
        });
      }

      folder = await fs.mkdtemp(
        path.join(os.tmpdir(), 'pdf-elite-')
      );

      const input = path.join(folder, 'document.docx');
      const output = path.join(folder, 'document.pdf');
      const profile = path.join(folder, 'profile');

      await fs.writeFile(input, req.file.buffer);

      const profileURI = pathToFileURL(profile).href;

      const result = await execFileAsync(
        sofficePath,
        [
          '-env:UserInstallation=' + profileURI,
          '--headless',
          '--convert-to',
          'pdf',
          '--outdir',
          folder,
          input
        ],
        {
          timeout: 120000,
          windowsHide: true,
          maxBuffer: 10 * 1024 * 1024
        }
      );

      if (result.stderr) {
        console.log('LibreOffice:', result.stderr);
      }

      const pdf = await fs.readFile(output);

      if (pdf.subarray(0, 5).toString() !== '%PDF-') {
        throw new Error('Invalid PDF generated.');
      }

      res.setHeader('Content-Type', 'application/pdf');

      res.setHeader(
        'Content-Disposition',
        'attachment; filename="converted.pdf"'
      );

      res.setHeader('Cache-Control', 'no-store');

      res.send(pdf);

    } catch (error) {
      console.error('WORD TO PDF ERROR:', error);

      if (!res.headersSent) {
        res.status(500).json({
          error: process.env.NODE_ENV === 'production'
            ? 'PDF conversion failed. Please try another DOCX document.'
            : error.message
        });
      }

    } finally {
      if (folder) {
        await fs.rm(folder, {
          recursive: true,
          force: true
        }).catch(console.error);
      }

      conversionBusy = false;
    }
  }
);

// Serve production website
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

app.get(/^\/(?!api(?:\/|$)).*/, async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      req.path.replace(/\/+$/, '') || '/'
    );

    const route = path.resolve(
      distPath,
      '.' + pathname,
      'index.html'
    );

    if (!route.startsWith(distPath + path.sep)) {
      return res.status(400).send('Invalid URL');
    }

    const htmlPath = await fs.stat(route)
      .then(stat => stat.isFile() ? route : null)
      .catch(() => null);

    if (htmlPath) {
      return res.sendFile(htmlPath);
    }

    res.status(404).send('Page not found');

  } catch {
    res.status(400).send('Invalid URL');
  }
});

const PORT = Number(process.env.PORT) || 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(
    `PDF Elite Backend running on http://${HOST}:${PORT}`
  );

  console.log('LibreOffice path:', sofficePath);
  console.log('Python path:', pythonPath);
  console.log('Allowed origins:', [...allowedOrigins]);
});
