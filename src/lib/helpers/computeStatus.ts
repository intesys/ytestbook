import { TCase, TStep, TTest } from "../../types/schema";
import { resolveStatuses, TargetType } from "./resolveStatuses/resolveStatuses";

/**
 * Computes and assigns the status of a target entity based on the statuses of related items.
 *
 * @param target - The target entity whose status will be computed. It can be of type `TTest` or `TCase`.
 * @param items - An array of related items whose statuses will be used to compute the target's status.
 *                 The array can contain elements of type `TStep`, `TTest`, or `TCase`.
 */
export function computeStatus(
  target: TTest | TCase,
  items: TStep[] | TTest[] | TCase[],
  targetType: TargetType,
) {
  const resolvedStatus = resolveStatuses(
    items.map((item) => item.status),
    targetType,
  );
  target.status = resolvedStatus;
}
