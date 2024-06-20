import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { Loader } from "@mantine/core";
import { createContext, useCallback, useEffect, useState } from "react";
import { TRepoContextValue, TRepoProviderProps } from "./types";

const LOCAL_STORAGE_NETWORK_URL_KEY = "ytbNetworkUrl";

const NetworkContext = createContext<TRepoContextValue>({
  setNetworkUrl: () => null,
});

export const NetworkProvider: React.FC<TRepoProviderProps> = ({ children }) => {
  const [repo, setRepo] = useState<Repo>();
  const [networkAdapter, setNetworkAdapter] =
    useState<BrowserWebSocketClientAdapter>();

  const setNetworkUrl = useCallback(
    (networkUrl?: string) => {
      if (networkAdapter) {
        networkAdapter.disconnect();
      }

      if (!networkUrl) {
        const repoInstance = new Repo({
          network: [],
          storage: new IndexedDBStorageAdapter(), // local storage will use the default one "automerge"
        });
        setRepo(repoInstance);
        setNetworkAdapter(undefined);

        return;
      }

      const networkAdapterInstance = new BrowserWebSocketClientAdapter(
        networkUrl,
      );
      const repoInstance = new Repo({
        network: [networkAdapterInstance],
        storage: new IndexedDBStorageAdapter(networkUrl), // use networkUrl as databaseName?
      });
      setRepo(repoInstance);
      setNetworkAdapter(networkAdapterInstance);
    },
    [networkAdapter],
  );

  // TODO: delete this!
  // temporary function for changing network url
  (window as any).setNetworkUrl = setNetworkUrl;

  useEffect(() => {
    // Initialize repo only once
    if (networkAdapter) {
      return;
    }

    let storedNetworkUrl =
      localStorage.getItem(LOCAL_STORAGE_NETWORK_URL_KEY) ?? undefined;

    if (storedNetworkUrl?.trim() === "") {
      storedNetworkUrl = undefined;
    }

    setNetworkUrl(storedNetworkUrl);
  }, [networkAdapter, setNetworkUrl]);

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
