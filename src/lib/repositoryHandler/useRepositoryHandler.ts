import { useEffect, useMemo, useRef, useState } from "react";
import { REPOSITORY_TYPE, Repository, StorageServersConfig } from "./types";
import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { SERVERS_CONF_STORAGE_KEY } from "./repositoryHandler";

export const useRepositoryHandler = () => {
  const [offlineServer, setOfflineServer] = useState<Repository>();

  const [servers, setServers] = useState<Repository[]>([]);

  useEffect(() => {
    const offlineServerInitializer = {
      handler: new Repo({
        network: [new BrowserWebSocketClientAdapter("ws://localhost:3030")],
        storage: new IndexedDBStorageAdapter(),
      }),
      name: "offline",
      type: REPOSITORY_TYPE.offline,
    };
    //   {
    //     set: function (target, key, value) {
    //       console.log(`${key} set from ${obj.foo} to ${value}`);
    //       target[key] = value;
    //       return true;
    //     },
    //   },
    // );

    offlineServerInitializer.handler.addListener("document", () => {
      setOfflineServer(offlineServerInitializer);
    });

    // const serversFromStorageRaw = localStorage.getItem(
    //   SERVERS_CONF_STORAGE_KEY,
    // );
    const serversFromStorageRaw = JSON.stringify({
      servers: [
        {
          name: "local-wss",
          url: "ws://localhost:3030",
        },
      ],
    });

    if (serversFromStorageRaw && serversFromStorageRaw !== "") {
      const serversFromStorage: StorageServersConfig = JSON.parse(
        serversFromStorageRaw,
      );

      if (serversFromStorage?.servers) {
        const serversInitialized: Repository[] = [];
        serversFromStorage.servers.forEach((server) => {
          const handler = new Repo({
            network: [new BrowserWebSocketClientAdapter(server.url)],
            storage: new IndexedDBStorageAdapter(),
          });

          handler.addListener("document", () => {
            setOfflineServer(offlineServerInitializer);
          });

          //   const handlerProxy = new Proxy(
          //     {},
          //     {
          //       set: function (target, key, value) {
          //         console.log(`${key} set from ${obj.foo} to ${value}`);
          //         target[key] = value;
          //         return true;
          //       },
          //     },
          //   );

          //   handlerProxy.meow = "1";

          serversInitialized.push({
            name: server.name,
            type: REPOSITORY_TYPE.remote,
            handler,
          });
        });

        setServers(serversInitialized);
      }
    }
  }, []);

  return useMemo(() => {
    return {
      servers: [offlineServer, ...servers],
    };
  }, [offlineServer, servers]);
};
