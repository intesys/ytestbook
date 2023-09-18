import { app, BrowserWindow } from "electron";
import path from "node:path";
const config = require('../config.json');

const isDev = process.env.NODE_ENV === "development";

const serverURL = `${config.server.protocol}://${config.server.host}:${config.server.port}`;

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x


function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (isDev) {
    win.loadURL(serverURL);
  } else {
    require("../server/app");
    win.loadFile(path.join(process.env.DIST, "public/index.html"));
  }
}

app.on("window-all-closed", () => {
  win = null;
  // shutdown express server
});

app.whenReady().then(createWindow);
