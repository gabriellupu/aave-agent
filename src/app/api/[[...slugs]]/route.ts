import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { getUserKarma } from "@/utils/user-karma";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/karma/:account", async ({ params: { account } }) => {
    // if account has no suffix, then append .near
    const accountId = account; //.indexOf(".") >= 0 ? account : `${account}.near`;
    const karma = getUserKarma(accountId);
    if (!karma) {
      return {
        error: `Token ${account} not found`,
      };
    }
    return karma;
  });

export const GET = app.handle;
export const POST = app.handle;
