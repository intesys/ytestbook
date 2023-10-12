import { TYPE } from "./entityTypes";
import { STATUS } from "./status";

export type Step {
  type: TYPE.TEST,
  testId: string,
  title?: string,
  description?: string,
  input?: string,
  output?: string,
  status: STATUS,
  startDate?: string,
  endDate?: string,
  tags: string[],
  created?: string,
  modified?: string
} & PouchDB.Core.IdMeta;