import { rest } from "msw";
import { APP_URL } from "../const";
import { testbook, testbooks } from "./fixtures/testbook";

export const handlers = [
  rest.post(APP_URL + "/login", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json({ accessToken: "adbc123" }));
  }),

  rest.get(APP_URL + "/testbook/all", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(testbooks));
  }),

  rest.post(APP_URL + "/testbook", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(testbook));
  }),
];
