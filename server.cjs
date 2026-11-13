
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { execFile } = require('child_process');
const { promisify } = require('util');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');

const app = express();
const execFileAsync = promisify(execFile);

const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin(origin, callback) {
    if (
      !origin ||
      allowedOrigins.some(allowed =>
        typeof allowed === 'string'
          ? allowed === origin
          : allowed.test(origin)
      )
    ) {
      return callback(null, true);
    }

    callback(new Error('CORS origin not allowed'));
  }
}));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }
});

const sofficePath =
  process.env.LIBREOFFICE_PATH ||
  (process.platform === 'win32'
    ? 'C:\\Program Files\\LibreOffice\\program\\soffice.exe'
    : 'libreoffice');

app.post(
  '/api/word-to-pdf',
  upload.single('file'),
  async (req, res) => {
    let folder;

    try {
      if (
        !req.file ||
        !/\.docx$/i.test(req.file.originalname)
      ) {
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

      await execFileAsync(
        sofficePath,
        [
          '-env:UserInstallation=' +
            'file:///' + profile.replace(/\\/g, '/'),
          '--headless',
          '--convert-to', 'pdf',
          '--outdir', folder,
          input
        ],
        {
          timeout: 120000,
          windowsHide: true
        }
      );

      const pdf = await fs.readFile(output);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="converted.pdf"'
      );
      res.send(pdf);

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'PDF conversion failed.'
      });
    } finally {
      if (folder) {
        await fs.rm(folder, {
          recursive: true,
          force: true
        }).catch(() => {});
      }
    }
  }
);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve the production website
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

app.get(/^\/(?!api(?:\/|$)).*/, async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      req.path.replace(/\/+$/, '') || '/'
    );

    const route = pathname === '/'
      ? path.join(distPath, 'index.html')
      : path.join(distPath, pathname, 'index.html');

    const htmlPath = await fs.stat(route)
      .then(stat => stat.isFile() ? route : null)
      .catch(() => null);

    if (htmlPath) {
      return res.sendFile(htmlPath);
    }

    res.status(404).send('Page not found');
  } catch (error) {
    res.status(400).send('Invalid URL');
  }
});

const PORT = Number(process.env.PORT) || 3001;

const HOST =
  process.env.HOST ||
  (process.env.PORT ? '0.0.0.0' : '127.0.0.1');

app.listen(PORT, HOST, () => {
  console.log(
    `PDF Elite Backend running on http://${HOST}:${PORT}`
  );
});
