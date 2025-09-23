import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { modals } from "@/components/modals/modals.ts";
import { ServersContextProvider } from "@/components/serversContext/ServersContextProvider.tsx";
import { MainNavigation } from "@/Navigation.tsx";
import { theme } from "@/theme.tsx";

import "@/theme.css";

const root = createRoot(
  document.getElementById("ytestbook_root") as HTMLElement
);

const datesSetting = {};

root.render(
  <React.StrictMode>
    <MantineProvider theme={{ ...theme }}>
      <Notifications position="top-right" zIndex={1000} />
      <BrowserRouter>
        <DatesProvider settings={datesSetting}>
          <ServersContextProvider>
            <ModalsProvider modals={modals}>
              <MainNavigation />
            </ModalsProvider>
          </ServersContextProvider>
        </DatesProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
