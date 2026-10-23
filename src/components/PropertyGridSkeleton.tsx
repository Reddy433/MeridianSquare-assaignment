const SKELETON_COUNT = 3;

export function PropertyGridSkeleton() {
  return (
    <div className="row g-4" role="status" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading properties…</span>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4">
          <div className="card h-100" aria-hidden="true">
            <div className="card-body placeholder-glow">
              <span className="placeholder col-8 mb-2" />
              <span className="placeholder col-5 mb-4" />
              <span className="placeholder col-12 mb-2" />
              <span className="placeholder col-12 mb-2" />
              <span className="placeholder col-12 mb-4" />
              <span className="placeholder btn btn-primary disabled col-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
