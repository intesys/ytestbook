import { expect, test } from "vitest";
import { resolveStatuses } from "./resolveStatuses";
import { StatusEnum } from "../../../types/schema";

test("If all statuses are the same return that status", () => {
  for (const status of Object.values(StatusEnum)) {
    expect(resolveStatuses([status, status])).toBe(status);
  }
});

test("If there is a FAIL status, resolve as FAIL", () => {
  expect(resolveStatuses([StatusEnum.FAIL, StatusEnum.BLOCKED])).toBe(
    StatusEnum.FAIL,
  );
});

test("If top weighted status is BLOCKED, resolve as BLOCKED", () => {
  expect(resolveStatuses([StatusEnum.BLOCKED, StatusEnum.CANCELLED])).toBe(
    StatusEnum.BLOCKED,
  );
});

test("If top weighted status is CANCELLED, resolve as CANCELLED", () => {
  expect(resolveStatuses([StatusEnum.CANCELLED, StatusEnum.PAUSED])).toBe(
    StatusEnum.CANCELLED,
  );
});

test("If top weighted status is PAUSED, resolve as PAUSED", () => {
  expect(resolveStatuses([StatusEnum.PAUSED, StatusEnum.TODO])).toBe(
    StatusEnum.PAUSED,
  );
});

test("If top weighted status is TODO, resolve as TODO", () => {
  expect(resolveStatuses([StatusEnum.TODO, StatusEnum.PENDING])).toBe(
    StatusEnum.TODO,
  );
});

test("If top weighted status is PENDING, resolve as PENDING", () => {
  expect(resolveStatuses([StatusEnum.PENDING, StatusEnum.DONE])).toBe(
    StatusEnum.PENDING,
  );
});

test("If there are no statuses default to TODO", () => {
  expect(resolveStatuses([])).toBe(StatusEnum.TODO);
});
