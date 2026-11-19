
const faqs = {
  'PDF to Word': [
    [
      'How can I convert a PDF to Word online?',
      'Open the PDF to Word tool, upload your PDF document, start the conversion and download the resulting Word file. Review the document after conversion.'
    ],
    [
      'Is the converted Word document editable?',
      'The current converter places PDF pages into a Word document as images. You can open the DOCX file in Microsoft Word, but the original text is not directly editable.'
    ],
    [
      'Will my PDF layout look the same in Word?',
      'The converter uses images of PDF pages to help retain their visual appearance. Results can vary, so check page sizes, images and formatting in the downloaded document.'
    ],
    [
      'Can I convert a scanned PDF to Word?',
      'Yes, scanned PDF pages can be included as images in the Word document. However, this tool does not perform OCR, so text inside scanned pages will not become editable.'
    ],
    [
      'Can I convert a PDF containing tables and pictures?',
      'The converter can include pages containing tables, pictures and other visual elements as images. It does not reconstruct those elements as editable Word tables or objects.'
    ],
    [
      'What should I do if the Word file is too large?',
      'Image-based Word documents can be larger than expected, especially when the original PDF contains many pages. Try a smaller document or optimize the original PDF before conversion.'
    ]
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
