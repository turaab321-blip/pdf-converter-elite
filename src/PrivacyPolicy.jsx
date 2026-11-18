
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
        'Learn how PDF Converter Elite handles uploaded documents, temporary files, cookies, Google AdSense advertising and your privacy rights.'
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

  const linkStyle = {
    color: '#1d4ed8',
    overflowWrap: 'anywhere'
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

        <p>Last updated: November 18, 2026</p>

        <p>
          This Privacy Policy explains how PDF Converter Elite
          collects, uses, processes and protects information
          when you use our website and document conversion tools.
        </p>

        <p>
          PDF Converter Elite is operated by Turaab Shahid,
          based in Pakistan.
        </p>

        <p>
          Website:{' '}
          <a href="https://pdfconverterelite.xyz" style={linkStyle}>
            pdfconverterelite.xyz
          </a>
        </p>

        <p>
          For privacy-related questions, contact{' '}
          <a href="mailto:turaab321@gmail.com" style={linkStyle}>
            turaab321@gmail.com
          </a>.
        </p>
      </header>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          1. Documents and File Processing
        </h2>

        <p>
          Many of our PDF tools process documents directly
          within your web browser without uploading them
          to our conversion server.
        </p>

        <p>
          Advanced PDF to Word and Word to PDF conversions
          upload your selected document to our processing
          server to perform the requested conversion.
        </p>

        <p>
          Server-side conversions use temporary files.
          Our application is designed to delete these files
          after processing completes or fails.
          Unexpected server interruptions may affect
          immediate cleanup.
        </p>

        <p>
          We do not intentionally retain a permanent collection
          of uploaded documents or sell their contents.
          Documents are processed to provide the conversion
          requested by the user.
        </p>

        <p>
          Please avoid uploading highly sensitive or confidential
          documents unless you understand the processing involved
          and have permission to submit them.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          2. Password-Protected Documents
        </h2>

        <p>
          Our PDF protection tools are designed to process
          document passwords within your browser.
          We do not intentionally collect or store
          passwords entered into these tools.
        </p>

        <p>
          Only use these tools with documents you own
          or have permission to modify.
          We do not provide password recovery services.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          3. Information We May Collect
        </h2>

        <p>
          Our website and infrastructure providers may process
          technical information, including:
        </p>

        <ul>
          <li>IP address and approximate location.</li>
          <li>Browser type and device information.</li>
          <li>Operating system and request timestamps.</li>
          <li>Website usage and diagnostic information.</li>
          <li>Security and server error logs.</li>
        </ul>

        <p>
          If you contact us, we may receive your email
          address and the information you voluntarily
          provide in your message.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          4. How We Use Information
        </h2>

        <p>
          Information may be processed for the following purposes:
        </p>

        <ul>
          <li>Providing document conversion services.</li>
          <li>Operating and maintaining our website.</li>
          <li>Improving performance and usability.</li>
          <li>Detecting abuse and security threats.</li>
          <li>Responding to support requests.</li>
          <li>Displaying and measuring advertisements when enabled.</li>
          <li>Meeting applicable legal obligations.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          5. Cookies and Similar Technologies
        </h2>

        <p>
          Our website and third-party providers may use cookies,
          local storage, web beacons and similar technologies
          for website functionality, security, analytics
          and advertising.
        </p>

        <p>
          Cookies are small pieces of information stored
          on your device. You can manage or disable cookies
          through your browser settings.
          Some website features may be affected
          if certain cookies are disabled.
        </p>

        <p>
          Where required by applicable law, consent will be
          requested before using non-essential cookies
          or other technologies that require permission.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          6. Google AdSense and Third-Party Advertising
        </h2>

        <p>
          PDF Converter Elite may display advertisements
          through Google AdSense when advertising is enabled.
        </p>

        <p>
          Third-party vendors, including Google, may use cookies
          and similar identifiers to serve advertisements
          based on a user's previous visits to this website
          or other websites.
        </p>

        <p>
          Google and its advertising partners may collect
          information such as browsing activity, IP addresses
          and device identifiers for advertising,
          measurement and fraud prevention.
        </p>

        <p>
          Advertisements may be personalized or non-personalized,
          depending on your privacy preferences,
          consent choices and applicable requirements.
        </p>

        <p>
          Learn how Google processes information from websites
          that use its services:
        </p>

        <p>
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            How Google uses information from sites or apps
            that use its services
          </a>
        </p>

        <p>
          You can manage or opt out of personalized
          Google advertising through{' '}
          <a
            href="https://myadcenter.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Google My Ad Center
          </a>.
        </p>

        <p>
          Information about additional advertising
          opt-out choices is available at{' '}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Digital Advertising Alliance
          </a>.
        </p>

        <p>
          Google Privacy Policy:{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            policies.google.com/privacy
          </a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          7. Advertising Consent and Privacy Choices
        </h2>

        <p>
          Before enabling advertising that requires consent,
          we will configure appropriate consent mechanisms.
        </p>

        <p>
          For visitors in the European Economic Area,
          United Kingdom and Switzerland, we will use a
          Google-certified consent management platform
          when required for Google advertising.
        </p>

        <p>
          Where applicable, users will be able to manage
          their consent preferences and withdraw consent
          through the available privacy controls.
        </p>

        <p>
          Additional privacy choices may be provided
          to visitors in jurisdictions with applicable
          data protection requirements.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          8. Third-Party Services
        </h2>

        <p>
          Our website uses third-party infrastructure
          providers to support website delivery,
          document processing and related services.
        </p>

        <p>These providers include:</p>

        <ul>
          <li>
            Cloudflare: website delivery and infrastructure.{' '}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Privacy Policy
            </a>
          </li>

          <li>
            Render: server-side document processing.{' '}
            <a
              href="https://render.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Privacy Policy
            </a>
          </li>

          <li>
            Google: advertising services when enabled,
            and related website services.{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Privacy Policy
            </a>
          </li>
        </ul>

        <p>
          These providers may handle information according
          to their own privacy policies and service terms.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          9. Data Sharing and International Processing
        </h2>

        <p>
          Information may be processed by infrastructure
          and service providers when necessary to operate
          our website, complete conversions or provide
          advertising services.
        </p>

        <p>
          Information may also be disclosed when required
          by applicable law or to protect the security
          and lawful operation of our services.
        </p>

        <p>
          Because our infrastructure providers operate
          internationally, information may be processed
          outside your country of residence.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          10. Data Retention
        </h2>

        <p>
          Uploaded documents are intended to be retained
          only for the time necessary to perform the
          requested server-side conversion.
        </p>

        <p>
          Our application attempts to remove temporary
          input and output files when processing finishes
          or encounters an error.
        </p>

        <p>
          Technical logs and support correspondence may
          be retained for different periods depending
          on operational, security and legal requirements.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          11. Data Security
        </h2>

        <p>
          We aim to use reasonable technical safeguards
          to protect information processed through our
          website, including HTTPS connections and
          temporary document processing.
        </p>

        <p>
          No internet transmission or computer system
          can guarantee absolute security.
          Users should maintain backup copies
          of important documents.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          12. Your Privacy Rights
        </h2>

        <p>
          Depending on your location and applicable law,
          you may have rights relating to your personal data,
          including access, correction, deletion,
          restriction, portability and objection.
        </p>

        <p>
          Where processing relies on consent,
          you may withdraw that consent.
          Other lawful processing may continue where permitted.
        </p>

        <p>
          To submit a privacy request, contact us at{' '}
          <a href="mailto:turaab321@gmail.com" style={linkStyle}>
            turaab321@gmail.com
          </a>.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          13. Children's Privacy
        </h2>

        <p>
          PDF Converter Elite is a general-purpose
          document utility website and is not
          specifically directed at children under 13.
        </p>

        <p>
          We do not knowingly collect personal
          information from children under 13.
          If you believe such information has been
          submitted, please contact us for review.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          14. Changes to This Privacy Policy
        </h2>

        <p>
          We may update this policy when our tools,
          hosting arrangements, advertising services,
          legal requirements or data processing practices change.
        </p>

        <p>
          The latest revision date will be displayed
          at the top of this page.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          15. Contact Information
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
            style={linkStyle}
          >
            turaab321@gmail.com
          </a>
        </p>

        <p>
          You can also visit our{' '}
          <a href="/contact-us" style={linkStyle}>
            Contact Us
          </a>{' '}
          page.
        </p>
      </section>

    </main>
  );
}
