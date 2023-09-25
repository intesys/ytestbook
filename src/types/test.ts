import { TYPE } from "./entityTypes";
import { STATUS } from "./status";

export type Test {
  type: TYPE.TEST,
  slug: string,
  useCaseId: string,
  title?: string,
  description?: string,
  requirements?: string,
  status: STATUS,
  startDate?: string,
  endDate?: string,
  tags: string[],
  created?: string,
  modified?: string
} & PouchDB.Core.IdMeta;