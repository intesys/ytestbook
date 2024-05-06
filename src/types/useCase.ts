import { TYPE } from "./entityTypes";
import { STATUS } from "./status";

export type UseCase = {
  type: TYPE.USE_CASE;
  title?: string;
  description?: string;
  requirements?: string;
  accountantId?: string;
  responsibleId?: string;
  status: STATUS;
  startDate?: string;
  endDate?: string;
  tags: string[];
  created?: string;
  modified?: string;
};
