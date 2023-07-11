import { rest } from "msw";
import { APP_URL } from "../const";

export const handlers = [
  rest.post(APP_URL + "/login", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json({ accessToken: "adbc123" }));
  }),
];
