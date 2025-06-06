export enum REPOSITORY_TYPE {
  offline = "offline",
  remote = "remote",
}

export enum SERVER_STATUS {
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
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
  status: SERVER_STATUS;
  url: string;
  repositories?: {
    id: string;
    name: string;
  }[];
};

export type TServersProviderProps = { children: React.ReactNode };

export type StorageServersConfig = {
  servers?: {
    name: string;
    id: string;
    url: string;
    repositoryIds: {
      id: string;
      name: string;
    }[];
  }[];
};
