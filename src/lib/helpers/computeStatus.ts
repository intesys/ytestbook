import { StatusEnum, TCase, TStep, TTest } from "../../types/schema";

// Consider DONE all tasks in the following status
const DONE_STATUS = [StatusEnum.DONE, StatusEnum.CANCELLED];

export function computeStatus(
  target: TTest | TCase,
  items: TStep[] | TTest[] | TCase[],
) {
  const isFail = items.some((item) => item.status === StatusEnum.FAIL);
  const isDone = items.every((item) => DONE_STATUS.includes(item.status));

  if (isFail) {
    target.status = StatusEnum.FAIL;
  } else if (isDone) {
    target.status = StatusEnum.DONE;
  } else {
    target.status = StatusEnum.PENDING;
  }
}
