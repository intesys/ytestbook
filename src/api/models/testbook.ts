import { DB_INDEX, removeDB } from "..";
import { createDB, getDB } from "../";
import { getFormattedDateDayJs } from "../../lib/date/date";
import { DBRegistryDoc } from "../../types/pouchDB";
import { TestbookInfo } from "../../types/testbook";
import { DB_INFO_ID } from "../consts";

export const watchAllTestbooks = () => {
  return DB_INDEX.changes<DBRegistryDoc>({ live: true, include_docs: true });
}

export const createTestbook = async (name: string, client: string) => {
  // feel free to add any string info to info object
  const info = { name, client, created: getFormattedDateDayJs() };
  const DB = await createDB(name, info);
  return DB.get<TestbookInfo>(DB_INFO_ID);
}

export const findTestbook = async (slug: string) => {
  const DB = getDB(slug);
  return DB.get<TestbookInfo>(DB_INFO_ID);
}

export const saveTestbook = async (testbook: TestbookInfo) => {
  const DB = getDB(testbook.slug);
  await DB.put(testbook);
  return DB.get<TestbookInfo>(testbook.slug);
}

export const removeTestbook = async (slug: string) => {
  return removeDB(slug);
}