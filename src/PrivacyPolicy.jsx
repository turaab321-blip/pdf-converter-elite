
import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | PDF Converter Elite';

    const meta = document.querySelector(
      'meta[name="description"]'
    );

    if (meta) {
      meta.setAttribute(
        'content',
        'Read the PDF Converter Elite Privacy Policy to learn about document processing, temporary files, browser data, cookies, advertising, and privacy rights.'
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
          Privacy Policy
        </h1>

        <p>Last updated: November 13, 2026</p>

        <p>
          This Privacy Policy explains how PDF Converter
          Elite handles documents, passwords, technical
          information, and other data when you use our
          website and PDF tools.
        </p>

        <p>
          PDF Converter Elite is operated by Turaab Shahid,
          based in Pakistan. For privacy-related questions,
          you can contact us at{' '}
          <a href="mailto:turaab321@gmail.com">
            turaab321@gmail.com
          </a>.
        </p>
      </header>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          1. Documents and File Processing
        </h2>

        <p>
          Some PDF tools process documents directly
          within your web browser. Other tools,
          including Word to PDF conversion, may
          upload documents to our processing server.
        </p>

        <p>
          Server-side conversions use temporary files
          for processing. Our application is designed
          to remove these temporary files after
          processing finishes or fails.
        </p>

        <p>
          We do not intentionally maintain a permanent
          collection of documents uploaded for conversion.
          However, server infrastructure and hosting
          configurations may affect how technical
          records are handled.
        </p>

        <p>
          Please avoid submitting highly sensitive
          or confidential documents unless you
          understand and accept the processing involved.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          2. Password-Protected PDF Files
        </h2>

        <p>
          Our Protect PDF and Unlock PDF features
          are designed to process PDF passwords
          within your browser.
        </p>

        <p>
          Only use these tools with documents you
          own or have permission to modify.
          We do not provide password recovery services.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          3. Technical and Usage Information
        </h2>

        <p>
          When you access our website, hosting
          providers and infrastructure services
          may process information such as your
          IP address, browser type, device details,
          request timestamps, and diagnostic logs.
        </p>

        <p>
          This information may be used for
          website operation, troubleshooting,
          performance monitoring, and security.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          4. Cookies and Similar Technologies
        </h2>

        <p>
          Our website may use cookies or similar
          technologies when necessary for website
          functionality, analytics, or advertising.
        </p>

        <p>
          The types of cookies used will depend
          on the services enabled on the live website.
          Where required by applicable law, we
          will provide appropriate information
          and consent choices.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          5. Google AdSense and Advertising
        </h2>

        <p>
          PDF Converter Elite may display advertisements
          through Google AdSense or other advertising
          partners in the future.
        </p>

        <p>
          If advertising services are enabled,
          advertising providers may use cookies,
          identifiers, or similar technologies
          to deliver and measure advertisements,
          subject to applicable privacy rules
          and consent requirements.
        </p>

        <p>
          This policy will be updated to reflect
          the advertising services actually
          implemented before or when they are enabled.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          6. Third-Party Services
        </h2>

        <p>
          Our website may use third-party services
          for hosting, fonts, website infrastructure,
          or other operational features.
        </p>

        <p>
          These providers may process technical
          information according to their own
          privacy policies and service terms.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          7. Data Retention
        </h2>

        <p>
          Files submitted for server-side conversion
          are intended to be retained only for the
          time needed to process the requested task.
        </p>

        <p>
          Technical logs and other operational data
          may have different retention periods
          depending on the hosting provider
          and infrastructure configuration.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          8. Data Security
        </h2>

        <p>
          We aim to use reasonable technical
          safeguards to protect information
          processed through our services.
        </p>

        <p>
          No website or internet transmission
          can guarantee absolute security.
          Users should maintain backup copies
          of important documents.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          9. Your Privacy Rights
        </h2>

        <p>
          Depending on your location and applicable
          laws, you may have rights to request
          access to, correction of, or deletion
          of certain personal information.
        </p>

        <p>
          To submit a privacy-related request,
          contact us using the email address
          provided below.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          10. Children's Privacy
        </h2>

        <p>
          PDF Converter Elite is a general-purpose
          document utility website and is not
          specifically directed at children.
        </p>

        <p>
          If you believe personal information
          relating to a child has been submitted
          inappropriately, please contact us
          so we can review the concern.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          11. Changes to This Privacy Policy
        </h2>

        <p>
          We may update this Privacy Policy
          when our tools, hosting arrangements,
          data processing practices, or
          third-party services change.
        </p>

        <p>
          The latest revision date will be
          displayed at the top of this page.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          12. Contact Information
        </h2>

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
          You can also visit our{' '}
          <a href="/contact-us">Contact Us</a>{' '}
          page for additional information.
        </p>
      </section>
    </main>
  );
}
