import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import React, { useState } from "react";
import { UseCasesContextProvider } from "./context/useCasesContext";
import Routes from "./routes";
import { theme } from "./theme";
import { TestbookContextProvider } from "./context/useTestbookContext";
import { NotificationsProvider } from "@mantine/notifications";
import { MembersContextProvider } from "./context/useMembersContext";

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

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
          <NotificationsProvider
            position="top-right"
            limit={3}
            autoClose={4000}
            zIndex={999}
          >
            <TestbookContextProvider>
              <UseCasesContextProvider>
                <MembersContextProvider>
                  <Routes />
                </MembersContextProvider>
              </UseCasesContextProvider>
            </TestbookContextProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
