import { DB_INDEX_NAME, dbLocation } from "./consts";
import { getDB, createDB, removeDB } from './lib/db';

export const DB_INDEX = new PouchDB(`${dbLocation}${DB_INDEX_NAME}/`);

export { getDB, createDB, removeDB }; 