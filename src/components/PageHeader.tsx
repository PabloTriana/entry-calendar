import type { ReactElement, ReactNode } from "react";

interface PageHeaderProps {
  readonly titleId: string;
  readonly title: string;
  readonly meta?: string;
  readonly actions?: ReactNode;
}

export const PageHeader = ({
  titleId,
  title,
  meta,
  actions,
}: PageHeaderProps): ReactElement => (
  <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
    <div className="min-w-0">
      <h1
        id={titleId}
        className="text-3xl font-semibold tracking-tight text-ink first-letter:uppercase"
      >
        {title}
      </h1>
      {meta && <p className="mt-1.5 text-sm text-muted">{meta}</p>}
    </div>

    {actions}
  </header>
);
