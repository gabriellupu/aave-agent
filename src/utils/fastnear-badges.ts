import { Badge } from "@/utils/badge";
import { WRAP_NEAR_CONTRACT_ID } from "@ref-finance/ref-sdk";
import Big from "big.js";
import { allowlistedTokens, AllowlistedToken } from "./allowlist-tokens";

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
type FastNeatBadgeFactory = (data: FastNearAccountData) => Badge[];

export const getAllowlistedTokenBadges = (
  data: FastNearAccountData
): Badge[] => {
  const badges: Badge[] = [];

  for (const tokenData of data.tokens) {
    const token: AllowlistedToken = allowlistedTokens[tokenData.contract_id];
    badges.push({
      name: `Holder of ${token.symbol}`,
      description: `You hold the token ${token.name} (${token.symbol})`,
      karma: 2,
    });
  }

  return badges;
};

const allBadges: FastNeatBadgeFactory[] = [
  (data) =>
    data.state.storage_bytes > 1000000
      ? [
          {
            name: "Storage hoarder",
            description: "You have more than 1MB of storage on your account",
            karma: 1,
          },
        ]
      : [],
  (data) =>
    data.tokens
      .filter((token) => token.contract_id === WRAP_NEAR_CONTRACT_ID)
      .some((token) => Big(token.balance).gt(0.001))
      ? [
          {
            name: "Wrapper",
            description: "You have wrapped NEAR",
            karma: 1,
          },
        ]
      : [],
  (data) =>
    data.nfts.length > 0
      ? [
          {
            name: "NFT Collector",
            description: "You own at least one NFT",
            karma: getKarmaForNfts(data.nfts),
          },
        ]
      : [],
  getAllowlistedTokenBadges,
  // TODO: Add more badges
];

export const getFastNearBadges = async (
  accountId: string
): Promise<Badge[]> => {
  const data = await getFastNearAccountData(accountId);
  return allBadges.flatMap((fn) => fn(data));
};

async function getFastNearAccountData(
  accountId: string
): Promise<FastNearAccountData> {
  const response = await fetch(
    `https://api.fastnear.com/v1/account/${accountId}/full`
  );
  return (await response.json()) as FastNearAccountData;
}
function getKarmaForNfts(
  nfts: { contract_id: string; last_update_block_height: number | null }[]
): number {
  if (nfts.length > 10) return 3;
  if (nfts.length > 1) return 2;
  if (nfts.length === 1) return 1;
  return 0;
}
