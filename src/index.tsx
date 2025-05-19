import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import { DatesProvider } from "@mantine/dates";
import "@mantine/dropzone/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { modals } from "./components/modals/modals.ts";
import { ServersProvider } from "./components/serversContext/serversContext.tsx";
import { MainNavigation } from "./Navigation";
import { theme } from "./theme";
import "./theme.css";

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
          <ServersProvider>
            <ModalsProvider modals={modals}>
              <MainNavigation />
            </ModalsProvider>
          </ServersProvider>
        </DatesProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
