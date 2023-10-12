import { STATUS } from "./status"
import { TYPE } from "./entityTypes";

export type UseCase = {
  type: TYPE.USE_CASE,
  title?: string,
  description?: string,
  requirements?: string,
  accountantId?: string,
  responsibleId?: string,
  status: STATUS,
  startDate?: string,
  endDate?: string,
  tags: string[],
  created?: string,
  modified?: string
} & PouchDB.Core.IdMeta;