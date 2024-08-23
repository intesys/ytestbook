import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { DatesProvider } from "@mantine/dates";
import "@mantine/dropzone/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MainNavigation } from "./Navigation";
import { modals } from "./components/modals/modals.ts";
import { ServersProvider } from "./components/serversContext/serversContext.tsx";
import { theme } from "./theme";
import "./theme.scss";
// import {
//   NETWORK_URL_OFFLINE,
//   NETWORK_URL_STORAGE_KEY,
// } from "./lib/operators/useNetworkUrl.ts";

// const networkUrl = localStorage.getItem(NETWORK_URL_STORAGE_KEY);

// const repo = new Repo({
//   network:
//     networkUrl && networkUrl !== NETWORK_URL_OFFLINE
//       ? [new BrowserWebSocketClientAdapter(networkUrl)]
//       : [],
//   storage: new IndexedDBStorageAdapter(),
// });

const root = createRoot(
  document.getElementById("ytestbook_root") as HTMLElement,
);

const datesSetting = {};

root.render(
  <React.StrictMode>
    <MantineProvider theme={{ ...theme }}>
      <Notifications position="top-right" zIndex={1000} />
      <BrowserRouter>
        <DatesProvider settings={datesSetting}>
          {/* <RepoContext.Provider
            value={repositoryHandler.getServers()[0].handler}
          >
            <DocProvider>  */}
          <ServersProvider>
            <ModalsProvider modals={modals}>
              <MainNavigation />
            </ModalsProvider>
          </ServersProvider>
          {/* </DocProvider>
          </RepoContext.Provider>  */}
        </DatesProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
