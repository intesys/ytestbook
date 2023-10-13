const express = require("express");
const expressPouchdb = require("express-pouchdb");
const cors = require("cors");
const PouchDB = require("pouchdb");
const pouchdbFind = require("pouchdb-find");
const { server } = require("../config.json");

const DB = PouchDB.defaults({ prefix: "./db/" });
DB.plugin(pouchdbFind);

const router = express.Router();

// const enableCors = (req, cb) => {
//   const origin = req.header("Origin");
//   console.log(origin);
//   cb(null, origin);
// };
// router.options("*", cors(enableCors));
// router.use(cors(enableCors));

router.use(`/${server.db}`, expressPouchdb(DB));

module.exports = router;
