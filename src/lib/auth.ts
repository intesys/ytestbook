import { AUTH_KEY } from "../const";
import { LoginResponse } from "../generated";
import { SessionStorage } from "./storage/storageUtils";

export const saveToken = (payload: LoginResponse) =>
  SessionStorage.write(AUTH_KEY, payload.accessToken);

export const readToken = (): any => SessionStorage.read(AUTH_KEY);

export const isAuthenticated = () => {
  const accessToken = readToken();
  return accessToken ? (accessToken as string) : null;
};
