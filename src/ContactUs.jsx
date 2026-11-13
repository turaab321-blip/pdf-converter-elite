
import { useEffect } from 'react';

export default function ContactUs() {
  useEffect(() => {
    document.title = 'Contact Us | PDF Converter Elite';

    const meta = document.querySelector(
      'meta[name="description"]'
    );

    if (meta) {
      meta.setAttribute(
        'content',
        'Contact PDF Converter Elite for PDF tool support, conversion issues, questions and feedback. Reach founder Turaab Shahid by email.'
      );
    }
  }, []);

  const sectionStyle = {
    marginBottom: 32,
    lineHeight: 1.85,
    color: '#46516c'
  };

  const headingStyle = {
    color: '#15183c',
    fontSize: 'clamp(22px, 4vw, 27px)',
    marginBottom: 12
  };

  return (
    <main style={{
      maxWidth: 900,
      width: '100%',
      margin: '40px auto',
      padding: 24,
      boxSizing: 'border-box',
      fontFamily: "'DM Sans', sans-serif",
      minHeight: '60vh'
    }}>
      <header style={sectionStyle}>
        <h1 style={{
          color: '#15183c',
          fontSize: 'clamp(30px, 5vw, 42px)',
          lineHeight: 1.2
        }}>
          Contact PDF Converter Elite
        </h1>

        <p>
          Need help using our PDF tools? Have a question
          about document conversion or want to share
          feedback? We welcome your messages.
        </p>
      </header>

      <section style={{
        background: '#ffffff',
        padding: 'clamp(20px, 4vw, 34px)',
        borderRadius: 18,
        border: '1px solid #e8eaf5',
        boxShadow: '0 8px 25px #252b5b0a',
        marginBottom: 36
      }}>
        <h2 style={headingStyle}>Get in Touch</h2>

        <p style={sectionStyle}>
          For general inquiries, technical support,
          suggestions, or feedback, please contact
          us using the email address below.
        </p>

        <p><strong>Website:</strong> PDF Converter Elite</p>

        <p>
          <strong>Founder & Developer:</strong> Turaab Shahid
        </p>

        <p><strong>Country:</strong> Pakistan</p>

        <p>
          <strong>Support Email:</strong>{' '}
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

        <a
          href="mailto:turaab321@gmail.com?subject=PDF%20Converter%20Elite%20Support"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(120deg, #ff667c, #f23869)',
            color: '#ffffff',
            padding: '14px 25px',
            borderRadius: 30,
            fontWeight: 700,
            textDecoration: 'none',
            marginTop: 20
          }}
        >
          Send an Email →
        </a>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          Technical Support
        </h2>

        <p>
          If you experience a problem while merging,
          splitting, compressing, protecting, or
          converting PDF documents, please describe
          the issue in your email.
        </p>

        <p>
          To help us understand the problem, include
          the name of the PDF tool, your browser,
          and any error message you received.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          Questions and Feedback
        </h2>

        <p>
          We appreciate suggestions about improving
          our PDF tools, website accessibility,
          document compatibility, and overall
          user experience.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          Privacy and Sensitive Documents
        </h2>

        <p>
          Please do not email passwords, confidential
          files, financial records, or sensitive
          personal information when requesting support.
        </p>

        <p>
          For information about how our website
          handles files and technical data,
          please review our{' '}
          <a href="/privacy-policy">
            Privacy Policy
          </a>.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          Helpful Information
        </h2>

        <p>
          You can explore our available PDF tools
          on the{' '}
          <a href="/">homepage</a>.
          To learn more about our platform,
          visit the{' '}
          <a href="/about-us">About Us</a>{' '}
          page.
        </p>
      </section>
    </main>
  );
}
