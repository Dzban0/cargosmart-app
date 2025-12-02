import { getAuthHeader } from "./authService";
import { API_URL } from "./api";

const WorkerService = {
  getWorkers: async () => {
    const res = await fetch(`${API_URL}/workers`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },

  addWorker: async (worker) => {
    const res = await fetch(`${API_URL}/workers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(worker),
    });
    return res.json();
  },

  updateWorker: async (id, worker) => {
    const res = await fetch(`${API_URL}/workers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(worker),
    });
    if (res.status === 204) return {};
    return res.json();
  },

  deleteWorker: async (id) => {
    const res = await fetch(`${API_URL}/workers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return res.json();
  },
};

export default WorkerService;