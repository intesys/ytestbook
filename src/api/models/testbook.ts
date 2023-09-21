import { MAINDB } from "..";
import { getFormattedDateDayJs } from "../../lib/date/date";
import { DBRegistryKey } from "../../types/pouchDB";
import { DB_INFO_ID, DB_REGISTRY_ID } from "../consts";
import { createDB, getDB } from "../lib/db";

export const findAllTestbooks = () => {
  return MAINDB.changes<{ data: DBRegistryKey[] }>({ doc_ids: [DB_REGISTRY_ID], live: true, include_docs: true });
}

export const createTestbook = async (name: string, client: string) => {
  // feel free to add any string info to info object
  const info = { name, client, created: getFormattedDateDayJs() };
  const DB = await createDB(name, info);
  return DB.get(DB_INFO_ID);
}

export const findTestbook = async (slug: string) => {
  const DB = getDB(slug);
  console.log(DB);
}