import { PouchDBDocument } from "../../types/pouchDB";
import { USE_CASE, UseCase } from "../../types/useCase";
import { getDB } from "../lib/db";
import { scaffoldUseCase } from "../scaffolds/useCase";

export const getUseCases = async (slug: string) => {
  const DB = getDB(slug);
  return DB.find({
    selector: { type: USE_CASE }
  })
}

export const create = async (slug: string, doc?: UseCase): Promise<PouchDBDocument<UseCase>> => {
  const DB = getDB(slug);
  const data = { ...scaffoldUseCase, ...doc };
  const response = await DB.put(data);
  return DB.get<UseCase>(response.id);
}

export const getUseCase = async (slug: string, doc: PouchDBDocument<Partial<UseCase>>) => {
  const DB = getDB(slug);
  return DB.get(doc._id);
}

export const saveUseCase = async (slug: string, doc: PouchDBDocument<Partial<UseCase>>): Promise<PouchDBDocument<UseCase>> => {
  const DB = getDB(slug);
  const { _rev } = await DB.get(doc._id);
  if (_rev !== doc._rev) {
    console.error("Conflict saving document", doc);
  }
  await DB.put(doc);
  return DB.get(doc._id);
}

export const removeUseCase = async (slug: string, doc: PouchDBDocument<UseCase>) => {
  const DB = getDB(slug);
  if (!doc._id) {
    console.warn("Cannot remove this document, it does not have an _id", doc);
    return;
  }
  const data = await DB.get(doc._id);
  return DB.remove(data);
}