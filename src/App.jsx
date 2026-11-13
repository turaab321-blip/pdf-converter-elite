import ToolFAQ from './ToolFAQ';

import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';

const MergePDF = lazy(() => import('./MergePDF'));
const SplitPDF = lazy(() => import('./SplitPDF'));
const RotatePDF = lazy(() => import('./RotatePDF'));
const JPGtoPDF = lazy(() => import('./JPGtoPDF'));
const WordToPDF = lazy(() => import('./WordToPDF'));
const PDFToWord = lazy(() => import('./PDFToWord'));
const PDFToExcel = lazy(() => import('./PDFToExcel'));
const CompressPDF = lazy(() => import('./CompressPDF'));
const ProtectPDF = lazy(() => import('./ProtectPDF'));

const AboutUs = lazy(() => import('./AboutUs'));
const ContactUs = lazy(() => import('./ContactUs'));
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'));
const TermsOfService = lazy(() => import('./TermsOfService'));

const tools = [
  {
    icon: '📝',
    name: 'PDF to Word',
    slug: '/pdf-to-word',
    desc: 'Convert PDF documents into editable Word files.',
    color: 'blue',
    component: PDFToWord,
    heading: 'PDF to Word Converter',
    intro: 'Convert PDF documents into Word files online. Upload your PDF, start the conversion and download the resulting document.',
    details: 'This tool is useful when you need to reuse PDF content in Microsoft Word. Conversion results depend on the original PDF structure, and complex layouts may require adjustments.'
  },
  {
    icon: '📊',
    name: 'PDF to Excel',
    slug: '/pdf-to-excel',
    desc: 'Extract PDF text and data into Excel spreadsheets.',
    color: 'green',
    component: PDFToExcel,
    heading: 'PDF to Excel Converter',
    intro: 'Convert PDF content into an Excel spreadsheet using our online PDF to Excel tool.',
    details: 'Use this tool to work with information extracted from PDFs in a spreadsheet. Complex tables and scanned documents may need manual formatting after conversion.'
  },
  {
    icon: '📚',
    name: 'Merge PDF',
    slug: '/merge-pdf',
    desc: 'Combine multiple PDF files into one document.',
    color: 'purple',
    component: MergePDF,
    heading: 'Merge PDF Files Online',
    intro: 'Combine multiple PDF documents into one file for easier sharing, printing and organization.',
    details: 'Select the PDF documents you want to combine, process them and download the merged PDF. Check the resulting page order before sharing.'
  },
  {
    icon: '✂️',
    name: 'Split PDF',
    slug: '/split-pdf',
    desc: 'Separate PDF pages into individual files.',
    color: 'pink',
    component: SplitPDF,
    heading: 'Split PDF Files Online',
    intro: 'Separate pages from a PDF document using a simple online PDF splitting tool.',
    details: 'Splitting PDFs can help you organize large documents and share only the pages you need. Review the available splitting options before processing.'
  },
  {
    icon: '🗜️',
    name: 'Compress PDF',
    slug: '/compress-pdf',
    desc: 'Optimize PDF files and reduce their size.',
    color: 'blue',
    component: CompressPDF,
    heading: 'Compress PDF Files Online',
    intro: 'Try reducing PDF file size to make documents easier to store, upload and share.',
    details: 'Compression results vary depending on the document. PDFs that are already optimized may show little or no reduction in size.'
  },
  {
    icon: '🔐',
    name: 'Protect PDF',
    slug: '/protect-pdf',
    desc: 'Password protect or unlock PDF documents.',
    color: 'orange',
    component: ProtectPDF,
    heading: 'Protect and Unlock PDF Files',
    intro: 'Add password protection to a PDF or unlock a document when you have the required password.',
    details: 'Use password protection to restrict access to PDF documents. Only unlock files that you own or are authorized to access, and keep your passwords secure.'
  },
  {
    icon: '📄',
    name: 'Word to PDF',
    slug: '/word-to-pdf',
    desc: 'Turn Word documents into PDF files.',
    color: 'purple',
    component: WordToPDF,
    heading: 'Word to PDF Converter',
    intro: 'Convert Word documents into PDF files for convenient sharing and printing.',
    details: 'PDF format helps make documents easier to distribute across different devices. Review the converted file to confirm that formatting appears as expected.'
  },
  {
    icon: '🖼️',
    name: 'JPG to PDF',
    slug: '/jpg-to-pdf',
    desc: 'Convert JPG images into PDF documents.',
    color: 'green',
    component: JPGtoPDF,
    heading: 'JPG to PDF Converter',
    intro: 'Turn JPG images into PDF documents using our online image conversion tool.',
    details: 'JPG to PDF conversion is useful for organizing pictures and document photographs into PDF format. Image quality depends on the original files.'
  },
  {
    icon: '🔄',
    name: 'Rotate PDF',
    slug: '/rotate-pdf',
    desc: 'Rotate PDF pages to the correct orientation.',
    color: 'pink',
    component: RotatePDF,
    heading: 'Rotate PDF Pages Online',
    intro: 'Correct the orientation of PDF pages using our online PDF rotation tool.',
    details: 'Rotate sideways or upside-down PDF pages to improve readability. Check the finished document before downloading or sharing.'
  }
];

