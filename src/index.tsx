import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

let root = createRoot(document.getElementById("ytestbook_root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
