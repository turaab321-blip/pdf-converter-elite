
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://pdfconverterelite.xyz';
const distDir = path.resolve('dist');

const tools = [
  {
    route: '/pdf-to-word',
    name: 'PDF to Word',
    heading: 'PDF to Word Converter',
    description: 'Convert PDF pages into a Word document online for free. Preserve the appearance of pages, images and layouts.',
    intro: 'Convert PDF documents into Word files online. Upload your PDF, start the conversion and download the resulting document.',
    details: 'This tool is useful when you need to reuse PDF content in Microsoft Word. Conversion results depend on the original PDF structure, and complex layouts may require adjustments.'
  },
  {
    route: '/pdf-to-excel',
    name: 'PDF to Excel',
    heading: 'PDF to Excel Converter',
    description: 'Convert PDF files to Excel spreadsheets online. Extract PDF text and data with our free PDF to Excel tool.',
    intro: 'Convert PDF content into an Excel spreadsheet using our online PDF to Excel tool.',
    details: 'Use this tool to work with information extracted from PDFs in a spreadsheet. Complex tables and scanned documents may need manual formatting after conversion.'
  },
  {
    route: '/merge-pdf',
    name: 'Merge PDF',
    heading: 'Merge PDF Files Online',
    description: 'Combine multiple PDF files into one PDF document online with our free PDF merger.',
    intro: 'Combine multiple PDF documents into one file for easier sharing, printing and organization.',
    details: 'Select the PDF documents you want to combine, process them and download the merged PDF. Check the resulting page order before sharing.'
  },
  {
    route: '/split-pdf',
    name: 'Split PDF',
    heading: 'Split PDF Files Online',
    description: 'Split PDF documents into separate files and extract selected pages using our free online PDF splitter.',
    intro: 'Separate pages from a PDF document using a simple online PDF splitting tool.',
    details: 'Splitting PDFs can help you organize large documents and share only the pages you need. Review the available splitting options before processing.'
  },
  {
    route: '/compress-pdf',
    name: 'Compress PDF',
    heading: 'Compress PDF Files Online',
    description: 'Try reducing PDF file size online using our free PDF compression tool for easier sharing and storage.',
    intro: 'Try reducing PDF file size to make documents easier to store, upload and share.',
    details: 'Compression results vary depending on the document. PDFs that are already optimized may show little or no reduction in size.'
  },
  {
    route: '/protect-pdf',
    name: 'Protect PDF',
    heading: 'Protect and Unlock PDF Files',
    description: 'Add password protection to PDF documents or unlock authorized files using our free online PDF tool.',
    intro: 'Add password protection to a PDF or unlock a document when you have the required password.',
    details: 'Use password protection to restrict access to PDF documents. Only unlock files that you own or are authorized to access, and keep your passwords secure.'
  },
  {
    route: '/word-to-pdf',
    name: 'Word to PDF',
    heading: 'Word to PDF Converter',
    description: 'Convert Word DOCX documents into PDF files online using our free Word to PDF converter.',
    intro: 'Convert Word documents into PDF files for convenient sharing and printing.',
    details: 'PDF format helps make documents easier to distribute across different devices. Review the converted file to confirm that formatting appears as expected.'
  },
  {
    route: '/jpg-to-pdf',
    name: 'JPG to PDF',
    heading: 'JPG to PDF Converter',
    description: 'Convert JPG images into PDF documents online using our free JPG to PDF converter.',
    intro: 'Turn JPG images into PDF documents using our online image conversion tool.',
    details: 'JPG to PDF conversion is useful for organizing pictures and document photographs into PDF format. Image quality depends on the original files.'
  },
  {
    route: '/rotate-pdf',
    name: 'Rotate PDF',
    heading: 'Rotate PDF Pages Online',
    description: 'Rotate PDF pages and correct page orientation online using our free PDF rotation tool.',
    intro: 'Correct the orientation of PDF pages using our online PDF rotation tool.',
    details: 'Rotate sideways or upside-down PDF pages to improve readability. Check the finished document before downloading or sharing.'
  }
];

const pages = {
  '/': {
    title: 'PDF Converter Elite | Free Online PDF Converter & Tools',
    description: 'Free online PDF tools to merge, split, compress, rotate and protect PDFs. Convert PDF, Word, Excel and JPG files online.',
    heading: 'Free Online PDF Tools',
    intro: 'PDF Converter Elite provides free tools for common PDF and document tasks.'
  },
  '/about-us': {
    title: 'About Us | PDF Converter Elite',
    description: 'Learn about PDF Converter Elite and our mission to provide accessible, free online PDF conversion tools.',
    heading: 'About PDF Converter Elite',
    intro: 'PDF Converter Elite brings useful document tools together in one workspace.'
  },
  '/contact-us': {
    title: 'Contact Us | PDF Converter Elite',
    description: 'Contact PDF Converter Elite for support, feedback, questions and suggestions about our PDF tools.',
    heading: 'Contact Us',
    intro: 'Visit our contact page for questions, suggestions and feedback.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | PDF Converter Elite',
    description: 'Read the PDF Converter Elite Privacy Policy to learn how we handle information when you use our online PDF tools.',
    heading: 'Privacy Policy',
    intro: 'Read our privacy policy for information about the use of this website.'
  },
  '/terms-of-service': {
    title: 'Terms of Service | PDF Converter Elite',
    description: 'Read the terms and conditions for using the PDF Converter Elite website and its online PDF tools.',
    heading: 'Terms of Service',
    intro: 'Read the terms and conditions for using PDF Converter Elite.'
  }
};

