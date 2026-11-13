
import { useEffect } from 'react';

export default function TermsOfService() {
  useEffect(() => {
    document.title = 'Terms of Service | PDF Converter Elite';

    const meta = document.querySelector(
      'meta[name="description"]'
    );

    if (meta) {
      meta.setAttribute(
        'content',
        'Read the PDF Converter Elite Terms of Service, including acceptable use, document ownership, PDF conversion limitations, security, and user responsibilities.'
      );
    }
  }, []);

  const sectionStyle = {
    marginBottom: 34,
    lineHeight: 1.85,
    color: '#46516c'
  };

  const headingStyle = {
    color: '#15183c',
    fontSize: 'clamp(21px, 4vw, 26px)',
    marginBottom: 12
  };

  return (
    <main style={{
      maxWidth: 900,
      width: '100%',
      margin: '40px auto',
      padding: 24,
      boxSizing: 'border-box',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <header style={sectionStyle}>
        <h1 style={{
          color: '#15183c',
          fontSize: 'clamp(30px, 5vw, 42px)',
          lineHeight: 1.2
        }}>
          Terms of Service
        </h1>

        <p>Last updated: November 13, 2026</p>

        <p>
          Welcome to PDF Converter Elite. These Terms
          of Service explain the conditions for using
          our website and PDF tools.
        </p>

        <p>
          By accessing or using our services, you
          agree to these terms. If you do not agree,
          please discontinue using the website.
        </p>
      </header>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>1. About Our Services</h2>
        <p>
          PDF Converter Elite provides online tools
          for converting, merging, splitting,
          rotating, compressing, and protecting
          PDF documents.
        </p>
        <p>
          Some features operate directly in your
          browser, while others require processing
          through a server.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>2. Eligibility and Lawful Use</h2>
        <p>
          You agree to use PDF Converter Elite
          only for lawful purposes and in
          accordance with applicable laws.
        </p>
        <p>
          You must have the necessary ownership,
          rights, or authorization to upload,
          convert, modify, protect, or unlock
          any document you process.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>3. Prohibited Activities</h2>
        <p>
          You must not use our website to distribute
          unlawful content, violate intellectual
          property rights, interfere with website
          operations, bypass security measures,
          or attempt unauthorized access.
        </p>
        <p>
          Automated or excessive requests that
          disrupt service availability are
          also prohibited.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>4. Document Ownership</h2>
        <p>
          You retain ownership of the documents
          you process using our tools.
          PDF Converter Elite does not claim
          ownership of uploaded files.
        </p>
        <p>
          You are responsible for ensuring that
          your documents comply with applicable
          laws and third-party rights.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>5. File Processing and Privacy</h2>
        <p>
          Some PDF tools process documents locally
          within your browser. Other tools,
          including certain conversions, may
          upload files for server-side processing.
        </p>
        <p>
          Server-side processing is designed
          to use temporary files that are
          removed after processing.
        </p>
        <p>
          For more information, please review
          our{' '}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>6. Conversion Accuracy</h2>
        <p>
          We aim to provide useful and reliable
          document processing tools. However,
          conversion results may vary depending
          on file format, document complexity,
          embedded fonts, images, and layout.
        </p>
        <p>
          We cannot guarantee that converted
          documents will preserve every detail
          of the original file.
        </p>
        <p>
          Please review downloaded files before
          using them for important purposes.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>7. Backups and Data Loss</h2>
        <p>
          You are responsible for maintaining
          backup copies of important documents
          before uploading or processing them.
        </p>
        <p>
          We recommend checking processed files
          before deleting or replacing originals.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>8. Service Availability</h2>
        <p>
          PDF Converter Elite may modify, improve,
          suspend, or discontinue features
          when necessary for maintenance,
          security, or technical reasons.
        </p>
        <p>
          We do not guarantee uninterrupted
          availability of every tool or feature.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>9. Third-Party Services</h2>
        <p>
          Our website may rely on third-party
          services for hosting, infrastructure,
          fonts, or advertising.
        </p>
        <p>
          Third-party services may be subject
          to their own terms and privacy policies.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>10. Disclaimer of Warranties</h2>
        <p>
          To the extent permitted by applicable
          law, PDF Converter Elite is provided
          on an "as is" and "as available" basis.
        </p>
        <p>
          We do not guarantee that the service
          will be error-free, uninterrupted,
          or suitable for every document.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>11. Limitation of Liability</h2>
        <p>
          To the extent permitted by applicable
          law, PDF Converter Elite and its
          operator are not liable for indirect,
          incidental, or consequential losses
          arising from use of the service.
        </p>
        <p>
          Nothing in these terms excludes or
          limits liability that cannot lawfully
          be excluded or limited.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>12. Changes to These Terms</h2>
        <p>
          We may update these Terms of Service
          to reflect changes in our tools,
          operations, or legal requirements.
        </p>
        <p>
          Updated terms will be published on
          this page with a revised date.
          Continued use after changes become
          effective constitutes acceptance
          where permitted by applicable law.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>13. Contact Information</h2>
        <p>
          If you have questions about these
          Terms of Service, please contact:
        </p>

        <p>
          <strong>Website:</strong> PDF Converter Elite
        </p>

        <p>
          <strong>Founder & Operator:</strong> Turaab Shahid
        </p>

        <p>
          <strong>Country:</strong> Pakistan
        </p>

        <p>
          <strong>Email:</strong>{' '}
          <a
            href="mailto:turaab321@gmail.com"
            style={{
              color: '#f23869',
              fontWeight: 700,
              overflowWrap: 'anywhere'
            }}
          >
            turaab321@gmail.com
          </a>
        </p>

        <p>
          For general inquiries, visit our{' '}
          <a href="/contact-us">Contact Us</a>{' '}
          page.
        </p>
      </section>
    </main>
  );
}
