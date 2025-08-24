import axios from "axios";

// Create instance
const api = axios.create({
  baseURL: "http://localhost:5211/api",
  headers: { "Content-Type": "application/json" },
});

// ✅ Response interceptor for error handling
api.interceptors.response.use(
  (response) => response, // pass successful responses
  (error) => {
    if (error.response?.status === 400 && error.response.data.errors) {
      const messages = Object.values(error.response.data.errors).flat();
      alert(messages.join("\n"));

      // You can customize messages based on status codes
      switch (error.response.status) {
        case 400:
          alert(error.response.data || "Bad Request");
          break;
        case 401:
          alert("Unauthorized. Please log in again.");
          break;
        case 403:
          alert("Forbidden: You don't have permission.");
          break;
        case 404:
          alert("Not found.");
          break;
        case 500:
          alert("Server error. Try again later.");
          break;
        default:
          alert("An unexpected error occurred.");
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("No response received:", error.request);
      alert("No response from server. Check your network.");
    } else {
      // Something went wrong in request setup
      console.error("Request error:", error.message);
      alert("Error in request: " + error.message);
    }

    return Promise.reject(error); // Always reject so caller can handle too
  }
);

// 🔹 API Helpers
export const AuthAPI = {
  login: (data) => api.post("/Auth/login", data),
  register: (data) => api.post("/Auth/register", data),
};

export const ProjectAPI = {
  create: (data) => api.post("/projects", data),
  list: () => api.get("/projects"),
  addComponent: (projectId, comp) =>
    api.post(`/projects/${projectId}/components`, comp),
  summary: (projectId) => api.get(`/projects/${projectId}/summary`),
  submitForApproval: (projectId) => api.post(`/projects/${projectId}/submit`),
};

export const AdminAPI = {
  materials: {
    list: () => api.get("/materials"),
    create: (data) => api.post("/materials", data),
  },
  products: {
    list: () => api.get("/products"),
    create: (data) => api.post("/products", data),
  },
  laborRates: {
    list: () => api.get("/laborrates"),
    create: (data) => api.post("/laborrates", data),
  },
  users: {
    list: () => api.get("/users"),
    create: (data) => api.post("/users", data),
  },
};

export default api;
