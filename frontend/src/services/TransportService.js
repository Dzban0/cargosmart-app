import { getAuthHeader } from "./authService";
import { API_URL } from "./api";

const TransportService = {
  getTransports: async () => {
    const res = await fetch(`${API_URL}/transport`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

  addTransport: async (transport) => {
    const res = await fetch(`${API_URL}/transport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(transport),
    });
    return res.json();
  },

  updateTransport: async (id, transport) => {
    const res = await fetch(`${API_URL}/transport/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(transport),
    });
    if (res.status === 204) return {};
    return res.json();
  },

  deleteTransport: async (id) => {
    const res = await fetch(`${API_URL}/transport/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

};

export default TransportService;