import { useMemo, useState } from 'react';
import type { MockScenario } from '../api/properties';
import { KYCStatusBanner } from '../components/KYCStatusBanner';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyFiltersPanel } from '../components/PropertyFiltersPanel';
import { PropertyGridSkeleton } from '../components/PropertyGridSkeleton';
import { StateMessage } from '../components/StateMessage';
import { useProperties } from '../hooks/useProperties';
import type { KycStatus, PropertyFilters } from '../types/property';
import { DEFAULT_FILTERS, filterProperties, getLocations } from '../utils/filterProperties';

export interface PropertyListingPageProps {
  kycStatus: KycStatus;
  scenario?: MockScenario;
  onViewProperty: (propertyId: string) => void;
}

export function PropertyListingPage({ kycStatus, scenario = 'ok', onViewProperty }: PropertyListingPageProps) {
  const [filters, setFilters] = useState<PropertyFilters>(DEFAULT_FILTERS);
  const { data, isPending, isError, error, refetch, isFetching } = useProperties(scenario);

  const locations = useMemo(() => getLocations(data ?? []), [data]);
  const visible = useMemo(() => filterProperties(data ?? [], filters), [data, filters]);
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <main className="container py-4">
      <KYCStatusBanner status={kycStatus} />

      <h1 className="h3 mb-3">Investment properties</h1>

      <PropertyFiltersPanel
        filters={filters}
        locations={locations}
        onChange={setFilters}
        onReset={resetFilters}
        disabled={isPending || isError}
      />

      {isPending && <PropertyGridSkeleton />}

      {isError && (
        <StateMessage
          variant="danger"
          title="We couldn't load properties"
          actionLabel={isFetching ? 'Retrying…' : 'Try again'}
          onAction={() => void refetch()}
        >
          {error.message}
        </StateMessage>
      )}

      {data && data.length === 0 && (
        <StateMessage variant="secondary" title="No properties available yet">
          New listings will appear here as soon as they are published.
        </StateMessage>
      )}

      {data && data.length > 0 && visible.length === 0 && (
        <StateMessage
          variant="secondary"
          title="No properties match your filters"
          actionLabel="Reset filters"
          onAction={resetFilters}
        >
          Try lowering the minimum yield or choosing another location.
        </StateMessage>
      )}

      {visible.length > 0 && (
        <>
          <p className="text-body-secondary" aria-live="polite">
            Showing {visible.length} of {data?.length ?? 0} properties
          </p>
          <div className="row g-4">
            {visible.map((property) => (
              <div key={property.id} className="col-12 col-md-6 col-lg-4">
                <PropertyCard property={property} onView={onViewProperty} />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
