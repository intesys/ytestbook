import { TCase, TStep, TTest } from "@/types/schema";
import { resolveStatuses, TargetType } from "./resolveStatuses/resolveStatuses";

/**
 * Computes and assigns the status of a target entity based on the statuses of related items.
 *
 * @param target - The target entity whose status will be computed. It can be of type `TTest` or `TCase`.
 * @param items - An array of related items whose statuses will be used to compute the target's status.
 *                 The array can contain elements of type `TStep`, `TTest`, or `TCase`.
 * @param targetType - A string indicating the type of the target entity. It can be either "test" or "case".
 */
export function computeStatus(
  target: TTest | TCase,
  items: TStep[] | TTest[] | TCase[],
  targetType: TargetType
) {
  const resolvedStatus = resolveStatuses(
    items.map((item) => item.status),
    targetType
  );
  target.status = resolvedStatus;
}
