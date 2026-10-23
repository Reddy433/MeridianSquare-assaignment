import type { KycStatus } from '../types/property';

export interface KYCStatusBannerProps {
  status: KycStatus;
}

const bannerConfig: Record<Exclude<KycStatus, 'approved'>, { variant: string; message: string }> = {
  pending: {
    variant: 'warning',
    message: 'Your identity verification is in progress. You can browse but cannot invest yet.',
  },
  rejected: {
    variant: 'danger',
    message: 'Your identity verification was unsuccessful. Please contact support.',
  },
};

export function KYCStatusBanner({ status }: KYCStatusBannerProps) {
  if (status === 'approved') return null;

  const { variant, message } = bannerConfig[status];
  return (
    <div className={`alert alert-${variant} mb-4`} role="alert">
      {message}
    </div>
  );
}
