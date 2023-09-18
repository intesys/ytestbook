const router = require("./router");
const express = require("express");
const { server } = require("../config.json");

const app = express();

app.use(router);

app.listen(server.port);
console.log(
  `Web server is listening on ${server.protocol}://${server.host}:${server.port},
database is reachable at ${server.protocol}://${server.host}:${server.port}/${server.db}`,
);

process.on("SIGTERM", () => {
  console.log("Closing HTTP server");
  router.close(() => {
    console.log("HTTP server closed");
  });
});
