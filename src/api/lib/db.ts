import { MAINDB } from "..";
import { getFormattedDateDayJs } from '../../lib/date/date';
import { DBRegistryKey } from "../../types/pouchDB";
import { DB_INFO_ID, DB_REGISTRY_ID, dbLocation } from '../consts';
import slugify from 'slugify';

/**
 * local registry of PouchDB instances
 */
const localRegistry: Record<string, PouchDB.Database<{}>> = {};

const getRegistry = async () => {
  try {
    return await MAINDB.get<{ data: DBRegistryKey[] }>(DB_REGISTRY_ID);
  }
  catch (err) {
    return { _id: DB_REGISTRY_ID, data: [] };
  }
}

const getLocation = (slug: string): string => `${dbLocation}${slug}/`;

const register = async (name: string, slug: string, location: string, info: {}): Promise<DBRegistryKey[]> => {
  const registry = await getRegistry().catch(() => ({ _id: DB_REGISTRY_ID, data: [] }));
  await MAINDB.put({ ...registry, data: [...registry.data, { name, slug, location, ...info }] });
  return MAINDB.get(DB_REGISTRY_ID);
}

const initializeIndexes = async (DB: PouchDB.Database) => {
  await DB.createIndex({ index: { fields: ["type"] } });
  await DB.createIndex({ index: { fields: ["tags"] } });
  await DB.createIndex({ index: { fields: ["status"] } });
}

/**
 * Returns a PouchDB instance for requested slug
 * it caches and reuses connections using an internal registry
 */
export const getDB = (slug: string): PouchDB.Database<{}> => {
  if (!localRegistry[slug]) {
    const instance = new PouchDB(getLocation(slug));
    localRegistry[slug] = instance;
  }
  return localRegistry[slug];
}

/**
 * Creates a new database and registers it even in PouchDB internal index and in the local registry
 */
export const createDB = async (name: string, info: {}): Promise<PouchDB.Database<{}>> => {
  const slug = slugify(name);
  const location = getLocation(slug);
  const created = getFormattedDateDayJs();
  const DB = getDB(slug)
  initializeIndexes(DB);
  await DB.put({
    _id: DB_INFO_ID,
    name,
    slug,
    ...info,
    created
  });
  await register(name, slug, location, info);
  return DB
}