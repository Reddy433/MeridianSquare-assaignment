import { useQuery } from '@tanstack/react-query';
import { getProperties, type MockScenario } from '../api/properties';

export const propertyKeys = {
  list: (scenario: MockScenario) => ['properties', scenario] as const,
};

export function useProperties(scenario: MockScenario = 'ok') {
  return useQuery({
    queryKey: propertyKeys.list(scenario),
    queryFn: () => getProperties(scenario),
    staleTime: 60 * 1000,
    retry: 1,
  });
}
