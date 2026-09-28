import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({ baseURL: API_BASE });

// Attach the JWT (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cet_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Normalise any API/validation error into a plain string for the UI. */
export function formatApiError(err) {
  const detail = err?.response?.data?.message;
  if (typeof detail === "string") return detail;
  if (Array.isArray(err?.response?.data?.errors) && err.response.data.errors.length) {
    return err.response.data.errors[0].message || "Please check your input.";
  }
  return err?.message || "Something went wrong. Please try again.";
}

export default api;
