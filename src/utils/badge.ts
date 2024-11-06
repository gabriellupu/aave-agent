export interface Badge {
  name: string;
  description: string;
}

export interface MinBalance extends Badge {
  min_balance: number;
}

export interface NftBadge extends Badge {
  contract_id: string;
}

export interface TokenBadge extends Badge {
  contract_id: string;
  min_balance: number;
}

export type BadgeFactory = (data: any) => Badge | undefined;
