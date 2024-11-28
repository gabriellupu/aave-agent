import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { getUserKarma } from "@/lib/user-karma";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/karma/:account", async ({ params: { account } }) => {
    // if account has no suffix, then append .near,
    // but only if no suffix present and if the account is not a hash
    let accountId = account;
    if (!account.includes(".") && !/^[0-9a-fA-F]{64}$/.test(account)) {
      accountId = `${account}.near`;
    }
    const karma = await getUserKarma(accountId);
    if (!karma) {
      return {
        error: `Token ${account} not found`,
      };
    }
    return karma;
  });

export const GET = app.handle;
export const POST = app.handle;
