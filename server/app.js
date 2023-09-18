const express = require("express");
const expressPouchdb = require("express-pouchdb");
const cors = require("cors");
const PouchDB = require("pouchdb");
const pouchdbFind = require("pouchdb-find");
const { server } = require("../config.json");

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

app.use(`/${server.db}`, expressPouchdb(DB));

module.exports = app;
