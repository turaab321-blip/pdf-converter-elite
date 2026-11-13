
import { chromium } from '@playwright/test';
import { preview } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const toolNames = {
  '/pdf-to-word': 'PDF to Word Converter',
  '/pdf-to-excel': 'PDF to Excel Converter',
  '/merge-pdf': 'Merge PDF',
  '/split-pdf': 'Split PDF',
  '/compress-pdf': 'Compress PDF',
  '/protect-pdf': 'Protect PDF',
  '/word-to-pdf': 'Word to PDF Converter',
  '/jpg-to-pdf': 'JPG to PDF Converter',
  '/rotate-pdf': 'Rotate PDF'
};

const routes = [
  '/',
  ...Object.keys(toolNames),
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-of-service'
];

const distDir = path.resolve('dist');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function createSchema(route, description) {
  if (route === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'PDF Converter Elite',
      description,
      inLanguage: 'en'
    };
  }

  if (toolNames[route]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: toolNames[route],
      description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    };
  }

  return null;
}

const server = await preview({
  preview: {
    host: '127.0.0.1',
    port: 4179,
    strictPort: true
  }
});

let browser;

try {
  browser = await chromium.launch({ headless: true });

  // Read the original Vite HTML once before writing routes.
  const original = await readFile(
    path.join(distDir, 'index.html'),
    'utf8'
  );

  for (const route of routes) {
    const page = await browser.newPage();

    try {
      const response = await page.goto(
        `http://127.0.0.1:4179${route}`,
        { waitUntil: 'networkidle' }
      );

      if (!response?.ok()) {
        throw new Error(`Failed to load ${route}`);
      }

      await page.waitForFunction(() => {
        const root = document.querySelector('#root');

        return (
          root &&
          root.children.length > 0 &&
          !root.textContent.includes('Loading PDF tool...') &&
          !root.textContent.includes('Loading page...')
        );
      });

      const rendered = await page.content();

      const body = rendered.match(
        /<body\b[^>]*>[\s\S]*<\/body>/i
      );

      if (!body) {
        throw new Error(`Missing body for ${route}`);
      }

      const title = await page.title();

      const description =
        await page
          .locator('meta[name="description"]')
          .getAttribute('content') || '';

      let html = original.replace(
        /<body\b[^>]*>[\s\S]*<\/body>/i,
        body[0]
      );

      html = html.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${escapeHtml(title)}</title>`
      );

      html = html.replace(
        /(<meta\s+name="description"\s+content=")[^"]*(")/i,
        (_, start, end) =>
          start + escapeHtml(description) + end
      );

      const schema = createSchema(route, description);

      if (schema) {
        const schemaTag =
          '<script type="application/ld+json">' +
          JSON.stringify(schema).replace(/</g, '\\u003c') +
          '</script>';

        html = html.replace(
          '</head>',
          `${schemaTag}\n</head>`
        );
      }

      const folder = path.join(
        distDir,
        route === '/' ? '' : route.slice(1)
      );

      await mkdir(folder, { recursive: true });

      await writeFile(
        path.join(folder, 'index.html'),
        html,
        'utf8'
      );

      console.log(`Prerendered: ${route}`);

    } finally {
      await page.close();
    }
  }

  console.log('SEO prerendering completed successfully.');

} finally {
  if (browser) {
    await browser.close();
  }

  await new Promise(resolve =>
    server.httpServer.close(resolve)
  );
}
