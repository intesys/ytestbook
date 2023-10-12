import { getFormattedDateDayJs } from "../../lib/date/date";
import { DBRegistryDoc } from "../../types/pouchDB";
import { TestbookInfo } from "../../types/testbook";
import { DB_INFO_ID } from "../consts";
import { DB_INDEX, createDB, getDB, removeDB } from "./db";

export const findTestbook = async (id: string) => {
  const DB = getDB(id);
  return DB.get<TestbookInfo>(DB_INFO_ID);
}

export const findAllTestbooks = async () => {
  return DB_INDEX.find();
}

export const watchAllTestbooks = () => {
  return DB_INDEX.changes<DBRegistryDoc>({ live: true, include_docs: true });
}

export const createTestbook = async (name: string, client: string) => {
  // feel free to add any string info to info object
  const info = { name, client, created: getFormattedDateDayJs() };
  const DB = await createDB(name, info);
  return DB.get<TestbookInfo>(DB_INFO_ID);
}

export const updateTestbook = async (testbook: TestbookInfo) => {
  const DB = getDB(testbook.id);
  await DB.put(testbook);
  return DB.get<TestbookInfo>(testbook.id);
}

export const removeTestbook = async (id: string) => {
  return removeDB(id);
}