const pages = {
  '/about-us': {
    title: 'About Us',
    component: AboutUs
  },
  '/contact-us': {
    title: 'Contact Us',
    component: ContactUs
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    component: PrivacyPolicy
  },
  '/terms-of-service': {
    title: 'Terms of Service',
    component: TermsOfService
  }
};

const homeDescription =
  'Free online PDF tools to merge, split, compress, rotate and protect PDFs. Convert PDF, Word, Excel and JPG files with PDF Converter Elite.';

function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const selected = tools.find(tool => tool.slug === currentPath);
  const ActiveComponent = selected?.component;

  const currentPage = pages[currentPath];
  const PageComponent = currentPage?.component;

  const filtered = tools.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(getCurrentPath());
      setMenuOpen(false);
      window.scrollTo(0, 0);
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    let title = 'Free Online PDF Tools | PDF Converter Elite';
    let description = homeDescription;

    if (selected) {
      title = `${selected.name} Online | PDF Converter Elite`;
      description = `${selected.desc} ${selected.intro}`;
    } else if (currentPage) {
      title = `${currentPage.title} | PDF Converter Elite`;
      description =
        `Read the ${currentPage.title} page of PDF Converter Elite.`;
    }

    document.title = title;

    const meta = document.querySelector(
      'meta[name="description"]'
    );

    if (meta) {
      meta.setAttribute('content', description);
    }
  }, [selected, currentPage]);

  function navigate(path) {
    if (getCurrentPath() !== path) {
      window.history.pushState({}, '', path);
    }

    setCurrentPath(path);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }

  function goToSection(id) {
    if (getCurrentPath() !== '/') {
      window.history.pushState({}, '', '/');
    }

    setCurrentPath('/');
    setMenuOpen(false);

    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 50);
  }

  function handleLink(event, path) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigate(path);
  }

  function handleSectionLink(event, id) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    goToSection(id);
  }

  return (
    <div className="app">
      <header className="header">
        <a
          href="/"
          className="logo"
          onClick={event => handleLink(event, '/')}
        >
          <span className="logo-icon">▤</span>
          <span>PDF Converter <strong>Elite</strong></span>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          type="button"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={menuOpen ? 'nav-open' : ''}>
          <a
            href="/"
            onClick={event => handleLink(event, '/')}
          >
            Home
          </a>

          <a
            href="/#tools"
            onClick={event => handleSectionLink(event, 'tools')}
          >
            Tools
          </a>

          <a
            href="/about-us"
            onClick={event => handleLink(event, '/about-us')}
          >
            About Us
          </a>

          <a
            href="/contact-us"
            onClick={event => handleLink(event, '/contact-us')}
          >
            Contact Us
          </a>
        </nav>

        <a
          className="nav-button"
          href="/#tools"
          onClick={event => handleSectionLink(event, 'tools')}
        >
          Explore Tools ↗
        </a>
      </header>

      {PageComponent ? (
        <Suspense fallback={
          <main className="active-tool-page">
            <p role="status">Loading page...</p>
          </main>
        }>
          <PageComponent />
        </Suspense>
      ) : ActiveComponent ? (
        <main className="active-tool-page">
          <button
            className="back-button"
            onClick={() => goToSection('tools')}
            type="button"
          >
            ← Back to All Tools
          </button>

          <div className="active-tool-content">
            <header
              style={{
                maxWidth: '850px',
                margin: '25px auto 20px',
                padding: '0 20px',
                textAlign: 'center'
              }}
            >
              <h1>{selected.heading}</h1>
              <p style={{
                color: '#64748b',
                lineHeight: 1.8,
                marginTop: '12px'
              }}>
                {selected.intro}
              </p>
            </header>

            <Suspense fallback={
              <p role="status">Loading PDF tool...</p>
            }>
              <ActiveComponent />
            </Suspense>

            <section
              aria-label={`${selected.name} information`}
              style={{
                maxWidth: '850px',
                margin: '25px auto 55px',
                padding: '0 20px',
                lineHeight: 1.8
              }}
            >
              <h2>About This {selected.name} Tool</h2>
              <p>{selected.details}</p>
              <ToolFAQ name={selected.name} />
            </section>

            <nav
              aria-label="Other PDF tools"
              style={{
                maxWidth: '850px',
                margin: '0 auto 50px',
                padding: '0 20px'
              }}
            >
              <h2>Explore More PDF Tools</h2>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '16px'
              }}>
                {tools
                  .filter(tool => tool.slug !== selected.slug)
                  .map(tool => (
                    <a
                      key={tool.slug}
                      href={tool.slug}
                      onClick={event =>
                        handleLink(event, tool.slug)
                      }
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        background: '#f1f5f9',
                        color: '#15183c',
                        textDecoration: 'none',
                        fontWeight: 600
                      }}
                    >
                      {tool.name}
                    </a>
                  ))}
              </div>
            </nav>
          </div>
        </main>
      ) : (
        <>
          <section className="hero" id="home">
            <div className="hero-inner">
              <div className="hero-copy">
                <div className="eyebrow">
                  ✦ YOUR ALL-IN-ONE PDF TOOLKIT
                </div>

                <h1>
                  Every PDF Tool.
                  <br />
                  <span>One Beautiful Place.</span>
                </h1>

                <p>
                  Convert, edit, merge, split and organize your PDFs
                  with simple tools designed to make everyday work easier.
                </p>

                <div className="hero-benefits">
                  <span>✓ Browser-Based</span>
                  <span>⚡ Easy to Use</span>
                  <span>✓ Free Tools</span>
                </div>

                <div className="hero-actions">
                  <a
                    className="hero-button"
                    href="/#tools"
                    onClick={event => handleSectionLink(event, 'tools')}
                  >
                    Explore All Tools <span>→</span>
                  </a>

                  <a
                    className="hero-secondary"
                    href="/#about"
                    onClick={event => handleSectionLink(event, 'about')}
                  >
                    Learn More ↗
                  </a>
                </div>
              </div>

              <div className="hero-visual" aria-hidden="true">
                <div className="visual-ring ring-one"></div>
                <div className="visual-ring ring-two"></div>

                <div className="float-icon float-word">W</div>
                <div className="float-icon float-excel">X</div>
                <div className="float-icon float-lock">🔒</div>
                <div className="float-icon float-image">▧</div>

                <div className="pdf-sheet">
                  <div className="sheet-fold"></div>
                  <div className="sheet-badge">PDF</div>
                  <div className="sheet-symbol">▤</div>
                  <div className="sheet-line"></div>
                  <div className="sheet-line short"></div>
                  <div className="sheet-line"></div>
                </div>
              </div>
            </div>
          </section>

          <main className="main" id="tools">
            <div className="section-label">
              ✦ OUR PDF TOOLS ✦
            </div>

            <h2>
              Powerful Tools for <span>Everyday Work</span>
            </h2>

            <p className="section-subtitle">
              Everything you need to work with PDFs, all in one place.
              Choose a tool and get started.
            </p>

            <div className="search-box">
              <span>⌕</span>
              <input
                className="search"
                placeholder="Search for a PDF tool..."
                aria-label="Search PDF tools"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <small>{filtered.length} tools</small>
            </div>

            <div className="tools-grid">
              {filtered.map(tool => (
                <a
                  key={tool.slug}
                  href={tool.slug}
                  className="tool-card"
                  onClick={event =>
                    handleLink(event, tool.slug)
                  }
                  style={{ textDecoration: 'none' }}
                >
                  <span className={`tool-icon ${tool.color}`}>
                    {tool.icon}
                  </span>

                  <span className="tool-info">
                    <strong>{tool.name}</strong>
                    <span>{tool.desc}</span>
                  </span>

                  <span className="tool-arrow">→</span>
                </a>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="no-results">
                No matching tools found.
              </p>
            )}
          </main>

          <section id="pdf-guide" style={{ maxWidth: 1000, margin: '55px auto', padding: '0 24px', lineHeight: 1.85, color: '#46516c' }}>
            <h2 style={{ color: '#15183c' }}>How to Use Our Free PDF Tools</h2>
            <p>PDF Converter Elite helps you complete common document tasks directly from your browser. Choose a tool, select the appropriate file, follow the instructions, and download the result. Some conversions require temporary server-side processing.</p>
            <h3 style={{ color: '#15183c' }}>Choose the Right Tool</h3>
            <p>Merge PDF combines documents, while Split PDF separates pages. Rotate PDF corrects page orientation, and Compress PDF can reduce file size. Our conversion tools help you work with Word documents, Excel spreadsheets, and JPG images.</p>
            <h3 style={{ color: '#15183c' }}>Check Your Converted Documents</h3>
            <p>Document conversions are not always perfect. Complex formatting, scanned pages, tables, and images can affect the output. Always review your downloaded file before sharing or printing it.</p>
            <h3 style={{ color: '#15183c' }}>Keep Your Documents Safe</h3>
            <p>Keep backup copies of important files and avoid uploading highly sensitive documents unless you understand the processing involved. For details, read our <a href="/privacy-policy">Privacy Policy</a>.</p>
          </section>
          <section className="about" id="about">
            <div className="about-symbol">✦</div>
            <div className="section-label">
              MADE FOR SIMPLICITY
            </div>

            <h2>Less hassle. More productivity.</h2>

            <p>
              PDF Converter Elite brings useful document tools together
              in one clean workspace. Select a tool, process your file,
              and download the result.
            </p>

            <a
              href="/#tools"
              className="about-button"
              onClick={event => handleSectionLink(event, 'tools')}
            >
              Start Using Tools →
            </a>
          </section>
        </>
      )}

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">
            ▤ PDF Converter <strong>Elite</strong>
          </div>

          <p>Smart PDF tools for simpler everyday work.</p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 24px',
            marginTop: 20
          }}>
            <a
              href="/about-us"
              onClick={event => handleLink(event, '/about-us')}
            >
              About Us
            </a>

            <a
              href="/contact-us"
              onClick={event => handleLink(event, '/contact-us')}
            >
              Contact Us
            </a>

            <a
              href="/privacy-policy"
              onClick={event => handleLink(event, '/privacy-policy')}
            >
              Privacy Policy
            </a>

            <a
              href="/terms-of-service"
              onClick={event => handleLink(event, '/terms-of-service')}
            >
              Terms of Service
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} PDF Converter Elite.
            All rights reserved.
          </span>

          <a
            href="/"
            onClick={event => handleLink(event, '/')}
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
