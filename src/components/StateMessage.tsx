import type { ReactNode } from 'react';

export interface StateMessageProps {
  variant: 'danger' | 'secondary';
  title: string;
  children?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function StateMessage({ variant, title, children, actionLabel, onAction }: StateMessageProps) {
  return (
    <div className={`alert alert-${variant} text-center py-5`} role={variant === 'danger' ? 'alert' : 'status'}>
      <h2 className="h5">{title}</h2>
      {children && <p className="mb-3">{children}</p>}
      {actionLabel && onAction && (
        <button type="button" className={`btn btn-outline-${variant}`} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
