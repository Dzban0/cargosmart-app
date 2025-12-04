import { getAuthHeader } from "./authService";
import { API_URL } from "./api";

const WarehouseService = {
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
    if (res.status === 204) return {};
    return res.json();
  },

  deleteWarehouse: async (id) => {
    await fetch(`${API_URL}/warehouses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return true; // lub nic
  },

};

export default WarehouseService;