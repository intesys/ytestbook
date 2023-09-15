const express = require("express");
const expressPouchdb = require("express-pouchdb");
const cors = require("cors");
const PouchDB = require("pouchdb");
const pouchdbFind = require("pouchdb-find");
const { server } = require("../config");

const DB = PouchDB.defaults({ prefix: "./db/" });
DB.plugin(pouchdbFind);

const app = express();

// const enableCors = (req, cb) => {
//   const origin = req.header("Origin");
//   console.log(origin);
//   cb(null, origin);
// };
// app.options("*", cors(enableCors));
// app.use(cors(enableCors));

app.use(`/${server.basePath}`, expressPouchdb(DB));

app.listen(server.port);
console.log(
  `Web server is listening, database is reachable at ${server.protocol}://${server.host}:${server.port}/${server.basePath}`,
);

// export express instance and provide shutdown function

/*

https://github.com/pouchdb-community/pouchdb-replication-stream
https://github.com/pouchdb-community/pouchdb-load

*/
