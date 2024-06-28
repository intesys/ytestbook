import { StatusEnum, TCase, TStep, TTest } from "../../types/schema";

export function computeStatus(
  target: TTest | TCase,
  items: TStep[] | TTest[] | TCase[],
) {
  const isDone = items.every(
    (item) =>
      item.status === StatusEnum.DONE || item.status === StatusEnum.CANCELLED,
  );

  isDone
    ? (target.status = StatusEnum.DONE)
    : (target.status = StatusEnum.PENDING);
}
