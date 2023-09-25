import slugify from 'slugify';
import { DB_INDEX } from "..";
import { getFormattedDateDayJs } from '../../lib/date/date';
import { TYPE } from '../../types/entityTypes';
import { DBRegistryDoc } from "../../types/pouchDB";
import { TestbookInfo } from '../../types/testbook';
import { DB_INFO_ID, dbLocation } from '../consts';
import { isValidUrl } from "./isValidUrl";

/**
 * Local registry of PouchDB instances
 */
const connectionRegistry: Record<string, PouchDB.Database<{}>> = {};

const getLocation = (slug: string): string => `${dbLocation}${slug}/`;

const register = async (name: string, slug: string, location: string, info: {}): Promise<DBRegistryDoc> => {
  await DB_INDEX.put<DBRegistryDoc>({ _id: slug, name, location, ...info });
  return DB_INDEX.get<DBRegistryDoc>(slug);
}

const initializeIndexes = async (DB: PouchDB.Database) => {
  await DB.createIndex({ index: { fields: ["type"] } });
  await DB.createIndex({ index: { fields: ["tags"] } });
  await DB.createIndex({ index: { fields: ["status"] } });
}

/**
 * Removes db by slug and updates DB_INDEX and localRegistry
 */
export const removeDB = async (slug: string) => {
  try {
    connectionRegistry[slug] ?? await connectionRegistry[slug].destroy();
  } catch (err) { }

  try {
    const dbLocation = getLocation(slug);
    if (isValidUrl(dbLocation)) {
      // It's a remote database
      await fetch(dbLocation, { method: "DELETE" });
    }
  } catch (err) { }

  try {
    delete connectionRegistry[slug];
  } catch (err) { }

  try {
    const dbDoc = await DB_INDEX.get(slug);
    await DB_INDEX.remove(dbDoc);
  } catch (err) { }
}

/**
 * Returns a PouchDB instance for requested slug
 * it caches and reuses connections using an internal registry
 */
export const getDB = (slug: string): PouchDB.Database<{}> => {
  if (!connectionRegistry[slug]) {
    const instance = new PouchDB(getLocation(slug));
    connectionRegistry[slug] = instance;
  }
  return connectionRegistry[slug];
}

/**
 * Creates a new database and registers it even in PouchDB internal index and in the local registry
 */
export const createDB = async (name: string, info: {}): Promise<PouchDB.Database<{}>> => {
  try {
    const slug = slugify(name);
    const location = getLocation(slug);
    const created = getFormattedDateDayJs();
    const DB = getDB(slug)
    initializeIndexes(DB);
    await DB.put({
      _id: DB_INFO_ID,
      type: TYPE.INFO,
      name,
      slug,
      ...info,
      created
    } as TestbookInfo);
    await register(name, slug, location, info);
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