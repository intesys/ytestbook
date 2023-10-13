import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { MainNavigation } from "./Navigation";
import { theme } from "./theme";
import "./theme.scss";

export const App: React.FC = () => {
  return (
    <MantineProvider theme={{ ...theme }}>
      <Notifications />
      <ModalsProvider>
        <DatesProvider settings={{ locale: "it" }}>
          <MainNavigation />
        </DatesProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};
