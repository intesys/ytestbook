const pouchDB = require("pouchdb");
pouchDB.plugin(require("pouchdb-find"));

const db = new pouchDB("./server/database/data/db");

db.createIndex({
  index: { fields: ["_type"] },
});

module.exports = db;
