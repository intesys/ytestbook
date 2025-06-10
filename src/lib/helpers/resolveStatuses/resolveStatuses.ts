import { StatusEnum } from "../../../types/schema";
import {
  StatusWeightsForTestCases,
  StatusWeightsForTests,
} from "./statusWeights";

export type TargetType = "test" | "testCase";

/**
 * Resolves the overall status from an array of statuses based on their predefined weights.
 *
 * @param statuses - An array of statuses of type `StatusEnum`.
 *                   If the array is empty, the function returns `StatusEnum.TODO`.
 *                   If a status is not found in `StatusWeights`, it is ignored.
 * @returns The resolved status from the `StatusWeights` array with the lowest index
 *          (indicating the highest priority).
 */
export const resolveStatuses = (statuses: StatusEnum[], type: TargetType) => {
  if (statuses.length === 0) {
    return StatusEnum.TODO;
  }

  const weights =
    type === "test" ? StatusWeightsForTests : StatusWeightsForTestCases;

  const resolvedStatusIndex = statuses.reduce((minWeight, status) => {
    const index = weights.indexOf(status);

    if (index === -1) {
      return minWeight;
    }

    return Math.min(minWeight, index);
  }, weights.length - 1);

  return weights[resolvedStatusIndex];
};