for (const tool of tools) {
  pages[tool.route] = {
    title: `${tool.name} Converter Online Free | PDF Converter Elite`,
    description: tool.description,
    heading: tool.heading,
    intro: tool.intro,
    details: tool.details
  };
}

const titleOverrides = {
  '/pdf-to-word': 'PDF to Word Converter Free Online | PDF Converter Elite',
  '/pdf-to-excel': 'PDF to Excel Converter Free Online | PDF Converter Elite',
  '/merge-pdf': 'Merge PDF Online Free - Combine PDF Files | PDF Converter Elite',
  '/split-pdf': 'Split PDF Online Free - Extract PDF Pages | PDF Converter Elite',
  '/compress-pdf': 'Compress PDF Online Free - Reduce PDF Size | PDF Converter Elite',
  '/protect-pdf': 'Password Protect PDF Online Free | PDF Converter Elite',
  '/word-to-pdf': 'Word to PDF Converter Free Online | PDF Converter Elite',
  '/jpg-to-pdf': 'JPG to PDF Converter Free Online | PDF Converter Elite',
  '/rotate-pdf': 'Rotate PDF Online Free - Rotate PDF Pages | PDF Converter Elite'
};

for (const [route, title] of Object.entries(titleOverrides)) {
  pages[route].title = title;
}

const descriptionOverrides = {
  '/compress-pdf': 'Compress PDF files online for free. Try reducing PDF file size for easier uploading, sharing and storage. Results depend on the document.',
  '/jpg-to-pdf': 'Convert JPG to PDF online for free. Turn JPG images into PDF documents using our simple image to PDF converter.',
  '/merge-pdf': 'Merge PDF files online for free. Combine multiple PDF documents into one file with our easy-to-use PDF merger.',
  '/pdf-to-excel': 'Convert PDF to Excel online for free. Extract text and data from PDF documents into an Excel spreadsheet using our PDF to XLSX converter.',
  '/pdf-to-word': 'Convert PDF to Word online for free. Turn PDF pages into a DOCX document while preserving their visual appearance. Easy PDF to Word converter.',
  '/protect-pdf': 'Password protect PDF files online for free. Add password security or unlock authorized PDF documents when you have the password.',
  '/rotate-pdf': 'Rotate PDF pages online for free. Fix sideways or upside-down PDF pages and correct document orientation easily.',
  '/split-pdf': 'Split PDF files online for free. Separate PDF pages and extract the pages you need using our PDF splitter.',
  '/word-to-pdf': 'Convert Word to PDF online for free. Turn DOCX documents into PDF files for sharing, printing and everyday document use.'
};

for (const [route, description] of Object.entries(descriptionOverrides)) {
  pages[route].description = description;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function createSeoContent(route, page) {
  const links = tools
    .filter(tool => tool.route !== route)
    .map(tool =>
      `<li><a href="${escapeHtml(tool.route)}">${escapeHtml(tool.name)}</a></li>`
    )
    .join('');

  return `
    <section id="static-seo-content" aria-label="Page information">
      <h1>${escapeHtml(page.heading)}</h1>
      <p>${escapeHtml(page.intro)}</p>
      ${page.details ? `<p>${escapeHtml(page.details)}</p>` : ''}
      <h2>Explore Our PDF Tools</h2>
      <ul>${links}</ul>
    </section>
  `;
}

const original = await readFile(
  path.join(distDir, 'index.html'),
  'utf8'
);

for (const [route, page] of Object.entries(pages)) {
  const canonical = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}/`;
  let html = original;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, '');

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
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
  `;

  const schema = {
    '@context': 'https://schema.org',
    '@type': route === '/' ? 'WebSite' : 'WebPage',
    name: page.title,
    url: canonical,
    description: page.description,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'PDF Converter Elite',
      url: `${SITE_URL}/`
    }
  };

  const structuredData = JSON.stringify(schema)
    .replace(/</g, '\\u003c');

  html = html.replace(
    '</head>',
    `${seo}
    <script type="application/ld+json">${structuredData}</script>
    </head>`
  );

  // Keep static SEO content in the HTML for non-JavaScript clients.
  // Hide it visually until React is ready to avoid page movement.
  const staticContent = createSeoContent(route, page);

  html = html.replace(
    '<div id="root"></div>',
    `<style>
      #seo-fallback {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
    </style>
    <div id="root"></div>
    <div id="seo-fallback">${staticContent}</div>
    <script>
      (function () {
        var fallback = document.getElementById('seo-fallback');
        var root = document.getElementById('root');

        if (!fallback || !root) return;

        var observer = new MutationObserver(function () {
          if (root.childElementCount > 0) {
            fallback.remove();
            observer.disconnect();
          }
        });

        observer.observe(root, { childList: true });

        if (root.childElementCount > 0) {
          fallback.remove();
          observer.disconnect();
        }
      })();
    </script>`
  );

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
