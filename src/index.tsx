import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

if (process.env.API_MOCK === "true") {
  console.log("start dev");
  const { worker } = require("./mocks/browser");
  worker.printHandlers();
  worker.start();
}

let root = createRoot(document.getElementById("ytestbook_root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
