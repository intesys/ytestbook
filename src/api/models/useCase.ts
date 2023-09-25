import { getDB } from "../";
import { PouchDBDocument } from "../../types/pouchDB";
import { TYPE } from "../../types/entityTypes";
import { UseCase } from "../../types/useCase";
import { scaffoldUseCase } from "../scaffolds/useCase";

/**
 * @param slug Database slug/id
 * @returns 
 */
export const getUseCases = async (slug: string) => {
  const DB = getDB(slug);
  return DB.find({
    selector: { type: TYPE.USE_CASE }
  })
}

export const watchUseCases = (slug: string) => {
  const DB = getDB(slug);
  return DB.changes<UseCase>({
    live: true,
    include_docs: true,
    filter: (doc) => doc.type === TYPE.USE_CASE
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