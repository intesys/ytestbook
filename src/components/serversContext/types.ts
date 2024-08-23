export enum REPOSITORY_TYPE {
  offline = "offline",
  remote = "remote",
}

export enum SERVER_STATUS {
  NO_REPOSITORY = "NO_REPOSITORY",
  CONNECTED = "CONNECTED",
}

export type ServersList = Record<string, Repository>;

export type TServersContextValue = {
  servers: ServersList;
  addServer: (id: string, repository: Repository) => void;
  removeServer: (id: string) => void;
  updateServerStatus: (
    id: string,
    status: SERVER_STATUS,
    repositoryId: string,
  ) => void;
};

export type Repository = {
  type: REPOSITORY_TYPE;
  name: string;
  // handler: Repo;
  status: SERVER_STATUS;
  url: string;
  repositoryIds: string[];
};

// export enum DocContextStatusEnum {
//   READY = "READY",
//   LOADING = "LOADING",
// }

// export type TDocContextState = {
//   status: DocContextStatusEnum.READY;
//   docUrl: AutomergeUrl | undefined;
//   doc: Doc<TDocType> | undefined;
//   changeDoc:
//     | ((
//         changeFn: ChangeFn<TDocType>,
//         options?: ChangeOptions<TDocType> | undefined,
//       ) => void)
//     | undefined;
// };

export type TServersProviderProps = { children: React.ReactNode };
