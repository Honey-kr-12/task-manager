import axios from "axios";
import { getToken } from "./auth";

export const api = axios.create({
  baseURL: "https://task-manager-5ywu.vercel.app/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});