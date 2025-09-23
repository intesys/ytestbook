import { createContext } from "react";
import { Repo } from "@automerge/automerge-repo";
import { TServersContextValue } from "./types";

// global handlers need to be a singleton

// global handlers need to be a singleton

// global handlers need to be a singleton
export const serversHandler: Record<string, Repo> = {};

/**
 * Context to manage the list of servers and their connections.
 * Provides functions to add, connect, disconnect, and remove servers.
 */
export const ServersContext = createContext<TServersContextValue>({
  servers: {},
  addServer: () => {},
  connectToServer: () => {},
  disconnectFromServer: () => {},
  removeServer: () => {},
});
