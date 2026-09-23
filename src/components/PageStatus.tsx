import type { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { ApiError } from "../api/errors";
import { useApiErrorMessage } from "../hooks/useApiErrorMessage";

interface PageStatusProps {
  readonly isLoading: boolean;
  readonly error: ApiError | null;
  readonly onRetry?: () => void;
  readonly children: ReactNode;
}

export const PageStatus = ({
  isLoading,
  error,
  onRetry,
  children,
}: PageStatusProps): ReactElement => {
  const { t } = useTranslation();
  const toMessage = useApiErrorMessage();

  return (
    <>
      {isLoading && (
        <p role="status" className="py-8 text-sm text-muted">
          {t("common.loading")}
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 flex flex-wrap items-center gap-4 rounded-card border border-ink border-l-2 bg-sunken px-4 py-3 text-sm text-ink"
        >
          <p>{toMessage(error)}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="min-h-9 rounded-control border border-line-strong px-3 transition-colors duration-150 hover:bg-canvas"
            >
              {t("common.retry")}
            </button>
          )}
        </div>
      )}

      {children}
    </>
  );
};
