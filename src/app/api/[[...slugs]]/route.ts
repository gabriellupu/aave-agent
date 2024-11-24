import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { getUserKarma } from "@/utils/user-karma";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/:account", async ({ params: { account } }) => {
    const karma = getUserKarma(account);
    if (!karma) {
      return {
        error: `Token ${account} not found`,
      };
    }
    return karma;
  });

export const GET = app.handle;
export const POST = app.handle;
