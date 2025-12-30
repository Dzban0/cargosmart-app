import { getAuthHeader } from "./authService";
import { API_URL } from "./api";

const TransportService = {
  async request(url, options = {}) {
    const res = await fetch(url, options);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Błąd serwera");
    }

    if (res.status === 204) return null;
    return res.json();
  },

  getTransports() {
    return this.request(`${API_URL}/transports`, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() }
    });
  },

  addTransport(data) {
    return this.request(`${API_URL}/transports`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(data),
    });
  },

  updateTransport(id, data) {
    return this.request(`${API_URL}/transports/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(data),
    });
  },

  deleteTransport(id) {
    return this.request(`${API_URL}/transports/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
  },
};

export default TransportService;