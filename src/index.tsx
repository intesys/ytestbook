import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./App";
import { DocProvider } from "./components/docContext/DocContext";

const repo = new Repo({
  network: [new BrowserWebSocketClientAdapter("ws://localhost:3030")],
  storage: new IndexedDBStorageAdapter(),
});

const root = createRoot(
  document.getElementById("ytestbook_root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <HashRouter>
        <DocProvider>
          <App />
        </DocProvider>
      </HashRouter>
    </RepoContext.Provider>
  </React.StrictMode>,
);
