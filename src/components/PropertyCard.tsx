import type { Property } from '../types/property';
import { LOW_AVAILABILITY_THRESHOLD, getAvailability } from '../utils/availability';
import { formatCurrency, formatNumber } from '../utils/format';

export interface PropertyCardProps {
  property: Property;
  onView: (propertyId: string) => void;
  currency?: string;
  lowAvailabilityThreshold?: number;
}

export function PropertyCard({
  property,
  onView,
  currency = 'AED',
  lowAvailabilityThreshold = LOW_AVAILABILITY_THRESHOLD,
}: PropertyCardProps) {
  const { id, name, location, pricePerToken, totalSupply, availableTokens, yieldPercent } = property;
  const { percentRemaining, isLow } = getAvailability(
    availableTokens,
    totalSupply,
    lowAvailabilityThreshold,
  );
  const roundedRemaining = Math.floor(percentRemaining);
  const remainingLabel =
    percentRemaining > 0 && roundedRemaining === 0 ? '<1% remaining' : `${roundedRemaining}% remaining`;

  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h2 className="h5 card-title mb-1">{name}</h2>
          {isLow && <span className="badge text-bg-danger flex-shrink-0">Low availability</span>}
        </div>
        <p className="text-body-secondary mb-3">{location}</p>

        <dl className="row mb-3 gy-1">
          <dt className="col-7 fw-normal text-body-secondary">Price per token</dt>
          <dd className="col-5 text-end fw-semibold mb-0">{formatCurrency(pricePerToken, currency)}</dd>
          <dt className="col-7 fw-normal text-body-secondary">Total supply</dt>
          <dd className="col-5 text-end fw-semibold mb-0">{formatNumber(totalSupply)}</dd>
          <dt className="col-7 fw-normal text-body-secondary">Expected yield</dt>
          <dd className="col-5 text-end fw-semibold mb-0">{yieldPercent.toFixed(1)}%</dd>
          <dt className="col-7 fw-normal text-body-secondary">Available tokens</dt>
          <dd className={`col-5 text-end fw-semibold mb-0 ${isLow ? 'text-danger' : ''}`}>
            {formatNumber(availableTokens)}
          </dd>
        </dl>

        <div className="mb-3">
          <div
            className="progress"
            role="progressbar"
            aria-label={`Tokens available for ${name}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={roundedRemaining}
          >
            <div
              className={`progress-bar ${isLow ? 'bg-danger' : 'bg-primary'}`}
              style={{ width: `${percentRemaining}%` }}
            />
          </div>
          <small className={isLow ? 'text-danger' : 'text-body-secondary'}>{remainingLabel}</small>
        </div>

        <button type="button" className="btn btn-primary mt-auto" onClick={() => onView(id)}>
          View Property
        </button>
      </div>
    </article>
  );
}
