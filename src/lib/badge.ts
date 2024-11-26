export interface Badge {
  name: string;
  description: string;
  contractId?: string;
  minBalance?: number; // min token or social activities balance that qualifies for the badge
  // icon?: string; // not currently supported by Bitte Agents
  karma: number;
}

export type BadgeFactory = (userId: string) => Badge[];
