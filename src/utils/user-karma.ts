import { Badge } from "./badge";
import { getFastNearBadges } from "./fastnear-badges";

export interface KarmaResponse {
  account_id: string;
  badges: Badge[];
  karma: number;
}

export const getUserKarma = async (
  accountId: string
): Promise<KarmaResponse> => {
  const badges = await getFastNearBadges(accountId);
  const karma = badges.reduce((total, badge) => total + badge.karma, 0);

  return {
    account_id: accountId,
    badges,
    karma,
  };
};
