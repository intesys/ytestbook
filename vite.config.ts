import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: "./public/index.html",
      },
    },
  },
  server: {
    open: "/public/index.html",
  },
  plugins: [
    react(),
    electron([
      {
        entry: "electron/main.ts",
      },
      {
        entry: "electron/preload.ts",
        onstart(options) {
          options.reload();
        },
      },
    ]),
    renderer(),
    svgr(),
  ],
});
