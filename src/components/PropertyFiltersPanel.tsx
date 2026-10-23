import { ALL_LOCATIONS } from '../utils/filterProperties';
import type { PropertyFilters } from '../types/property';

export interface PropertyFiltersPanelProps {
  filters: PropertyFilters;
  locations: string[];
  onChange: (filters: PropertyFilters) => void;
  onReset: () => void;
  disabled?: boolean;
}

export function PropertyFiltersPanel({
  filters,
  locations,
  onChange,
  onReset,
  disabled = false,
}: PropertyFiltersPanelProps) {
  return (
    <form
      className="card card-body mb-4"
      aria-label="Filter properties"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-5">
          <label htmlFor="min-yield" className="form-label">
            Minimum yield (%)
          </label>
          <input
            id="min-yield"
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            className="form-control"
            placeholder="e.g. 7"
            value={filters.minYield}
            disabled={disabled}
            onChange={(event) => onChange({ ...filters, minYield: event.target.value })}
          />
        </div>
        <div className="col-12 col-md-5">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <select
            id="location"
            className="form-select"
            value={filters.location}
            disabled={disabled}
            onChange={(event) => onChange({ ...filters, location: event.target.value })}
          >
            <option value={ALL_LOCATIONS}>All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-2 d-grid">
          <button type="button" className="btn btn-outline-secondary" onClick={onReset} disabled={disabled}>
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}
