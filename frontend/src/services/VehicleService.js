import { getAuthHeader } from "./authService";
import { API_URL } from "./api";

const VehicleService = {
  getVehicles: async () => {
    const res = await fetch(`${API_URL}/vehicles`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

  addVehicle: async (vehicle) => {
    const res = await fetch(`${API_URL}/vehicles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(vehicle),
    });
    return res.json();
  },

  updateVehicle: async (id, vehicle) => {
    const res = await fetch(`${API_URL}/vehicles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(vehicle),
    });
    if (res.status === 204) return {};
    return res.json();
  },

  deleteVehicle: async (id) => {
    const res = await fetch(`${API_URL}/vehicles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },
};

export default VehicleService;