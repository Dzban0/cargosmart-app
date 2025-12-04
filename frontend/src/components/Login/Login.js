import { useState } from "react";
import { login, register } from "../../services/authService";
import './Login.css';

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
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-box">
        <h2 className="title">CargoSmart - Zarządzanie magazynowaniem i transportem</h2>
        <h2 className="subtitle">{isRegistering ? "Rejestracja" : "Logowanie"}</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Login"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="submit">
          {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
        </button>

        <p className="switch-text">
          {isRegistering ? "Masz już konto? " : "Nie masz konta? "}
          <button onClick={() => setIsRegistering(!isRegistering)} className="switch-button">
            {isRegistering ? "Zaloguj się" : "Zarejestruj się"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;