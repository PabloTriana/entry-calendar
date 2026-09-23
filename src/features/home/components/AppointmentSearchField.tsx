import { SearchIcon } from "lucide-react";
import { useId, type ReactElement } from "react";
import { useTranslation } from "react-i18next";

interface AppointmentSearchFieldProps {
  readonly query: string;
  readonly onQueryChange: (query: string) => void;
  readonly isSearching: boolean;
  readonly resultCount: number;
}

export const AppointmentSearchField = ({
  query,
  onQueryChange,
  isSearching,
  resultCount,
}: AppointmentSearchFieldProps): ReactElement => {
  const { t } = useTranslation();
  const inputId = useId();
  const countId = useId();

  return (
    <search className="mb-6 grid gap-2">
      <label htmlFor={inputId} className="sr-only">
        {t("home.search.label")}
      </label>

      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-0 flex-1">
          <SearchIcon
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            placeholder={t("home.search.placeholder")}
            aria-describedby={countId}
            onChange={(event) => onQueryChange(event.target.value)}
            className="min-h-11 w-full rounded-control border border-line-strong bg-canvas py-2 pl-9 pr-3 text-sm text-ink transition-colors duration-150 placeholder:text-muted focus:border-ink"
          />
        </div>

        {isSearching && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="min-h-11 rounded-control border border-line-strong px-4 text-sm text-muted transition-colors duration-150 hover:bg-sunken hover:text-ink"
          >
            {t("home.search.clear")}
          </button>
        )}
      </div>

      <p id={countId} role="status" className="min-h-5 text-xs text-muted">
        {isSearching ? t("home.search.results", { count: resultCount }) : ""}
      </p>
    </search>
  );
};
