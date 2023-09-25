import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import React from "react";
import Styles from "./Styles";
import { MainNavigation } from "./Navigation";
import { theme } from "./theme";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

const App: React.FC = () => {
  return (
    <MantineProvider theme={{ ...theme }} withGlobalStyles withNormalizeCSS>
      <Notifications />
      <ModalsProvider>
        <DatesProvider settings={{ locale: "it" }}>
          <Styles />
          <MainNavigation />
        </DatesProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
