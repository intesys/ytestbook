import { PouchDBDocument } from "../../types/pouchDB";
import { USE_CASE, UseCase } from "../../types/useCase";
import { DB } from "../config";
import { scaffoldUseCase } from "../scaffolds/useCase";

export const allDocs = async () => {
  return DB.find({
    selector: { type: USE_CASE }
  })
}

export const create = async (doc?: UseCase): Promise<PouchDBDocument<UseCase>> => {
  const data = { ...scaffoldUseCase, ...doc };
  const response = await DB.put(data);
  return DB.get<UseCase>(response.id);
}

export const find = async (doc: PouchDBDocument<Partial<UseCase>>) => {
  return DB.get(doc._id);
}

export const save = async (doc: PouchDBDocument<Partial<UseCase>>): Promise<PouchDBDocument<UseCase>> => {
  const { _rev } = await DB.get(doc._id);
  if (_rev !== doc._rev) {
    console.error("Conflict saving document", doc);
  }
  await DB.put(doc);
  return DB.get(doc._id);
}

export const remove = async (doc: PouchDBDocument<UseCase>) => {
  if (!doc._id) {
    console.warn("Cannot remove this document, it does not have an _id", doc);
    return;
  }
  const data = await DB.get(doc._id);
  return DB.remove(data);
}