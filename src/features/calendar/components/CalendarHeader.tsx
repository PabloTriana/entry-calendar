import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../components/icons";
import { useDateFormat } from "../../../hooks/useDateFormat";

interface CalendarHeaderProps {
  readonly month: Date;
  readonly titleId: string;
  readonly monthCount: number;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
  readonly onToday: () => void;
}

const BUTTON_CLASS =
  "flex min-h-11 min-w-11 items-center justify-center px-3 text-sm text-muted transition-colors duration-150 hover:bg-sunken hover:text-ink";

export const CalendarHeader = ({
  month,
  titleId,
  monthCount,
  onPrevious,
  onNext,
  onToday,
}: CalendarHeaderProps): ReactElement => {
  const { t } = useTranslation();
  const { monthTitle } = useDateFormat();

  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
      <div className="min-w-0">
        <h1
          id={titleId}
          aria-live="polite"
          className="text-3xl font-semibold tracking-tight text-ink first-letter:uppercase"
        >
          {monthTitle(month)}
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          {t("calendar.meta", { count: monthCount })}
        </p>
      </div>

      <nav
        aria-label={t("calendar.nav.label")}
        className="flex divide-x divide-line overflow-hidden rounded-control border border-line-strong"
      >
        <button
          type="button"
          onClick={onPrevious}
          aria-label={t("calendar.nav.previous")}
          className={BUTTON_CLASS}
        >
          <ChevronLeftIcon />
        </button>
        <button type="button" onClick={onToday} className={BUTTON_CLASS}>
          {t("calendar.nav.today")}
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={t("calendar.nav.next")}
          className={BUTTON_CLASS}
        >
          <ChevronRightIcon />
        </button>
      </nav>
    </header>
  );
};
