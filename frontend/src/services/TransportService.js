import { getAuthHeader } from "./authService";
import { API_URL } from "./api";

const TransportService = {
  getTransports: async () => {
    const res = await fetch(`${API_URL}/transports`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

  addTransport: async (transport) => {
    const res = await fetch(`${API_URL}/transports`, {
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
    const res = await fetch(`${API_URL}/transports/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(transport),
    });
    return res.json();
  },

  deleteTransport: async (id) => {
    await fetch(`${API_URL}/transports/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
  },

};

export default TransportService;