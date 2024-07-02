import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DocProvider } from "./components/docContext/DocContext";
import { modals } from "./components/modals/modals.ts";
import { MainNavigation } from "./Navigation";
import { theme } from "./theme";
import "./theme.scss";

export const NETWORK_URL = "wss://automerge-sync-server.staging.intesys.it"; // TODO this should be set through a form

const repo = new Repo({
  network: [new BrowserWebSocketClientAdapter(NETWORK_URL)],
  storage: new IndexedDBStorageAdapter(),
});

const root = createRoot(
  document.getElementById("ytestbook_root") as HTMLElement,
);

const datesSetting = {};

root.render(
  <React.StrictMode>
    <MantineProvider theme={{ ...theme }}>
      <Notifications position="top-right" zIndex={1000} />
      <RepoContext.Provider value={repo}>
        <BrowserRouter>
          <DatesProvider settings={datesSetting}>
            <DocProvider>
              <ModalsProvider modals={modals}>
                <MainNavigation />
              </ModalsProvider>
            </DocProvider>
          </DatesProvider>
        </BrowserRouter>
      </RepoContext.Provider>
    </MantineProvider>
  </React.StrictMode>,
);
