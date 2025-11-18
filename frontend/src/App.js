import React, { useState, useEffect } from "react";
import './App.css';
import HomePage from './components/HomePage/HomePage';
import { Login } from "./components/Login/Login";

function App() {
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLogged(true);
  }, []);

  // if (!isLogged) {
  //   return <Login onLoginSuccess={() => setIsLogged(true)} />;
  // }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto p-4">
        <HomePage />
      </div>
    </div>
  );
}

export default App;