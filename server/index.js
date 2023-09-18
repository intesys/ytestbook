const app = require("./app");
const { server } = require("../config.json");

app.listen(server.port);
console.log(
  `Web server is listening on ${server.protocol}://${server.host}:${server.port},
database is reachable at ${server.protocol}://${server.host}:${server.port}/${server.db}`,
);

process.on("SIGTERM", () => {
  console.log("Closing HTTP server");
  app.close(() => {
    console.log("HTTP server closed");
  });
});
