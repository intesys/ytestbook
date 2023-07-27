export const API_PREFIX = import.meta.env.VITE_API_PREFIX || "";
const API_PORT = import.meta.env.VITE_API_PORT
  ? ":" + import.meta.env.VITE_API_PORT
  : import.meta.env.VITE_API_PORT;

export const APP_URL = `${import.meta.env.VITE_API_PROTOCOL}://${
  import.meta.env.VITE_API_HOSTNAME
}${API_PORT}${API_PREFIX}`;

export const AUTH_KEY = "authToken";
