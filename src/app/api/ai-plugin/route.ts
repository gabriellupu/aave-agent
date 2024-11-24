import { NextResponse } from "next/server";
import { DEPLOYMENT_URL } from "vercel-url";

const key = JSON.parse(process.env.BITTE_KEY || "{}");
const config = JSON.parse(process.env.BITTE_CONFIG || "{}");

if (!key?.accountId) {
  console.warn("Missing account info.");
}
if (!config || !config.url) {
  console.warn("Missing config or url in config.");
}

export async function GET() {
  const pluginData = {
    openapi: "3.0.0",
    info: {
      title: "Ref Finance API",
      description:
        "API for retrieving token metadata and swapping tokens through Ref Finance.",
      version: "1.0.0",
    },
    servers: [
      {
        url: config?.url || DEPLOYMENT_URL,
      },
    ],
    "x-mb": {
      "account-id": key.accountId || "",
      assistant: {
        name: "Ref Finance Agent",
        description:
          "An assistant that provides token metadata and swaps tokens through Ref Finance.",
        instructions:
          "Get information for a given fungible token or swaps one token for another. Do not modify token identifiers, they will be fuzzy matched automatically.",
        tools: [{ type: "generate-transaction" }],
      },
    },
    paths: {
      "/api/{token}": {
        get: {
          operationId: "get-token-metadata",
          description:
            "Get token metadata from Ref Finance. Token identifiers can be the name, symbol, or contractId and will be fuzzy matched automatically.",
          parameters: [
            {
              name: "token",
              in: "path",
              description: "The identifier for the token to get metadata for.",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      symbol: {
                        type: "string",
                      },
                      decimals: {
                        type: "number",
                      },
                      icon: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  return NextResponse.json(pluginData);
}
