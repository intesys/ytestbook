const app = require("../../server/app");
const { server } = require("../../config.json");
const { createServer } = require("vite");

const devConfig = {
  server: { middlewareMode: false, open: "/" },
  appType: "spa",
};

async function start() {
  const vite = await createServer(devConfig);

  vite.middlewares.use(app);

  vite.listen(server.port);
}

start();
