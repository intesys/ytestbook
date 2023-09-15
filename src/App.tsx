import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import React from "react";
import Styles from "./Styles";
// import { YTestbookContextProvider } from "./context/useYTestbookContext";
import { AppRoutes } from "./routes/AppRoutes";
import { theme } from "./theme";

const App: React.FC = () => {
  return (
    <div className="App">
      <MantineProvider theme={{ ...theme }} withGlobalStyles withNormalizeCSS>
        <DatesProvider settings={{ locale: "it" }}>
          <Styles />
          {/* <YTestbookContextProvider> */}
          <AppRoutes />
          {/* </YTestbookContextProvider> */}
        </DatesProvider>
      </MantineProvider>
    </div>
  );
};

export default App;
