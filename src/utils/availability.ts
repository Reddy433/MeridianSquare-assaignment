export const LOW_AVAILABILITY_THRESHOLD = 0.2;

export interface Availability {
  percentRemaining: number;
  isLow: boolean;
}

export function getAvailability(
  availableTokens: number,
  totalSupply: number,
  threshold: number = LOW_AVAILABILITY_THRESHOLD,
): Availability {
  if (totalSupply <= 0) {
    return { percentRemaining: 0, isLow: true };
  }
  const ratio = Math.min(Math.max(availableTokens / totalSupply, 0), 1);
  return { percentRemaining: ratio * 100, isLow: ratio < threshold };
}
