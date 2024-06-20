import { Repo } from "@automerge/automerge-repo";
import { createContext, useEffect, useState } from "react";
import { TRepoContextValue, TRepoProviderProps } from "./types";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { Loader } from "@mantine/core";

const LOCAL_STORAGE_NETWORK_URL_KEY = "ytbNetworkUrl";

const NetworkContext = createContext<TRepoContextValue>({
  setNetworkUrl: () => null,
});

const localOnlyRepo = new Repo({
  network: [],
  storage: new IndexedDBStorageAdapter(), // local storage will use the default one "automerge"
});

export const NetworkProvider: React.FC<TRepoProviderProps> = ({ children }) => {
  const [repo, setRepo] = useState<Repo>();

  const setNetworkUrl = (networkUrl?: string) => {
    // repo?.peers.forEach(p => {

    // })

    if (!networkUrl) {
      setRepo(localOnlyRepo);
      return;
    }

    setRepo(
      new Repo({
        network: [new BrowserWebSocketClientAdapter(networkUrl)],
        storage: new IndexedDBStorageAdapter(networkUrl), // use networkUrl as databaseName?
      }),
    );
  };

  useEffect(() => {
    let storedNetworkUrl =
      localStorage.getItem(LOCAL_STORAGE_NETWORK_URL_KEY) ?? undefined;

    if (storedNetworkUrl?.trim() === "") {
      storedNetworkUrl = undefined;
    }

    setNetworkUrl(storedNetworkUrl);
  }, []);

  return (
    <NetworkContext.Provider value={{ setNetworkUrl }}>
      {repo ? (
        <RepoContext.Provider value={repo}>{children}</RepoContext.Provider>
      ) : (
        <Loader />
      )}
    </NetworkContext.Provider>
  );
};
