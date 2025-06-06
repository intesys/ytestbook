import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { isEqual } from "lodash";
import { useCallback, useEffect } from "react";
import { serversHandler } from "../serversContext";
import { REPOSITORY_TYPE, SERVER_STATUS, ServersList } from "../types";

const urlPrefix = "automerge:";

export const useInitServerConnections = (
  servers: ServersList,
  setServers: React.Dispatch<React.SetStateAction<ServersList>>,
) => {
  const addListenersToHandler = useCallback(
    (handler: Repo, serverId: string) => {
      // handle server disconnected
      handler.networkSubsystem.addListener("peer-disconnected", (payload) => {
        setServers((currentServers) => {
          const newServers = { ...currentServers };
          newServers[serverId].status = SERVER_STATUS.DISCONNECTED;
          return newServers;
        });
      });

      // handle server connected
      handler.networkSubsystem.addListener("peer", (payload) => {
        setServers((currentServers) => {
          const newServers = { ...currentServers };
          newServers[serverId].status = SERVER_STATUS.CONNECTING;

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

      handler.synchronizer.on("sync-state", (e) => {
        const syncState = e.syncState as any;
        if (syncState["haveResponded"] && syncState["inFlight"]) {
          setServers((currentServers) => {
            const newServers = { ...currentServers };
            newServers[serverId].status = SERVER_STATUS.CONNECTED;
            return newServers;
          });
        }
      });
    },
    [servers, setServers],
  );

  useEffect(() => {
    Object.entries(servers).forEach(([serverId, server]) => {
      if (server.type === REPOSITORY_TYPE.offline) {
        return;
      }

      const currentServerHandler = serversHandler[serverId];

      //   Open a connection if the server is opened and no handler exists
      if (server.opened && !currentServerHandler) {
        const handler = new Repo({
          network: [new BrowserWebSocketClientAdapter(server.url)],
          storage: new IndexedDBStorageAdapter(),
          sharePolicy: async () => true,
          enableRemoteHeadsGossiping: true,
        });
        serversHandler[server.id] = handler;
        addListenersToHandler(handler, server.id);
        setServers((currentServers) => {
          const newServers = { ...currentServers };
          newServers[serverId].status = SERVER_STATUS.CONNECTING;
          return newServers;
        });
      }

      if (!server.opened && currentServerHandler) {
        currentServerHandler.networkSubsystem.disconnect();
        currentServerHandler.removeAllListeners();

        // If the server is closed, remove the handler
        delete serversHandler[serverId];
        setServers((currentServers) => {
          const newServers = { ...currentServers };
          newServers[serverId].status = SERVER_STATUS.DISCONNECTED;
          return newServers;
        });
      }
    });
  }, [addListenersToHandler, servers, setServers]);
};
