import axios from "axios";

const API_URL = "https://api-football-stadium.dittmptrr27.com";
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "applicatin/json" },
});

export default api;
