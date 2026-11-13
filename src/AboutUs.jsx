
import { useEffect } from 'react';

export default function AboutUs() {
  useEffect(() => {
    document.title =
      'About Us | PDF Converter Elite';

    const description =
      'Learn about PDF Converter Elite, its mission, PDF tools, and founder Turaab Shahid. Contact us for questions and feedback.';

    let meta = document.querySelector(
      'meta[name="description"]'
    );

    if (meta) {
      meta.setAttribute('content', description);
    }
  }, []);

  const sectionStyle = {
    marginBottom: 34,
    lineHeight: 1.85,
    color: '#46516c'
  };

  const headingStyle = {
    color: '#15183c',
    fontSize: 'clamp(22px, 4vw, 27px)',
    marginBottom: 12
  };

  return (
    <main
      style={{
        maxWidth: 900,
        width: '100%',
        margin: '40px auto',
        padding: '24px',
        boxSizing: 'border-box',
        fontFamily: "'DM Sans', sans-serif",
        color: '#46516c'
      }}
    >
      <header style={sectionStyle}>
        <h1
          style={{
            color: '#15183c',
            fontSize: 'clamp(30px, 5vw, 42px)',
            lineHeight: 1.2
          }}
        >
          About PDF Converter Elite
        </h1>

        <p>
          PDF Converter Elite is a free online PDF
          toolkit designed to simplify everyday
          document tasks. Our platform brings
          essential PDF tools together in one
          convenient, easy-to-use workspace.
        </p>
      </header>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          Who We Are
        </h2>

        <p>
          PDF Converter Elite was founded and
          developed by Turaab Shahid, an independent
          developer based in Pakistan.
        </p>

        <p>
          The project was created with a simple goal:
          to help people work with PDF documents
          without unnecessary complexity.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          Our Mission
        </h2>

        <p>
          Our mission is to make useful document
          tools accessible to students, educators,
          professionals, businesses, and individuals
          around the world.
        </p>

        <p>
          We focus on straightforward workflows,
          clear instructions, and practical tools
          that help users complete common document
          tasks efficiently.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          What Can You Do With Our Tools?
        </h2>

        <p>
          PDF Converter Elite offers a collection
          of document tools, including:
        </p>

        <ul style={{ paddingLeft: 24 }}>
          <li>Merge multiple PDF files into one document.</li>
          <li>Split PDF documents into separate pages.</li>
          <li>Rotate pages in PDF documents.</li>
          <li>Compress PDF files to reduce file size.</li>
          <li>Protect and unlock authorized PDF documents.</li>
          <li>Convert JPG images into PDF files.</li>
          <li>Convert Word documents into PDF files.</li>
          <li>Convert PDF content into Word documents.</li>
          <li>Extract PDF text and data into Excel files.</li>
        </ul>

        <p>
          Conversion results may vary depending
          on the document's formatting, complexity,
          and original file structure.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          How PDF Converter Elite Works
        </h2>

        <p>
          Choose a PDF tool from our homepage,
          select your document, follow the
          instructions, and download the
          processed result.
        </p>

        <p>
          Our tools are designed for use through
          a web browser, making common PDF tasks
          accessible without installing a
          separate desktop application.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          Our Approach to Privacy
        </h2>

        <p>
          We recognize that documents may contain
          personal or confidential information.
          Some tools process files locally in
          your browser, while certain conversions
          require server-side processing.
        </p>

        <p>
          We aim to handle documents responsibly
          and provide clear information about
          our processing practices.
          Please read our{' '}
          <a href="/privacy-policy">
            Privacy Policy
          </a>{' '}
          for more details.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          Continuous Improvement
        </h2>

        <p>
          PDF Converter Elite is an evolving
          project. We aim to improve usability,
          performance, compatibility, and
          accessibility as the platform develops.
        </p>

        <p>
          User feedback helps us identify issues
          and prioritize improvements.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          Contact the Founder
        </h2>

        <p>
          Have a question, suggestion, or
          technical issue? We welcome feedback.
        </p>

        <p>
          <strong>Founder & Developer:</strong>{' '}
          Turaab Shahid
        </p>

        <p>
          <strong>Location:</strong>{' '}
          Pakistan
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
          <a href="/contact-us">
            Contact Us
          </a>{' '}
          page.
        </p>
      </section>
    </main>
  );
}
