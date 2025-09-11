import { Repo } from "@automerge/automerge-repo";

export enum REPOSITORY_TYPE {
  offline = "offline",
  remote = "remote",
}

export enum SERVER_STATUS {
  IDLE = "IDLE",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
}

export type ServersList = Record<string, YtServer>;

export type TServersContextValue = {
  servers: ServersList;
  addServer: (id: string, repository: YtServer) => void;
  connectToServer: (id: string) => void;
  disconnectFromServer: (id: string) => void;
  removeServer: (id: string) => void;
};

export type YtServer = {
  type: REPOSITORY_TYPE;
  id: string;
  name: string;
  status: SERVER_STATUS;
  url: string;
  repositoryIds: string[];
  opened: boolean;
};

export type TServersProviderProps = { children: React.ReactNode };

export type Repository = {
  type: REPOSITORY_TYPE;
  name: string;
  handler: Repo;
};

export type Server = {
  id: string;
  repositories: Repository[];
};

export type StorageServersConfig = {
  servers?: {
    name: string;
    id: string;
    url: string;
    repositoryIds: string[];
    opened?: boolean;
  }[];
};
