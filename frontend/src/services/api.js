const API_URL = "http://localhost:3001";

export async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API Error');
  }

  return response.json();
}

export const api = {
  getWarehouses() {
    return JSON.parse(localStorage.getItem("warehouses") || "[]");
  },

  getDeliveries() {
    return JSON.parse(localStorage.getItem("deliveries") || "[]");
  },

  getProducts() {
    return JSON.parse(localStorage.getItem("products") || "[]");
  },

  saveWarehouses(warehouses) {
    localStorage.setItem("warehouses", JSON.stringify(warehouses));
  },

  saveDeliveries(deliveries) {
    localStorage.setItem("deliveries", JSON.stringify(deliveries));
  },

  saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  },

  deleteWarehouse(id) {
    let warehouses = this.getWarehouses().filter(w => w.id !== id);
    this.saveWarehouses(warehouses);
  },

  deleteDelivery(id) {
    let deliveries = this.getDeliveries().filter(d => d.id !== id);
    this.saveDeliveries(deliveries);
  },

  deleteProduct(id) {
    let products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
  },

  async addWarehouse(warehouse) {
    return await apiRequest("warehouses", "POST", warehouse);
  },

  async updateWarehouse(id, warehouse) {
    return await apiRequest(`warehouses/${id}`, "PUT", warehouse);
  }
};