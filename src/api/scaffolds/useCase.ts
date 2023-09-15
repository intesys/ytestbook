import { getFormattedDateDayJs } from "../../lib/date/date";
import { STATUS } from "../../types/status";
import { USE_CASE, UseCase } from "../../types/useCase";

export const scaffoldUseCase: UseCase = {
  type: USE_CASE,
  title: "",
  description: "",
  requirements: "",
  accountantId: "",
  responsibleId: "",
  status: STATUS.TODO,
  startDate: "",
  endDate: "",
  tags: [],
  created: getFormattedDateDayJs(),
  modified: ""
}