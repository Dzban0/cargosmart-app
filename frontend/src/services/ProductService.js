import { getAuthHeader } from "./authService";
import { API_URL } from "./api";

const ProductService = {
  getProducts: async () => {
    const res = await fetch(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

  addProducts: async (product) => {
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

  updateProduct: async (id, product) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(product),
    });
    if (res.status === 204) return {};
    return res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },
};

export default ProductService;