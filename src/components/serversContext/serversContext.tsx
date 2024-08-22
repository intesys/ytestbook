import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { StorageServersConfig } from "../../lib/repositoryHandler/types";
import {
  REPOSITORY_TYPE,
  Repository,
  SERVER_STATUS,
  ServersList,
  TServersContextValue,
  TServersProviderProps,
} from "./types";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { Repo } from "@automerge/automerge-repo";
import { TDocType } from "../../types/schema";

let done = false;

// global handlers need to be a singleton
export const serversHandler: Record<string, Repo> = {};

const ServersContext = createContext<TServersContextValue>({
  servers: {},
  updateServerStatus: () => {},
  addServer: () => {},
  removeServer: () => {},
});

export function useServersContext() {
  return useContext(ServersContext);
}

export const SERVER_OFFLINE_REPOSITORY_ID_STORAGE_KEY = "yt-offline-repo-id";

export const ServersProvider: React.FC<TServersProviderProps> = ({
  children,
}) => {
  const [servers, setServers] = useState<ServersList>({});

  console.log("HANDLES", servers);

  const addServer = useCallback((id: string, repo: Repository) => {
    setServers((currentServers) => {
      currentServers[id] = repo;
      return currentServers;
    });
  }, []);

  const updateServerStatus = useCallback(
    (id: string, status: SERVER_STATUS, repositoryId: string) => {
      setServers((currentServers) => {
        if (currentServers[id]) {
          currentServers[id].status = status;
          currentServers[id].repositoryId = `${repositoryId}`;
        }
        return currentServers;
      });
    },
    [],
  );

  //   load initial servers
  useEffect(() => {
    // const proxed = new Proxy(
    //   new Repo({
    //     network: [],
    //     storage: new IndexedDBStorageAdapter(),
    //     sharePolicy: async () => true,
    //     enableRemoteHeadsGossiping: true,
    //   }),
    //   {
    //     set: function (target, key, value) {
    //       console.log(`${key} set from ${obj.foo} to ${value}`);
    //       target[key] = value;
    //       return true;
    //     },
    //   },
    // );

    if (done) {
      return;
    }
    done = true;

    const offlineRepoId =
      localStorage.getItem(SERVER_OFFLINE_REPOSITORY_ID_STORAGE_KEY) ??
      undefined; // "automerge:4A3MevempMNWJ3YbaRjsSoomSoaB",

    const offlineServerInitializer: Repository = {
      //   handler: new Repo({
      //     network: [],
      //     storage: new IndexedDBStorageAdapter(),
      //     sharePolicy: async () => true,
      //     enableRemoteHeadsGossiping: true,
      //   }),
      name: "offline",
      type: REPOSITORY_TYPE.offline,
      status: SERVER_STATUS.NO_REPOSITORY,
      url: "offline",
      repositoryId: offlineRepoId,
    };

    serversHandler["offline"] = new Repo({
      network: [],
      storage: new IndexedDBStorageAdapter(),
      sharePolicy: async () => true,
      enableRemoteHeadsGossiping: true,
    });

    if (!offlineRepoId) {
      const docHandle = serversHandler["offline"].create<TDocType>({
        projects: [],
        description: "",
        title: "",
      });

      offlineServerInitializer.repositoryId = docHandle.url;
      localStorage.setItem(
        SERVER_OFFLINE_REPOSITORY_ID_STORAGE_KEY,
        docHandle.url,
      );
    }

    // offlineServerInitializer.handler.addListener("document", () => {
    //   const repositoryId = repositoryHandler.getServerDocUrl(
    //     offlineServerInitializer.handler,
    //   );
    //   console.log(
    //     "🚀 ~ offlineServerInitializer.handler.addListener ~ repositoryId:",
    //     repositoryId,
    //   );

    //   if (!repositoryId) {
    //     return;
    //   }
    //   updateServerStatus("offline", SERVER_STATUS.CONNECTED, repositoryId);
    // });

    // const serversFromStorageRaw = localStorage.getItem(
    //   SERVERS_CONF_STORAGE_KEY,
    // );
    const serversFromStorageRaw = JSON.stringify({
      servers: [
        // {
        //   name: "local-wss",
        //   url: "ws://localhost:3030",
        // },
      ],
    });

    if (serversFromStorageRaw && serversFromStorageRaw !== "") {
      const serversFromStorage: StorageServersConfig = JSON.parse(
        serversFromStorageRaw,
      );

      if (serversFromStorage?.servers) {
        const serversInitialized: ServersList = {
          offline: offlineServerInitializer,
        };
        serversFromStorage.servers.forEach((server) => {
          //   const handler = new Repo({
          //     network: [new BrowserWebSocketClientAdapter(server.url)],
          //     storage: new IndexedDBStorageAdapter(),
          //   });

          //   handler.addListener("document", () => {
          //     updateServerStatus(
          //       server.name,
          //       SERVER_STATUS.CONNECTED,
          //       Object.keys(handler.handles)[0],
          //     );
          //   });

          serversInitialized[server.name] = {
            name: server.name,
            type: REPOSITORY_TYPE.remote,
            // handler,
            status: SERVER_STATUS.NO_REPOSITORY,
            url: server.url,
          };
        });

        setServers(serversInitialized);
      } else {
        const serversInitialized: ServersList = {
          offline: offlineServerInitializer,
        };
        setServers(serversInitialized);
      }
    } else {
      const serversInitialized: ServersList = {
        offline: offlineServerInitializer,
      };
      setServers(serversInitialized);
    }
  }, [updateServerStatus]);

  return (
    <ServersContext.Provider
      value={{
        servers,
        addServer,
        removeServer: () => {},
        updateServerStatus,
      }}
    >
      {children}
    </ServersContext.Provider>
  );
};
