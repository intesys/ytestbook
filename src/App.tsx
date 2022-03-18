import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { UseCasesContextProvider } from "./context/useCasesContext";
import Routes from "./routes";
import { theme } from "./theme";
import * as Database from "./database/database";
import { TestbookContextProvider } from "./context/useTestbookContext";

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const initDatabase = async () => {
    await Database.init();
  };

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme: colorScheme, ...theme }}
          withGlobalStyles
        >
          <TestbookContextProvider>
            <UseCasesContextProvider>
              <Routes />
            </UseCasesContextProvider>
          </TestbookContextProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
