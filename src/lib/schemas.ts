import { z } from "zod";

// export const AavePositionsRequestParamsSchema = z.object({
//   account: z
//     .string()
//     .describe(
//       "The identifier for the account to get aave positions"
//     ),
// });

// export const AavePositionSchema = z.object({
//   poolId: z.string(),
//   amount: z.string(),
// });

export const AavePoolSchema = z.object({
  liquidity: z.object({
    usd: z.number(),
    eth: z.number(),
    native: z.number(),
  }),
  price: z.object({
    eth: z.number(),
    usd: z.number(),
  }),
  address: z.string(),
  apy: z.number(),
  name: z.string(),
  symbol: z.string(),
  updatedAt: z.string().datetime(),
});

// export const AavePositionsResponseSchema = z.object({
//   positions: z.array(AavePositionSchema),
// });

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const AavePlatformInfoResponseSchema = z.object({
  pools: z.array(AavePoolSchema),
});

// export type AavePositionsRequestParams = z.infer<typeof AavePositionsRequestParamsSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
// export type Position = z.infer<typeof AavePositionSchema>;
export type Pool = z.infer<typeof AavePoolSchema>;
export type AavePlatformInfoResponse = z.infer<typeof AavePlatformInfoResponseSchema>;