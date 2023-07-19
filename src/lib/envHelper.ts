import { API_PREFIX } from "../const";

const trim = (str: string): string => str.replace(/^\/|\/$/g, "");

const getProtocol = (env?: string): string => {
  return env ? `${env}://` : "//";
};

export const getHost = (protocol?: string, hostname?: string, port?: string): string =>
  `${getProtocol(protocol)}${hostname}:${port}`;

export const environmentApiBasePath = (): string => {
  try {
    const host = trim(
      getHost(
        import.meta.env.VITE_API_PROTOCOL,
        import.meta.env.VITE_API_HOSTNAME,
        import.meta.env.VITE_API_PORT
      )
    );

    const apiPrefix = trim(API_PREFIX);
    const parts = [host, apiPrefix].filter((part) => part !== "");
    return trim(parts.join("/"));
  } catch (error) {
    console.error(`Basepath MUST be a valid URI`);
    throw error;
  }
};

export const isValidUrl = (url: string | undefined) => {
  if (url) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  } else {
    return false;
  }
};