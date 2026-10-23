import type { Property } from '../types/property';

const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Marina Tower Unit 4B',
    location: 'Dubai Marina',
    pricePerToken: 500,
    totalSupply: 1000,
    availableTokens: 180,
    yieldPercent: 7.2,
  },
  {
    id: '2',
    name: 'Downtown Loft 12A',
    location: 'Downtown Dubai',
    pricePerToken: 750,
    totalSupply: 500,
    availableTokens: 498,
    yieldPercent: 6.1,
  },
  {
    id: '3',
    name: 'JVC Studio Block C',
    location: 'Jumeirah Village Circle',
    pricePerToken: 250,
    totalSupply: 2000,
    availableTokens: 12,
    yieldPercent: 8.4,
  },
];

export type MockScenario = 'ok' | 'empty' | 'error';

const LATENCY_MS = 700;

export function getProperties(scenario: MockScenario = 'ok'): Promise<Property[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (scenario === 'error') {
        reject(new Error('GET /properties failed with status 500'));
        return;
      }
      resolve(scenario === 'empty' ? [] : mockProperties);
    }, LATENCY_MS);
  });
}
