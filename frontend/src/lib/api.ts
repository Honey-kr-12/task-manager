import axios from "axios";
import { getToken } from "./auth";

export const api = axios.create({
  baseURL: "hhttps://task-manager-8jsx.vercel.app/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
