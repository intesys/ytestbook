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
