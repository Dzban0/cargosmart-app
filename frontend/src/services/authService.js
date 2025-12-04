const API_URL = "http://localhost:3001/api";

export const login = async (login, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });

  if (!res.ok) throw new Error("Bad credentials");

  const data = await res.json();
  localStorage.setItem("token", data.token);
};

export const register = async (login, password) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });

  if (!res.ok) throw new Error("Register error");

  return res.json();
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};