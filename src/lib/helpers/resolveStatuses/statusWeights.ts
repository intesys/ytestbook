import { StatusEnum } from "../../../types/schema";

/**
 * An ordered array of statuses representing their relative weights for tests.
 * The order determines the priority or severity of the statuses, with the first
 * element having the highest weight and the last element having the lowest weight.
 */
export const StatusWeightsForTests = [
  StatusEnum.FAIL,
  StatusEnum.TODO,
  StatusEnum.CANCELLED,
  StatusEnum.BLOCKED,
  StatusEnum.PENDING,
  StatusEnum.PAUSED,
  StatusEnum.DONE,
];

/**
 * An ordered array of statuses representing their relative weights for test cases.
 * The order determines the priority or severity of the statuses, with the first
 * element having the highest weight and the last element having the lowest weight.
 */
export const StatusWeightsForTestCases = [
  StatusEnum.TODO,
  StatusEnum.FAIL,
  StatusEnum.CANCELLED,
  StatusEnum.BLOCKED,
  StatusEnum.PENDING,
  StatusEnum.PAUSED,
  StatusEnum.DONE,
];
