import { describe, expect, it } from 'vitest';
import type { Property } from '../types/property';
import { getAvailability } from './availability';
import { filterProperties, getLocations } from './filterProperties';

const base: Property = {
  id: 'x',
  name: 'X',
  location: 'A',
  pricePerToken: 1,
  totalSupply: 100,
  availableTokens: 50,
  yieldPercent: 5,
};

describe('getAvailability', () => {
  it('flags below 20% remaining', () => {
    expect(getAvailability(19, 100).isLow).toBe(true);
    expect(getAvailability(20, 100).isLow).toBe(false);
    expect(getAvailability(180, 1000).isLow).toBe(true);
    expect(getAvailability(498, 500).isLow).toBe(false);
  });

  it('handles zero supply', () => {
    expect(getAvailability(0, 0).isLow).toBe(true);
  });
});

describe('filterProperties', () => {
  const list: Property[] = [
    { ...base, id: '1', location: 'A', yieldPercent: 7.2 },
    { ...base, id: '2', location: 'B', yieldPercent: 6.1 },
    { ...base, id: '3', location: 'A', yieldPercent: 8.4 },
  ];

  it('returns everything for empty filters', () => {
    expect(filterProperties(list, { minYield: '', location: '' })).toHaveLength(3);
  });

  it('filters by minimum yield and location together', () => {
    const result = filterProperties(list, { minYield: '7', location: 'A' });
    expect(result.map((p) => p.id)).toEqual(['1', '3']);
  });

  it('ignores a non-numeric yield', () => {
    expect(filterProperties(list, { minYield: 'abc', location: '' })).toHaveLength(3);
  });

  it('lists unique sorted locations', () => {
    expect(getLocations(list)).toEqual(['A', 'B']);
  });
});
