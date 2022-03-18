import {
  addPouchPlugin,
  addRxPlugin,
  createRxDatabase,
  getRxStoragePouch,
  RxDatabase,
} from "rxdb";
import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";
import { RxDBReplicationCouchDBPlugin } from "rxdb/plugins/replication-couchdb";
import { collectionsInit } from "./collections";

addPouchPlugin(require("pouchdb-adapter-idb"));
addPouchPlugin(require("pouchdb-adapter-http"));
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationCouchDBPlugin);

const syncURL = "http://" + window.location.hostname + ":10102/";
console.log("host: " + syncURL);

let dbPromise: any = null;

const _create = async (): Promise<RxDatabase> => {
  console.log("DatabaseService: creating database...");
  const db = await createRxDatabase({
    name: "ymocktestdb",
    storage: getRxStoragePouch("idb"),
  });
  console.log("DatabaseService: created database");
  window["db"] = db;

  // init collections
  await collectionsInit(db);

  console.log("DatabaseService: sync");
  Object.values(db.collections)
    .map((col) => col.name)
    .forEach((colName) =>
      db[colName].syncCouchDB({
        remote: syncURL + colName + "/",
      })
    );

  return db;
};

export const init = () => {
  if (!dbPromise) dbPromise = _create();
};

export const get = (): Promise<RxDatabase> => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};
