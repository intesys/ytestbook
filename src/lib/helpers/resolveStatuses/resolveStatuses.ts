import { StatusEnum } from "../../../types/schema";

/**
 * An ordered array of statuses representing their priority or weight.
 * The order determines the precedence of statuses, with the first element
 * having the highest priority and the last element having the lowest priority.
 *
 * @remarks
 * This array is used to resolve or compare statuses based on their importance.
 *
 * const highestPriorityStatus = StatusWeights[0];
 *
 * @see StatusEnum - Enum containing all possible statuses.
 */
const StatusWeights = [
  StatusEnum.FAIL,
  StatusEnum.BLOCKED,
  StatusEnum.CANCELLED,
  StatusEnum.PAUSED,
  StatusEnum.TODO,
  StatusEnum.PENDING,
  StatusEnum.DONE,
];

/**
 * Resolves the overall status from an array of statuses based on their predefined weights.
 *
 * @param statuses - An array of statuses of type `StatusEnum`.
 *                   If the array is empty, the function returns `StatusEnum.TODO`.
 *                   If a status is not found in `StatusWeights`, it is ignored.
 * @returns The resolved status from the `StatusWeights` array with the lowest index
 *          (indicating the highest priority).
 */
export const resolveStatuses = (statuses: StatusEnum[]) => {
  if (statuses.length === 0) {
    return StatusEnum.TODO;
  }

  const resolvedStatusIndex = statuses.reduce((minWeight, status) => {
    const index = StatusWeights.indexOf(status);

    if (index === -1) {
      return minWeight;
    }

    return Math.min(minWeight, index);
  }, StatusWeights.length - 1);

  return StatusWeights[resolvedStatusIndex];
};
