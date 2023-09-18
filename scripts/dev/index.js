const dbRouter = require("../../server/router");
const { server } = require("../../config.json");
const { createServer } = require("vite");
const express = require("express");
const exp = require("constants");

const devConfig = {
  server: { middlewareMode: true, open: "/" },
  appType: "spa",
};

async function start() {
  const app = express();

  const vite = await createServer(devConfig);

  // vite.middlewares.use(dbRouter);
  app.use(dbRouter);
  app.use(vite.middlewares);

  await app.listen(server.port);

  // vite.printUrls();
}

start();
