import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { getUserKarma } from "@/lib/user-karma";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/karma/:account", async ({ params: { account } }) => {
    // TODO: if account has no suffix, then append .near
    const accountId = account;
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
