// src/utils/api.js
import axios from "axios";

// Change this to your backend URL
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // if you’re using cookies/auth
});

export default api;
