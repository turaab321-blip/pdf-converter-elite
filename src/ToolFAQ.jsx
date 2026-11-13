const faqs = {
  'PDF to Word': [
    ['Can I edit the converted Word file?', 'Yes, you can edit the resulting Word document. Formatting may need adjustments.'],
    ['Will the original layout be preserved?', 'Results depend on the PDF structure. Complex layouts and scanned pages may not convert accurately.']
  ],
  'PDF to Excel': [
    ['Can I extract tables from a PDF?', 'You can extract supported PDF content into a spreadsheet. Complex tables may require manual corrections.'],
    ['Does it work with scanned PDFs?', 'Scanned documents may require OCR before their text can be extracted.']
  ],
  'Merge PDF': [
    ['Can I combine multiple PDFs?', 'Yes. Select the PDF files you want to merge and download the combined document.'],
    ['Does merging change the original files?', 'Your original files remain unchanged. The tool creates a separate merged PDF.']
  ],
  'Split PDF': [
    ['Why should I split a PDF?', 'Splitting helps separate pages for easier sharing and organization.'],
    ['Can I keep my original PDF?', 'Yes. Download the resulting files without replacing your original document.']
  ],
  'Compress PDF': [
    ['Will compression reduce PDF quality?', 'Some compression methods can reduce image quality. Review the output before sharing.'],
    ['Why is my PDF not much smaller?', 'Already optimized documents may have limited opportunities for further compression.']
  ],
  'Protect PDF': [
    ['Can I add a password to my PDF?', 'Yes. Use the Protect PDF feature to apply password protection.'],
    ['Can I unlock any PDF?', 'Only unlock documents you own or have permission to modify, using the required password.']
  ],
  'Word to PDF': [
    ['Which Word format is supported?', 'The conversion service accepts DOCX documents.'],
    ['Will my formatting stay the same?', 'Most standard formatting can be converted, but complex layouts should be checked afterward.']
  ],
  'JPG to PDF': [
    ['Can I convert a JPG image to PDF?', 'Yes. Choose your JPG image and create a PDF document.'],
    ['Will image quality change?', 'The result depends on the original image and the conversion settings.']
  ],
  'Rotate PDF': [
    ['Can I correct sideways PDF pages?', 'Yes. Rotate pages to improve their orientation and readability.'],
    ['Will rotating remove content?', 'Rotation is intended to change page orientation, not remove document content.']
  ]
};

export default function ToolFAQ({ name }) {
  const items = faqs[name] || [];
  if (!items.length) return null;

  return (
    <section style={{
      maxWidth: 850,
      margin: '30px auto 55px',
      padding: '0 20px',
      lineHeight: 1.8
    }}>
      <h2>Frequently Asked Questions</h2>
      {items.map(([question, answer]) => (
        <details key={question} style={{
          padding: '15px 0',
          borderBottom: '1px solid #e8eaf5'
        }}>
          <summary style={{
            cursor: 'pointer',
            fontWeight: 700,
            color: '#15183c'
          }}>{question}</summary>
          <p style={{ color: '#46516c' }}>{answer}</p>
        </details>
      ))}
    </section>
  );
}
