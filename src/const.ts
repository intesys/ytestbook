export const API_PREFIX = process.env.API_PREFIX || "";
const API_PORT = process.env.API_PORT ? ":" + process.env.API_PORT : process.env.API_PORT;

export const APP_URL = `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}${API_PORT}${API_PREFIX}`;
