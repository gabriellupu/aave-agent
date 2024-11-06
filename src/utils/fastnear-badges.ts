import { Badge } from "@/utils/badge";
import { WRAP_NEAR_CONTRACT_ID } from "@ref-finance/ref-sdk";
import Big from "big.js";

export type FastNearAccountData = {
  account_id: string;
  state: {
    balance: string;
    locked: string;
    storage_bytes: number;
  };
  nfts: {
    contract_id: string;
    last_update_block_height: number | null;
  }[];
  tokens: {
    contract_id: string;
    balance: string;
    last_update_block_height: number | null;
  }[];
  pools: {
    pool_id: string;
    last_update_block_height: number | null;
  }[];
};
type FastNeatBadgeFactory = (data: FastNearAccountData) => Badge | undefined;

const allBadges: FastNeatBadgeFactory[] = [
  (data) =>
    data.state.storage_bytes > 1000000
      ? {
          name: "Storage hoarder",
          description: "You have more than 1MB of storage on your account",
        }
      : undefined,
  (data) =>
    data.tokens
      .filter((token) => token.contract_id === WRAP_NEAR_CONTRACT_ID)
      .some((token) => Big(token.balance).gt(0.001))
      ? {
          name: "Wrapper",
          description: "You have wrapped NEAR",
        }
      : undefined,
  // TODO: Add more badges
];

export const getFastNearBadges = async (
  accountId: string
): Promise<Badge[]> => {
  const data = await getFastNearAccountData(accountId);
  return allBadges.map((fn) => fn(data)).filter((badge) => badge !== undefined);
};

async function getFastNearAccountData(
  accountId: string
): Promise<FastNearAccountData> {
  return (await fetch(
    `https://api.fastnear.com/v1/account/${accountId}/full`
  )) as unknown as FastNearAccountData;
}
