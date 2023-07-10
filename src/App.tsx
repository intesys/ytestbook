import React from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { YTestbookContextProvider } from "./context/useYTestbookContext";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Styles from "./Styles";

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
