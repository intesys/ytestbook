/**
 * Provides functinos to create, load and delete a database
 * exports:
 * - createDB
 * - getDB
 * - removeDB
 */
import slugify from 'slugify';
import { getFormattedDateDayJs } from '../../lib/date/date';
import { TYPE } from '../../types/entityTypes';
import { DBRegistryDoc } from "../../types/pouchDB";
import { TestbookAdditionalInfo, TestbookInfo } from '../../types/testbook';
import { DB_INDEX_NAME, DB_INFO_ID, dbLocation } from '../consts';
import { isValidUrl } from "./isValidUrl";

export const DB_INDEX = new PouchDB<DBRegistryDoc>(`${dbLocation}${DB_INDEX_NAME}/`);

/**
 * Local registry of PouchDB instances
 */
const connectionRegistry: Record<string, PouchDB.Database<{}>> = {};

const getLocation = (id: string): string => `${dbLocation}${id}/`;

/**
 * Register to remote DB index
 */
const register = async (name: string, id: string, location: string, info: {}): Promise<DBRegistryDoc> => {
  await DB_INDEX.put<DBRegistryDoc>({ _id: id, name, location, ...info });
  return DB_INDEX.get<DBRegistryDoc>(id);
}

const initializeIndexes = async (DB: PouchDB.Database) => {
  await DB.createIndex({ index: { fields: ["type"] } });
  await DB.createIndex({ index: { fields: ["tags"] } });
  await DB.createIndex({ index: { fields: ["status"] } });
}

/**
 * Removes db by slug and updates DB_INDEX and localRegistry
 */
export const removeDB = async (id: string) => {
  try {
    // Remove local database
    connectionRegistry[id] ?? await connectionRegistry[id].destroy();
  } catch (err) { }

  try {
    // Remove remote database using HTTP api
    const dbLocation = getLocation(id);
    if (isValidUrl(dbLocation)) {
      // It's a remote database
      await fetch(dbLocation, { method: "DELETE" });
    }
  } catch (err) { }

  try {
    // Remove local registry key
    delete connectionRegistry[id];
  } catch (err) { }

  try {
    // Remove from global registry
    const dbDoc = await DB_INDEX.get(id);
    await DB_INDEX.remove(dbDoc);
  } catch (err) { }
}

/**
 * Returns a PouchDB instance for requested slug
 * it caches and reuses connections using an internal registry
 */
export const getDB = (id: string): PouchDB.Database<{}> => {
  if (!connectionRegistry[id]) {
    const instance = new PouchDB(getLocation(id));
    connectionRegistry[id] = instance;
  }
  return connectionRegistry[id];
}

/**
 * Creates a new database and registers it even in PouchDB internal index and in the local registry
 */
export const createDB = async (name: string, info: Record<TestbookAdditionalInfo, string>): Promise<PouchDB.Database<{}>> => {
  try {
    const id = slugify(name);
    const location = getLocation(id);
    const created = getFormattedDateDayJs();

    // Get db instance (generates a new one if needed) - it also registers local instance
    const DB = getDB(id);

    // add db indexes
    await initializeIndexes(DB);

    // Save an "info" document in the new db
    await DB.put({
      _id: DB_INFO_ID,
      type: TYPE.INFO,
      name,
      id,
      ...info,
      created
    } as TestbookInfo);

    // Register to remote registry
    await register(name, id, location, info);
    return DB;
  }
  catch (err) {
    if ((err as { error: string }).error === "conflict") {
      throw err;
    }
    const slug = slugify(name);
    // rollback
    await removeDB(slug);
    throw err;
  }
}

export const updateDB = async (name: string, info: TestbookInfo): Promise<DBRegistryDoc> => {
  const id = slugify(name);
  const location = getLocation(id);
  // @ts-ignore ensure _rev is not passed
  const { _id, _rev, ...rest } = info;
  const revision = await DB_INDEX.get<DBRegistryDoc>(id);
  return register(name, id, location, { ...rest, _rev: revision._rev });
}