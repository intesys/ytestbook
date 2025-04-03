import { expect, test } from "vitest";
import { resolveStatuses } from "./resolveStatuses";
import { StatusEnum } from "../../../types/schema";

test("If all statuses are the same return that status", () => {
  for (const status of Object.values(StatusEnum)) {
    expect(resolveStatuses([status, status], "test")).toBe(status);
  }
});

test("If there is a FAIL status, resolve as FAIL", () => {
  expect(resolveStatuses([StatusEnum.FAIL, StatusEnum.BLOCKED], "test")).toBe(
    StatusEnum.FAIL,
  );
});

test("If top weighted status is BLOCKED, resolve as BLOCKED", () => {
  expect(resolveStatuses([StatusEnum.TODO, StatusEnum.CANCELLED], "test")).toBe(
    StatusEnum.TODO,
  );
});

test("If top weighted status is CANCELLED, resolve as CANCELLED", () => {
  expect(
    resolveStatuses([StatusEnum.CANCELLED, StatusEnum.BLOCKED], "test"),
  ).toBe(StatusEnum.CANCELLED);
});

test("If top weighted status is PAUSED, resolve as PAUSED", () => {
  expect(
    resolveStatuses([StatusEnum.BLOCKED, StatusEnum.PENDING], "test"),
  ).toBe(StatusEnum.BLOCKED);
});

test("If top weighted status is TODO, resolve as TODO", () => {
  expect(resolveStatuses([StatusEnum.PENDING, StatusEnum.PAUSED], "test")).toBe(
    StatusEnum.PENDING,
  );
});

test("If top weighted status is PENDING, resolve as PENDING", () => {
  expect(resolveStatuses([StatusEnum.PAUSED, StatusEnum.DONE], "test")).toBe(
    StatusEnum.PAUSED,
  );
});

test("If there are no statuses default to TODO", () => {
  expect(resolveStatuses([], "test")).toBe(StatusEnum.TODO);
});
