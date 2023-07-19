export const API_PREFIX = import.meta.env.API_PREFIX || "";
const API_PORT = import.meta.env.API_PORT
  ? ":" + import.meta.env.API_PORT
  : import.meta.env.API_PORT;

export const APP_URL = `${import.meta.env.API_PROTOCOL}://${
  import.meta.env.API_HOSTNAME
}${API_PORT}${API_PREFIX}`;

export const AUTH_KEY = "authToken";
