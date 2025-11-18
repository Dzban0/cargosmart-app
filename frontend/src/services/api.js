import { getAuthHeader } from "./authService";

const API_URL = "http://localhost:3001/api";

const api = {
  getWarehouses: async () => {
    const res = await fetch(`${API_URL}/warehouses`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

  addWarehouse: async (warehouse) => {
    const res = await fetch(`${API_URL}/warehouses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(warehouse),
    });
    return res.json();
  },

  updateWarehouse: async (id, warehouse) => {
    const res = await fetch(`${API_URL}/warehouses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(warehouse),
    });
    return res.json();
  },

  deleteWarehouse: async (id) => {
    const res = await fetch(`${API_URL}/warehouses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

};

export default api;
