import { useState } from "react"; 
import { login, register } from "../services/authService"; 

export const Login = ({ onLoginSuccess }) => { 
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(loginInput, password);  
        onLoginSuccess(); 
      } else {
        await login(loginInput, password);
        onLoginSuccess(); 
      }
    } catch (err) {
      setError(isRegistering ? "Błąd rejestracji" : "Nieprawidłowe login lub hasło");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-600">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">
          CargoSmart - Zarządzanie magazynowaniem i transportem
        </h2>
        <h2 className="text-xl font-bold mb-4">{isRegistering ? "Rejestracja" : "Logowanie"}</h2>
        
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Login"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded hover:bg-black"
        >
          {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
        </button>
        
        <p className="mt-4 text-center text-sm">
          {isRegistering ? "Masz już konto? " : "Nie masz konta? "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 hover:underline"
          >
            {isRegistering ? "Zaloguj się" : "Zarejestruj się"}
          </button>
        </p>
      </form>
    </div>
  );
};