import { z } from "zod";

export const BadgeSchema = z.object({
  name: z.string(),
  description: z.string(),
  contractId: z.string().optional(),
  minBalance: z.number().optional(),
  karma: z.number(),
});

export const KarmaResponseSchema = z.object({
  accountId: z.string(),
  badges: z.array(BadgeSchema),
  karma: z.number(),
});

export type Badge = z.infer<typeof BadgeSchema>;
export type KarmaResponse = z.infer<typeof KarmaResponseSchema>;
