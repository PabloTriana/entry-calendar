import type { ReactElement, ReactNode } from "react";

interface EmptyStateProps {
  readonly title: string;
  readonly body: string;
  readonly action?: ReactNode;
}

export const EmptyState = ({ title, body, action }: EmptyStateProps): ReactElement => (
  <div className="grid justify-items-center gap-2 rounded-card border border-line-strong bg-surface px-6 py-16 text-center">
    <p className="text-sm font-semibold text-ink">{title}</p>
    <p className="max-w-sm text-xs text-muted">{body}</p>
    {action && <div className="mt-3">{action}</div>}
  </div>
);
