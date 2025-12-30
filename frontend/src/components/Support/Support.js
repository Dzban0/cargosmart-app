import React, { useState } from 'react';
import FAQ from './Doc/FAQ';
import './Support.css';

function Support({ onClose }) {
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const handleOpenFAQ = () => {
    setIsFaqOpen(true);
  };

  const handleCloseFAQ = () => {
    setIsFaqOpen(false);
  };

  if (isFaqOpen) {
    return (
      <div className="support-page">
        <div className="support-header">
          <h2>FAQ</h2>
          <button className="btn" onClick={handleCloseFAQ}>Powrót</button>
        </div>

        <FAQ />
      </div>
    );
  }

  return (
    <div className="support-page">
      <div className="support-header">
        <h2>Pomoc i Dokumentacja</h2>
        <button className="btn" onClick={onClose}>Zamknij</button>
      </div>

      <div className="support-content">
        <button>D1</button>
        <button>D2</button>
        <button>D3</button>
        <button>D4</button>
        <button onClick={handleOpenFAQ}>FAQ</button>
      </div>
    </div>
  );
}

export default Support;