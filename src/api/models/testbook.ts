import { DB_INDEX, removeDB } from "..";
import { getFormattedDateDayJs } from "../../lib/date/date";
import { DBRegistryDoc } from "../../types/pouchDB";
import { DB_INFO_ID, DB_REGISTRY_ID } from "../consts";
import { createDB, getDB } from "../";

export const findAllTestbooks = () => {
  return DB_INDEX.changes<DBRegistryDoc>({ live: true, include_docs: true });
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

export const removeTestbook = async (slug: string) => {
  return removeDB(slug);
}