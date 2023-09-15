import { STATUS } from "./status"

export const USE_CASE = "use-case";

export type UseCase = {
  type: typeof USE_CASE,
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
}