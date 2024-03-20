import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MainNavigation } from "./Navigation";
import { DocProvider } from "./components/docContext/DocContext";
import { theme } from "./theme";
import "./theme.scss";

const repo = new Repo({
  network: [
    new BrowserWebSocketClientAdapter(
      "wss://automerge-sync-server.staging.intesys.it",
    ),
  ],
  storage: new IndexedDBStorageAdapter(),
});

const root = createRoot(
  document.getElementById("ytestbook_root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <BrowserRouter>
        <MantineProvider theme={{ ...theme }}>
          <Notifications />
          <ModalsProvider>
            <DatesProvider settings={{ locale: "it" }}>
              <DocProvider>
                <MainNavigation />
              </DocProvider>
            </DatesProvider>
          </ModalsProvider>
        </MantineProvider>
      </BrowserRouter>
    </RepoContext.Provider>
  </React.StrictMode>,
);
