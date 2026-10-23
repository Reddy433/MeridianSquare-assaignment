import type { Property, PropertyFilters } from '../types/property';

export const ALL_LOCATIONS = '';

export const DEFAULT_FILTERS: PropertyFilters = {
  minYield: '',
  location: ALL_LOCATIONS,
};

export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  const minYield = filters.minYield.trim() === '' ? null : Number(filters.minYield);
  const hasMinYield = minYield !== null && !Number.isNaN(minYield);

  return properties.filter((property) => {
    if (hasMinYield && property.yieldPercent < minYield) return false;
    if (filters.location !== ALL_LOCATIONS && property.location !== filters.location) return false;
    return true;
  });
}

export function getLocations(properties: Property[]): string[] {
  return [...new Set(properties.map((property) => property.location))].sort();
}
