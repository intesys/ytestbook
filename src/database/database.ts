import {
  addPouchPlugin,
  addRxPlugin,
  CollectionsOfDatabase,
  createRxDatabase,
  getRxStoragePouch,
  RxDatabase,
  RxDumpDatabase,
} from "rxdb";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";
import { RxDBReplicationCouchDBPlugin } from "rxdb/plugins/replication-couchdb";
import { downloadDocumento } from "../lib/file";
import { collectionsInit } from "./collections";

addPouchPlugin(require("pouchdb-adapter-idb"));
addPouchPlugin(require("pouchdb-adapter-http"));
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationCouchDBPlugin);
addRxPlugin(RxDBJsonDumpPlugin);

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

  // init collections
  await collectionsInit(db);

  return db;
};

export const getInstance = (): Promise<RxDatabase> => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};

export const exportDb = async () => {
  const db = await getInstance();
  await db.exportJSON(true).then((json) => {
    downloadDocumento(JSON.stringify(json), "application/json", "db.json");
  });
};

export const importDb = async (json: any) => {
  const db = await getInstance();
  await db.remove();
  dbPromise = await _create();
  await dbPromise.importJSON(json).then(() => {
    console.log("DB Import successfully!");
  });
};
