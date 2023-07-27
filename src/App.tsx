import { MantineProvider } from "@mantine/core";
import React from "react";
import Styles from "./Styles";
import { YTestbookContextProvider } from "./context/useYTestbookContext";
import { AppRoutes } from "./routes/AppRoutes";
import { theme } from "./theme";

const App: React.FC = () => {
  return (
    <div className="App">
      <MantineProvider theme={{ ...theme }} withGlobalStyles withNormalizeCSS>
        <Styles />
        <YTestbookContextProvider>
          <AppRoutes />
        </YTestbookContextProvider>
      </MantineProvider>
    </div>
  );
};

export default App;
