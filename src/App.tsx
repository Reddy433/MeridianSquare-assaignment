import type { MockScenario } from './api/properties';
import { PropertyListingPage } from './pages/PropertyListingPage';
import type { KycStatus } from './types/property';

const KYC_STATUSES: readonly KycStatus[] = ['pending', 'rejected', 'approved'];
const SCENARIOS: readonly MockScenario[] = ['ok', 'empty', 'error'];

function readParam<T extends string>(name: string, allowed: readonly T[], fallback: T): T {
  const value = new URLSearchParams(window.location.search).get(name);
  return allowed.find((option) => option === value) ?? fallback;
}

export function App() {
  const kycStatus = readParam('kyc', KYC_STATUSES, 'pending');
  const scenario = readParam('scenario', SCENARIOS, 'ok');

  return (
    <PropertyListingPage
      kycStatus={kycStatus}
      scenario={scenario}
      onViewProperty={(id) => {
        window.location.hash = `/properties/${id}`;
      }}
    />
  );
}
