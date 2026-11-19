
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://pdfconverterelite.xyz';
const distDir = path.resolve('dist');

const pages = {
  '/': {
    title: 'PDF Converter Elite | Free Online PDF Converter & Tools',
    description: 'Free online PDF tools to merge, split, compress, rotate and protect PDFs. Convert PDF, Word, Excel and JPG files online.'
  },
  '/pdf-to-word': {
    title: 'PDF to Word Converter Online Free | PDF Converter Elite',
    description: 'Convert PDF files into Word documents online with our free PDF to Word converter.'
  },
  '/pdf-to-excel': {
    title: 'PDF to Excel Converter Online Free | PDF Converter Elite',
    description: 'Convert PDF files to Excel spreadsheets online. Extract PDF table data with our free PDF to Excel tool.'
  },
  '/merge-pdf': {
    title: 'Merge PDF Files Online Free | PDF Converter Elite',
    description: 'Combine multiple PDF files into one PDF document online with our free PDF merger.'
  },
  '/split-pdf': {
    title: 'Split PDF Online Free | PDF Converter Elite',
    description: 'Split PDF documents into separate files and extract selected pages using our free online PDF splitter.'
  },
  '/compress-pdf': {
    title: 'Compress PDF Online Free | PDF Converter Elite',
    description: 'Reduce PDF file size online using our free PDF compression tool for easier sharing and storage.'
  },
  '/protect-pdf': {
    title: 'Password Protect PDF Online Free | PDF Converter Elite',
    description: 'Add password protection to your PDF documents using our free online PDF protection tool.'
  },
  '/word-to-pdf': {
    title: 'Word to PDF Converter Online Free | PDF Converter Elite',
    description: 'Convert Word DOCX documents into PDF files online using our free Word to PDF converter.'
  },
  '/jpg-to-pdf': {
    title: 'JPG to PDF Converter Online Free | PDF Converter Elite',
    description: 'Convert JPG images into PDF documents online using our free JPG to PDF converter.'
  },
  '/rotate-pdf': {
    title: 'Rotate PDF Pages Online Free | PDF Converter Elite',
    description: 'Rotate PDF pages and correct page orientation online using our free PDF rotation tool.'
  },
  '/about-us': {
    title: 'About Us | PDF Converter Elite',
    description: 'Learn about PDF Converter Elite and our mission to provide accessible, free online PDF conversion tools.'
  },
  '/contact-us': {
    title: 'Contact Us | PDF Converter Elite',
    description: 'Contact PDF Converter Elite for support, feedback, questions and suggestions about our PDF tools.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | PDF Converter Elite',
    description: 'Read the PDF Converter Elite Privacy Policy to learn how we handle information when you use our online PDF tools.'
  },
  '/terms-of-service': {
    title: 'Terms of Service | PDF Converter Elite',
    description: 'Read the terms and conditions for using the PDF Converter Elite website and its online PDF tools.'
  }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const original = await readFile(
  path.join(distDir, 'index.html'),
  'utf8'
);

for (const [route, page] of Object.entries(pages)) {
  const canonical = `${SITE_URL}${route}`;
  let html = original;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    ''
  );

  html = html.replace(
    /<meta\b[^>]*(?:name=["']description["']|property=["']og:(?:title|description|url)["'])[^>]*>/gi,
    ''
  );

  html = html.replace(
    /<link\b[^>]*rel=["']canonical["'][^>]*>/gi,
    ''
  );

  const seo = `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${canonical}" />
  `;

  html = html.replace('</head>', `${seo}\n</head>`);

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

  console.log(`SEO generated: ${route}`);
}

console.log('SEO completed for all 14 pages.');

