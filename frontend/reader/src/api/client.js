import { getCurrentJwtToken } from "../script/LocalStorageUtils";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

let unauthorizedHandler = () => {};

// AuthProvider registers a handler so an expired token logs the user out everywhere.
export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

// Single place that knows how to talk to the backend:
// base URL, JSON, auth header and error handling.
export async function apiRequest(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getCurrentJwtToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (auth && (response.status === 401 || response.status === 403)) {
    unauthorizedHandler();
  }

  const text = await response.text();
  const isJson = response.headers.get("Content-Type")?.includes("application/json");
  const data = isJson && text ? JSON.parse(text) : text || null;

  if (!response.ok) {
    throw new ApiError(data?.message ?? `Request failed (${response.status})`, response.status);
  }

  return data;
}

export const mediaUrl = (key) => (key ? `${API_URL}/api/v1/media/${key}` : null);
