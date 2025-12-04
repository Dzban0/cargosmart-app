import React, { useState, useEffect } from "react";
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Login from "./components/Login/Login";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLogged(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  if (!isLogged) {
    return <Login onLoginSuccess={() => setIsLogged(true)} />;
  }

  return (
    <div className="App">
      <HomePage onLogout={handleLogout} />
    </div>
  );
}

export default App;