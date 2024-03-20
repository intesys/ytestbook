import { StatusEnum, TStep, TTest } from "../../schema";

export function computeCompletion(items: TStep[] | TTest[]) {
  if (items.length === 0) return 0;
  const completed = items.reduce((acc, item) => {
    if (item.status === StatusEnum.DONE || item.status === StatusEnum.CANCELLED)
      acc++;
    return acc;
  }, 0);

  return ~~((completed * 100) / items.length);
}
