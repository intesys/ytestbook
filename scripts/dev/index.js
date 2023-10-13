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

  console.log(
    `Server running on ${server.protocol}://${server.host}:${server.port}`,
  );

  console.log(
    `Database running on  ${server.protocol}://${server.host}:${server.port}/${server.db}`,
  );

  process.on("SIGTERM", () => {
    console.log("Closing dev server");
    app.close(() => {
      console.log("Dev server closed");
    });
  });

  // vite.printUrls();
}

start();
