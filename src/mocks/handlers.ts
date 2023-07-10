import { rest } from "msw";
import { APP_URL } from "../const";

export const handlers = [
  rest.get(APP_URL + "/utente", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200));
  }),
];
