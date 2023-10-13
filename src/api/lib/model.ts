import { TYPE } from "../../types/entityTypes";
import { PouchDBDocument } from "../../types/pouchDB";
import { getDB } from "./db";

export const find = async <T>(testbook: string, doc: PouchDBDocument<Partial<T>>): Promise<PouchDBDocument<T>> => {
  const DB = getDB(testbook);
  return DB.get<T>(doc._id);
}

export const findAll = async <T extends {}>(testbook: string, type: TYPE) => {
  const DB = getDB(testbook);
  return DB.find({
    selector: { type }
  } as PouchDB.Find.FindRequest<T>)
}

export const watchAll = <T extends {}>(testbook: string, type: TYPE) => {
  const DB = getDB(testbook);
  return DB.changes<T>({
    live: true,
    include_docs: true,
    filter: (doc) => doc.type === type
  })
}

export const create = async <T, S extends {}>(testbook: string, doc?: T, scaffold: S = {} as S): Promise<PouchDBDocument<T>> => {
  const DB = getDB(testbook);
  const data = { ...scaffold, ...doc };
  const response = await DB.put(data);
  return DB.get<T>(response.id);
}

export const update = async <T>(testbook: string, doc: PouchDBDocument<Partial<T>>): Promise<PouchDBDocument<T>> => {
  if (!doc._id) {
    console.error("Can't update this document, _id is not set", doc);
    return Promise.reject();
  }
  const DB = getDB(testbook);
  const { _rev } = await DB.get(doc._id);
  if (_rev !== doc._rev) {
    console.error("Conflict saving document", doc);
    return Promise.reject();
  }
  await DB.put(doc);
  return DB.get<T>(doc._id);
}

export const remove = async <T>(testbook: string, doc: PouchDBDocument<T>) => {
  const DB = getDB(testbook);
  if (!doc._id) {
    console.warn("Can't remove this document, _id is not set", doc);
    return;
  }
  const data = await DB.get(doc._id);
  return DB.remove(data);
}