import { getFormattedDateDayJs } from "../../lib/date/date";
import { STATUS } from "../../types/status";
import { TYPE } from "../../types/testbook";
import { UseCase } from "../../types/useCase";

export const scaffoldUseCase: Omit<UseCase, "_id"> = {
  type: TYPE.USE_CASE,
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