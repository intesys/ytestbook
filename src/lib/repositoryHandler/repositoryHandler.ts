import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { REPOSITORY_TYPE, Repository, StorageServersConfig } from "./types";

export class RepositoryHandler {
  private _offlineServer: Repository = {
    handler: new Repo({
      network: [new BrowserWebSocketClientAdapter("ws://localhost:3030")],
      storage: new IndexedDBStorageAdapter(),
    }),
    name: "offline",
    type: REPOSITORY_TYPE.offline,
  };
  private _servers: Repository[] = [];

  constructor() {
    this._loadServers();
  }

  private _loadServers = () => {
    const serversFromStorageRaw = localStorage.getItem(
      SERVERS_CONF_STORAGE_KEY,
    );

    if (serversFromStorageRaw && serversFromStorageRaw !== "") {
      const serversFromStorage: StorageServersConfig = JSON.parse(
        serversFromStorageRaw,
      );

      if (serversFromStorage?.servers) {
        serversFromStorage.servers.forEach((server) => {
          const handler = new Repo({
            network: [new BrowserWebSocketClientAdapter(server.url)],
            storage: new IndexedDBStorageAdapter(),
          }).addListener("document", () => {
            console.log("MEOWW");
          });

          this._servers.push({
            name: server.name,
            type: REPOSITORY_TYPE.remote,
            handler,
          });
        });
      }
    }
  };

  getServerDocUrl = (server: Repo) => {
    const docUrls = Object.keys(server.handles);

    if (docUrls.length > 0) {
      return docUrls[0];
    }

    return undefined;
    // const handle = server.create<TDocType>({
    //   projects: [],
    //   description: "",
    //   title: "",
    // });

    // return handle.documentId;
  };

  getServers = () => {
    return [this._offlineServer, ...this._servers];
  };
}

export const repositoryHandler = new RepositoryHandler();
