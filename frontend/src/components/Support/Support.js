import React, { useState } from 'react';
import FAQ from './Doc/FAQ';
import PdfViewer from '../../PdfViewer';
import './Support.css';

function Support({ onClose }) {
  const [view, setView] = useState(null);

  const documents = {
    user: {
      title: 'Dokumentacja dla użytkownika',
      file: './assets/Dokumentacja_dla_uzytkownika.pdf',
    },
    tech: {
      title: 'Dokumentacja techniczna',
      file: './assets/Dokumentacja_techniczna_systemu.pdf',
    },
    deploy: {
      title: 'Procedura odbioru i wdrożenia',
      file: './assets/Procedura_odbioru_i_wdrożenia.pdf',
    },
    maintain: {
      title: 'Utrzymanie systemu',
      file: './assets/Utrzymanie_systemu.pdf',
    },
  };


  if (view === 'faq') {
    return (
      <div className="support-page">
        <div className="support-header">
          <h2>FAQ</h2>
          <button className="btn" onClick={() => setView(null)}>
            Powrót
          </button>
        </div>
        <FAQ />
      </div>
    );
  }

  if (documents[view]) {
    return (
      <PdfViewer
        title={documents[view].title}
        file={documents[view].file}
        onBack={() => setView(null)}
      />
    );
  }

  return (
    <div className="support-page">
      <div className="support-header">
        <h2>Pomoc i Dokumentacja</h2>
        <button className="btn" onClick={onClose}>Zamknij</button>
      </div>

      <div className="support-content">
        <p>
          <button onClick={() => setView('user')}>
            Dokumentacja dla użytkownika
          </button>
        </p>
        <p>
          <button onClick={() => setView('tech')}>
            Dokumentacja techniczna
          </button>
        </p>
        <p>
          <button onClick={() => setView('deploy')}>
            Procedura odbioru i wdrożenia
          </button>
        </p>
        <p>
          <button onClick={() => setView('maintain')}>
            Utrzymanie systemu
          </button>
        </p>
      </div>
    </div>
  );
}

export default Support;