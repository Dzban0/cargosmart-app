import React, { useState, useEffect } from "react";
import './App.css';
import HomePage from './components/HomePage/HomePage';
import { Login } from "./components/Login/Login";

function App() {
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLogged(true);
  }, []);

  if (!isLogged) {
    return <Login onLoginSuccess={() => setIsLogged(true)} />;
  }

  return (
      <div className="App">
        <HomePage />
      </div>
  );
}

export default App;