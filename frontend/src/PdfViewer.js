import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer({ title, file, onBack }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="support-page">
      <div className="support-header">
        <h2>{title}</h2>
        <button className="btn" onClick={onBack}>Powrót</button>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading="Ładowanie PDF..."
        >
          <Page pageNumber={pageNumber} />
        </Document>

        <div style={{ marginTop: 16 }}>
          <button onClick={() => setPageNumber(p => p - 1)} disabled={pageNumber <= 1}>
            Poprzednia
          </button>

          <span style={{ margin: '0 12px' }}>
            Strona {pageNumber} z {numPages}
          </span>

          <button onClick={() => setPageNumber(p => p + 1)} disabled={pageNumber >= numPages}>
            Następna
          </button>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;