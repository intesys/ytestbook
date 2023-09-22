import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import React from "react";
import Styles from "./Styles";
import { MainNavigation } from "./Navigation";
import { theme } from "./theme";
import { ModalsProvider } from "@mantine/modals";

const App: React.FC = () => {
  return (
    <div className="App">
      <MantineProvider theme={{ ...theme }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <DatesProvider settings={{ locale: "it" }}>
            <Styles />
            <MainNavigation />
          </DatesProvider>
        </ModalsProvider>
      </MantineProvider>
    </div>
  );
};

export default App;
