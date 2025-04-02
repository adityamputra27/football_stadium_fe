import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "applicatin/json" },
});

export default api;
