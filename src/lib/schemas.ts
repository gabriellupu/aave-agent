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

export const AaveDailyVolume24hSchema = z.object({
  totalVolumeInUsd: z.number(),
  totalVolumeInEth: z.number(),
  totalBorrowUSD: z.number(),
  totalBorrowETH: z.number(),
  totalRepayETH: z.number(),
  totalRepayUSD: z.number(),
  totalDepositETH: z.number(),
  totalDepositUSD: z.number(),
  totalWithdrawalUSD: z.number(),
  totalWithdrawalETH: z.number(),
  totalStakedETH: z.number(),
  totalStakedUSD: z.number(),
  totalRedeemedUSD: z.number(),
  totalRedeemedETH: z.number(),
  reserves: z.object({
    v1: z.array(
      z.object({
        id: z.string(),
        aToken: z.string(),
        asset: z.string(),
        pool: z.string(),
        symbol: z.string(),
        decimals: z.number(),
        priceInEth: z.string(),
        borrow: z.number(),
        deposit: z.number(),
        repay: z.number(),
        withdrawal: z.number(),
      })
    ),
    v2: z.array(
      z.object({
        id: z.string(),
        aToken: z.string(),
        asset: z.string(),
        pool: z.string(),
        symbol: z.string(),
        decimals: z.number(),
        priceInEth: z.string(),
        borrow: z.number(),
        deposit: z.number(),
        repay: z.number(),
        withdrawal: z.number(),
      })
    ),
    stk: z.array(
      z.object({
        id: z.string(),
        asset: z.string(),
        symbol: z.string(),
        decimals: z.number(),
        priceInEth: z.string(),
        stake: z.number(),
        redeem: z.number(),
      })
    ),
  })

});

// export const AavePositionsResponseSchema = z.object({
//   positions: z.array(AavePositionSchema),
// });



export const AavePlatformInfoResponseSchema = z.object({
  pools: z.array(AavePoolSchema),
  dailyVolume24h: AaveDailyVolume24hSchema.optional(),
});

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

// export type AavePositionsRequestParams = z.infer<typeof AavePositionsRequestParamsSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
// export type Position = z.infer<typeof AavePositionSchema>;
export type Pool = z.infer<typeof AavePoolSchema>;
export type DailyVolume24h = z.infer<typeof AaveDailyVolume24hSchema>;
export type AavePlatformInfoResponse = z.infer<typeof AavePlatformInfoResponseSchema>;