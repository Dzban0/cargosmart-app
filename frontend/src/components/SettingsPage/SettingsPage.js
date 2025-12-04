import React from "react";
import "./SettingsPage.css";

function SettingsPage({ onBack, onLogout }) {
  return (
    <div className="settings-page">
      <h2>Ustawienia użytkownika</h2>

      <div className="buttons">
        <button onClick={onBack}>Powrót</button>
        <button onClick={onLogout}>Wyloguj</button>
      </div>

      <div className="settings-content">
        <p>Tu możesz dodać ustawienia profilu, zmianę hasła, itp.</p>
      </div>
    </div>
  );
}

export default SettingsPage;
