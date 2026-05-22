import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

// Attach token (if available) from localStorage to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authorization");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
