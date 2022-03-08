import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
