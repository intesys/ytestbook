import { Repo } from "@automerge/automerge-repo";

export enum REPOSITORY_TYPE {
  offline = "offline",
  remote = "remote",
}

export enum SERVER_STATUS {
  NO_REPOSITORY = "NO_REPOSITORY",
  CONNECTED = "CONNECTED",
}

export type ServersList = Record<string, YtServer>;

export type TServersContextValue = {
  servers: ServersList;
  addServer: (id: string, repository: YtServer) => void;
  disconnectFromServer: (id: string) => void;
};

export type YtServer = {
  type: REPOSITORY_TYPE;
  id: string;
  name: string;
  // handler: Repo;
  status: SERVER_STATUS;
  url: string;
  repositoryIds: string[];
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
  }[];
};
