export interface Badge {
  name: string;
  description: string;
  contractId?: string;
  minBalance?: number; // min ft balance that qualifies for
  // icon?: string; // not currently supported by Bitte Agents
  karma: number;
}

export type BadgeFactory = (userId: string) => Badge[];
