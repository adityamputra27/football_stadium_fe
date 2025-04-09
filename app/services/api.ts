import axios from "axios";

const API_URL = "https://api-football-stadium.dittmptrr27.com/api";
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
