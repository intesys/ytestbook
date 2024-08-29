import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { isEqual } from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TDocType } from "../../types/schema";
import { openDeleteConfirmModal } from "../modals/modals";
import {
  REPOSITORY_TYPE,
  SERVER_STATUS,
  ServersList,
  StorageServersConfig,
  TServersContextValue,
  TServersProviderProps,
  YtServer,
} from "./types";

export const SERVERS_CONF_STORAGE_KEY = "yt-servers";
export const SERVER_OFFLINE_REPOSITORY_ID_STORAGE_KEY = "yt-offline-repo-id";

let done = false;

// global handlers need to be a singleton
export const serversHandler: Record<string, Repo> = {};

const ServersContext = createContext<TServersContextValue>({
  servers: {},
  addServer: () => {},
  disconnectFromServer: () => {},
});

export function useServersContext() {
  return useContext(ServersContext);
}

export const ServersProvider: React.FC<TServersProviderProps> = ({
  children,
}) => {
  const [servers, setServers] = useState<ServersList>({});

  useEffect(() => {
    if (!done) {
      return;
    }
    const configToStore: StorageServersConfig = {
      servers: Object.values(servers)
        .filter((s) => s.type === REPOSITORY_TYPE.remote)
        .map((s) => ({
          id: s.id,
          name: s.name,
          repositoryIds: s.repositoryIds,
          url: s.url,
        })),
    };

    localStorage.setItem(
      SERVERS_CONF_STORAGE_KEY,
      JSON.stringify(configToStore),
    );
  }, [servers]);

  const addListenersToHandler = useCallback(
    (handler: Repo, serverId: string) => {
      // handle server disconnected
      handler.networkSubsystem.addListener("peer-disconnected", () => {
        setServers((currentServers) => {
          const newServers = { ...currentServers };
          newServers[serverId].status = SERVER_STATUS.DISCONNECTED;
          return newServers;
        });
      });

      // handle server connected
      handler.networkSubsystem.addListener("peer", () => {
        setServers((currentServers) => {
          const newServers = { ...currentServers };
          newServers[serverId].status = SERVER_STATUS.CONNECTED;

          const handlesRepoIds = Object.keys(serversHandler[serverId].handles);
          newServers[serverId].repositoryIds = handlesRepoIds;

          return newServers;
        });
      });

      // Sync server repositoryIDs
      handler.networkSubsystem.addListener("message", (e) => {
        if (e.type === "sync") {
          const handlesRepoIds = Object.keys(serversHandler[serverId].handles);
          if (!isEqual(servers[serverId], handlesRepoIds)) {
            setServers((currentServers) => {
              const newServers = { ...currentServers };
              newServers[serverId].repositoryIds = handlesRepoIds;
              return newServers;
            });
          }
        }
      });
    },
    [servers],
  );

  const addServer = useCallback(
    (id: string, repo: YtServer) => {
      const handler = new Repo({
        network: [new BrowserWebSocketClientAdapter(repo.url)],
        storage: new IndexedDBStorageAdapter(),
        sharePolicy: async () => true,
        enableRemoteHeadsGossiping: true,
      });

      addListenersToHandler(handler, repo.id);

      serversHandler[repo.id] = handler;

      setServers((currentServers) => {
        const newServers = { ...currentServers };
        newServers[id] = repo;
        return newServers;
      });
    },
    [addListenersToHandler],
  );

  //   load initial servers
  useEffect(() => {
    if (done) {
      return;
    }
    done = true;

    const offlineRepoId =
      localStorage.getItem(SERVER_OFFLINE_REPOSITORY_ID_STORAGE_KEY) ??
      undefined;

    const offlineServerInitializer: YtServer = {
      name: "Offline",
      id: "offline",
      type: REPOSITORY_TYPE.offline,
      status: SERVER_STATUS.CONNECTED,
      url: "offline",
      repositoryIds: offlineRepoId ? [offlineRepoId] : [],
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

      offlineServerInitializer.repositoryIds = [docHandle.url];
      localStorage.setItem(
        SERVER_OFFLINE_REPOSITORY_ID_STORAGE_KEY,
        docHandle.url,
      );
    }

    const serversFromStorageRaw = localStorage.getItem(
      SERVERS_CONF_STORAGE_KEY,
    );

    if (serversFromStorageRaw && serversFromStorageRaw !== "") {
      const serversFromStorage: StorageServersConfig = JSON.parse(
        serversFromStorageRaw,
      );

      if (serversFromStorage?.servers) {
        const serversInitialized: ServersList = {
          offline: offlineServerInitializer,
        };
        serversFromStorage.servers.forEach((server) => {
          const handler = new Repo({
            network: [new BrowserWebSocketClientAdapter(server.url)],
            storage: new IndexedDBStorageAdapter(),
            sharePolicy: async () => true,
            enableRemoteHeadsGossiping: true,
          });

          addListenersToHandler(handler, server.id);

          serversHandler[server.id] = handler;

          serversInitialized[server.id] = {
            id: server.id,
            name: server.name,
            type: REPOSITORY_TYPE.remote,
            status: SERVER_STATUS.CONNECTING,
            url: server.url,
            repositoryIds: [],
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
  }, []);

  const disconnectFromServer = useCallback((name: string) => {
    openDeleteConfirmModal("Disconnect from server?", {
      confirmButtonLabel: "Disconnect",
      handleConfirm: () =>
        setServers((prevServers) => {
          const newServers = { ...prevServers };
          delete newServers[name];
          serversHandler[name].removeAllListeners();

          serversHandler[name].networkSubsystem.disconnect();
          delete serversHandler[name];

          return newServers;
        }),
    });
  }, []);

  return (
    <ServersContext.Provider
      value={{
        servers,
        addServer,
        disconnectFromServer,
      }}
    >
      {children}
    </ServersContext.Provider>
  );
};
