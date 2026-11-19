
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
    [
      'How can I convert a PDF to Excel online?',
      'Open the PDF to Excel converter, upload a supported PDF document, start the conversion and download the resulting Excel spreadsheet.'
    ],
    [
      'Can I extract tables from a PDF into Excel?',
      'The tool extracts supported PDF text and data into a spreadsheet. Tables with complex formatting, merged cells or unusual layouts may need manual adjustments.'
    ],
    [
      'Can I convert a scanned PDF to Excel?',
      'Scanned PDFs usually contain images rather than selectable text. This converter does not provide OCR, so scanned documents may need OCR processing before their data can be extracted.'
    ],
    [
      'Will the original PDF formatting be preserved?',
      'PDF and Excel use different document structures. The extracted information may not retain the original table layout, fonts, spacing or column arrangement.'
    ],
    [
      'Can I edit the converted Excel spreadsheet?',
      'The resulting spreadsheet can be opened in compatible spreadsheet applications. Extracted text and data can be edited, although some information may require manual cleanup.'
    ],
    [
      'Why are some rows or columns missing after conversion?',
      'PDF files do not always store information as structured spreadsheet tables. Complex page layouts, scanned content and unusual text positioning can affect extraction accuracy.'
    ]
  ],

  'Merge PDF': [
    [
      'How do I merge multiple PDF files online?',
      'Open the Merge PDF tool, select the PDF documents you want to combine, start the process and download the merged PDF file.'
    ],
    [
      'Can I combine PDF files into one document?',
      'Yes. The tool combines selected PDF documents into a single file, making them easier to organize, print and share.'
    ],
    [
      'Does merging PDFs reduce their quality?',
      'Merging generally combines existing PDF pages rather than intentionally compressing them. Review the downloaded file to confirm that the pages look correct.'
    ],
    [
      'Can I merge PDFs containing images and text?',
      'Yes. Supported PDF files can contain text, images and other page elements. The merged document should be checked before sharing.'
    ],
    [
      'Will my original PDF files be changed?',
      'No. The merging process creates a separate PDF document. Your original files are not replaced by the downloaded result.'
    ],
    [
      'Why should I combine PDF documents?',
      'Combining PDFs is useful for organizing reports, invoices, application documents, study notes and other related files into one document.'
    ]
  ],

  'Split PDF': [
    [
      'How can I split a PDF file online?',
      'Open the Split PDF tool, upload your PDF, choose the available splitting options and download the resulting file or files.'
    ],
    [
      'Can I separate pages from a PDF document?',
      'The Split PDF tool is designed to separate PDF pages. Review the available options to select the pages you need.'
    ],
    [
      'Why would I need to split a PDF?',
      'Splitting can help you share only relevant pages, organize large documents or separate sections of a report.'
    ],
    [
      'Will splitting a PDF delete the original file?',
      'No. The tool creates downloadable output without intentionally replacing your original PDF document.'
    ],
    [
      'Can I split a PDF containing scanned pages?',
      'Scanned pages can remain part of a PDF document. Splitting separates pages and does not convert scanned images into editable text.'
    ],
    [
      'Does splitting a PDF change its page quality?',
      'The process is intended to separate pages rather than reduce image quality. Check the output to confirm that the required pages are present.'
    ]
  ],

  'Compress PDF': [
    [
      'How can I compress a PDF online?',
      'Open the Compress PDF tool, select your PDF document, start compression and download the resulting file.'
    ],
    [
      'Will compressing a PDF reduce its file size?',
      'Compression may reduce the file size, but the amount saved depends on the original document and how it was created.'
    ],
    [
      'Why is my compressed PDF still large?',
      'PDF files containing large images or already optimized content may have limited opportunities for further size reduction.'
    ],
    [
      'Does PDF compression reduce document quality?',
      'Some compression techniques may affect image quality or other document elements. Review the downloaded PDF before using it.'
    ],
    [
      'Can I compress a PDF containing images?',
      'PDF documents containing images may benefit from compression. The final file size depends on the images and the available compression method.'
    ],
    [
      'When is PDF compression useful?',
      'Compression can help when uploading documents, sending email attachments or storing PDF files with limited space.'
    ]
  ],

  'Protect PDF': [
    [
      'How can I password protect a PDF online?',
      'Open the Protect PDF tool, upload your PDF, enter a password using the available protection option and download the protected document.'
    ],
    [
      'Why should I add a password to a PDF?',
      'Password protection can help restrict access to documents containing information that you do not want others to open without permission.'
    ],
    [
      'Can I unlock a password-protected PDF?',
      'You can use the available unlock option when you have the required password and permission to modify the document.'
    ],
    [
      'Can I unlock a PDF without knowing its password?',
      'This tool is not intended to bypass passwords or security restrictions. Use it only for documents you are authorized to access.'
    ],
    [
      'Will protecting a PDF change its content?',
      'Password protection is intended to control access rather than edit document content. Review the protected file after downloading it.'
    ],
    [
      'What happens if I forget my PDF password?',
      'You may be unable to open the protected document without the correct password. Keep your password in a secure location.'
    ]
  ],

  'Word to PDF': [
    [
      'How can I convert Word to PDF online?',
      'Open the Word to PDF converter, upload a supported DOCX document, start the conversion and download the PDF file.'
    ],
    [
      'Which Word file format is supported?',
      'The current Word to PDF conversion service accepts DOCX documents. Older DOC files may need to be saved as DOCX first.'
    ],
    [
      'Will my Word document formatting be preserved?',
      'Standard document formatting can usually be converted, but fonts, page breaks, tables and complex layouts should be reviewed afterward.'
    ],
    [
      'Why should I convert Word documents to PDF?',
      'PDF files are convenient for sharing, printing and presenting documents across different devices and applications.'
    ],
    [
      'Can I convert a Word document containing images?',
      'DOCX documents can contain images, tables and formatted text. The conversion result depends on the document structure and supported features.'
    ],
    [
      'Why does my converted PDF look different?',
      'Font availability, document layout and unsupported formatting features can affect the result. Check the original DOCX formatting and try again if necessary.'
    ]
  ],

  'JPG to PDF': [
    [
      'How can I convert JPG to PDF online?',
      'Open the JPG to PDF tool, select your JPG image, start the conversion and download the resulting PDF document.'
    ],
    [
      'Can I turn a photo into a PDF document?',
      'Yes. JPG to PDF conversion is useful for turning photographs, document pictures and other supported JPG images into PDF format.'
    ],
    [
      'Will converting JPG to PDF improve image quality?',
      'Conversion does not automatically increase the quality of the original image. The result depends on the source picture.'
    ],
    [
      'Why should I convert an image to PDF?',
      'PDF format can make document photographs and images easier to share, print and organize.'
    ],
    [
      'Can I convert a scanned document photo to PDF?',
      'Yes. A supported JPG image of a document can be converted into PDF format, but the text inside the image does not automatically become editable.'
    ],
    [
      'Will the JPG image remain visible in the PDF?',
      'The conversion is designed to place the selected image into a PDF document. Review the output to confirm its appearance and page layout.'
    ]
  ],

  'Rotate PDF': [
    [
      'How can I rotate PDF pages online?',
      'Open the Rotate PDF tool, upload your PDF document, select the available rotation option and download the rotated file.'
    ],
    [
      'Can I fix sideways PDF pages?',
      'Yes. PDF rotation helps correct sideways pages so that documents are easier to read and print.'
    ],
    [
      'Can I rotate an upside-down PDF?',
      'Rotation can help correct pages that appear upside down. Select the appropriate rotation option and review the result.'
    ],
    [
      'Does rotating a PDF remove its text or images?',
      'Rotation is intended to change page orientation rather than remove document content. Check the resulting PDF after processing.'
    ],
    [
      'Why are some PDF pages sideways?',
      'PDF pages may appear sideways because of scanning orientation, document creation settings or incorrect page rotation.'
    ],
    [
      'Will my original PDF remain unchanged?',
      'The tool creates a downloadable rotated document without intentionally replacing your original PDF file.'
    ]
  ]
};

export default function ToolFAQ({ name }) {
  const items = faqs[name] || [];

  if (!items.length) return null;

  return (
    <section
      style={{
        maxWidth: 850,
        margin: '30px auto 55px',
        padding: '0 20px',
        lineHeight: 1.8
      }}
    >
      <h2>Frequently Asked Questions</h2>

      {items.map(([question, answer]) => (
        <details
          key={question}
          style={{
            padding: '15px 0',
            borderBottom: '1px solid #e8eaf5'
          }}
        >
          <summary
            style={{
              cursor: 'pointer',
              fontWeight: 700,
              color: '#15183c'
            }}
          >
            {question}
          </summary>

          <p style={{ color: '#46516c' }}>
            {answer}
          </p>
        </details>
      ))}
    </section>
  );
}
