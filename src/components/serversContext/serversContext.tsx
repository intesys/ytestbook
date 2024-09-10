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
import { STORAGE_KEYS } from "../../lib/constants/localStorageKeys";
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

const urlPrefix = "automerge:";

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
      STORAGE_KEYS.SERVERS_CONF,
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
          const handlesRepoIds = Object.keys(
            serversHandler[serverId].handles,
          ).map((id) =>
            id.indexOf(urlPrefix) === 0 ? id : `${urlPrefix}${id}`,
          );
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
      serversHandler[repo.id] = handler;

      addListenersToHandler(handler, repo.id);

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
      localStorage.getItem(STORAGE_KEYS.SERVER_OFFLINE_REPOSITORY_ID) ??
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
        STORAGE_KEYS.SERVER_OFFLINE_REPOSITORY_ID,
        docHandle.url,
      );
    }

    const serversFromStorageRaw = localStorage.getItem(
      STORAGE_KEYS.SERVERS_CONF,
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
            repositoryIds: server.repositoryIds,
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

  const disconnectFromServer = useCallback((serverId: string) => {
    openDeleteConfirmModal("Disconnect from server?", {
      confirmButtonLabel: "Disconnect",
      handleConfirm: () =>
        setServers((prevServers) => {
          const newServers = { ...prevServers };
          delete newServers[serverId];
          serversHandler[serverId].networkSubsystem.disconnect();
          delete serversHandler[serverId];

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
