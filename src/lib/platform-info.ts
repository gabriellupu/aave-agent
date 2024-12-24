import { Position } from "@/lib/position";
import { Pool } from "@/lib/pool";
import { getAavePools } from "./aave-pools";

export interface AavePlatformInfoResponse {
  pools: Pool[];
}

export const getAavePlatformInfo =
  async (): Promise<AavePlatformInfoResponse> => {
    const platformInfo: AavePlatformInfoResponse = {
      pools: await getAavePools(),
      // ...(await computeSocialBadges(accountId)),
      // ...(await getNearBlocksBadges(accountId)),
    };

    return platformInfo;
  };
