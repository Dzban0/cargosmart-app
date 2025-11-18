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

  getProducts: async () => {
    const res = await fetch(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

  addProduct: async (product) => {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(product),
    });
    return res.json();
  },
};

export default api;