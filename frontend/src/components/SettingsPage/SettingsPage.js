import React, { useState, useEffect } from 'react';
import './SettingsPage.css';

function SettingsPage({ onClose }) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user');
        const data = await response.json();
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
        });
      } catch (err) {
        console.error('Błąd podczas pobierania danych użytkownika', err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Dane zostały zapisane!');
        onClose();
      } else {
        alert('Błąd podczas zapisywania danych');
      }
    } catch (err) {
      console.error('Błąd podczas zapisywania danych', err);
      alert('Błąd podczas zapisywania danych');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Ustawienia</h2>
        <button className="btn" onClick={onClose}>Zamknij</button>
      </div>

      <div className="settings-content">
        
        <div className="setting">
          <button 
            className="btn" 
            onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'Ukryj formularz danych użytkownika' : 'Zmień dane użytkownika'}
          </button>
          
          {isFormVisible && (
            <div className="user-form">
              <div className="setting">
                <label>Imię:</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={userData.firstName} 
                  onChange={handleChange} 
                  placeholder="Wprowadź imię"
                />
              </div>

              <div className="setting">
                <label>Nazwisko:</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={userData.lastName} 
                  onChange={handleChange} 
                  placeholder="Wprowadź nazwisko"
                />
              </div>

              <div className="setting">
                <label>Login:</label>
                <input 
                  type="text" 
                  name="username" 
                  value={userData.username} 
                  onChange={handleChange} 
                  placeholder="Wprowadź login"
                />
              </div>

              <div className="setting">
                <button className="btn" onClick={handleSave}>Zapisz</button>
              </div>
            </div>
          )}
        </div>

        <div className="setting">
          <label>Tryb jasny/ciemny:</label>
          <button className="btn" onClick={toggleDarkMode}>
            {darkMode ? 'Tryb jasny' : 'Tryb ciemny'}
          </button>
        </div>

        <div className="setting">
          <button className="btn">Zmień hasło</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;