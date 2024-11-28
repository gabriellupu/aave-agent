import { Hono } from "hono";
import { handle } from "hono/vercel";
import { OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";

import { getUserKarma } from "@/lib/user-karma";
import { KarmaResponseSchema } from "@/lib/schemas";
import { DEPLOYMENT_URL } from "vercel-url";

const app = new OpenAPIHono();

const ErrorResponseSchema = z.object({
  error: z.string(),
});

const getKarmaRoute = createRoute({
  operationId: "get-account-karma",
  description:
    "Get account karma and badges based on actions performed by the account.",

  method: "get",
  path: "/api/karma/{account}",
  request: {
    params: z.object({
      account: z
        .string()
        .describe(
          "The identifier for the account to get karma and badges for, e.g. ref-finance.near"
        ),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: KarmaResponseSchema,
        },
      },
      description: "Successful response with karma and badges",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Bad request",
    },
  },
});

app.openapi(getKarmaRoute, async (c) => {
  const { account } = c.req.param();

  // if account has no suffix, then append .near,
  // but only if no suffix present and if the account is not a hash
  let accountId = account;
  if (!account.includes(".") && !/^[0-9a-fA-F]{64}$/.test(account)) {
    accountId = `${account}.near`;
  }

  const karma = await getUserKarma(accountId);
  if (!karma) {
    return c.json({ error: `Token ${account} not found` }, 400);
  }
  return c.json(karma, 200);
});

const key = JSON.parse(process.env.BITTE_KEY || "{}");
const config = JSON.parse(process.env.BITTE_CONFIG || "{}") as {
  url?: string;
};

if (!key?.accountId) {
  console.warn("Missing account info.");
}
if (!config || !config.url) {
  console.warn("Missing config or url in config.");
}

app.doc("/api/ai-plugin", {
  openapi: "3.0.0",
  info: {
    title: "Bitte Karma API",
    description:
      "API for retrieving account karma and badges based on actions performed by the account on NEAR blockchain.",
    version: "1.0.0",
  },
  servers: [{ url: config.url || DEPLOYMENT_URL }],
  "x-mb": {
    "account-id": key.accountId || "",
    assistant: {
      name: "Karma Agent",
      description:
        "An assistant that provides account karma and badges based on actions performed by the account and its current state.",
      instructions: "Get information about an account's karma and badges.",
      image: (config?.url || DEPLOYMENT_URL) + "/karma-agent-logo.png",
    },
  },
});

app.get("/api/swagger", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Bitte Karma API Documentation</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
        <style>
          body {
            background: #1a1a1a;
            color: #ffffff;
          }
          .swagger-ui {
            filter: invert(88%) hue-rotate(180deg);
          }
          .swagger-ui .topbar { 
            display: none;
          }
        </style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/api/ai-plugin',
              dom_id: '#swagger-ui',
              theme: 'dark'
            });
          };
        </script>
      </body>
    </html>
  `);
});

export const GET = handle(app);
export const POST = handle(app);
