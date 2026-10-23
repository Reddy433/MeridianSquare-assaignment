export interface Property {
  id: string;
  name: string;
  location: string;
  pricePerToken: number;
  totalSupply: number;
  availableTokens: number;
  yieldPercent: number;
}

export type KycStatus = 'pending' | 'rejected' | 'approved';

export interface PropertyFilters {
  minYield: string;
  location: string;
}
