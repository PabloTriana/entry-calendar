import { useId, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { EmptyState } from "../../../components/EmptyState";
import { PageHeader } from "../../../components/PageHeader";
import { PageStatus } from "../../../components/PageStatus";
import { AppointmentList } from "../components/AppointmentList";
import { AppointmentSearchField } from "../components/AppointmentSearchField";
import { useAppointmentSearch } from "../hooks/useAppointmentSearch";
import { useUpcomingAppointments } from "../hooks/useUpcomingAppointments";

export const HomePage = (): ReactElement => {
  const titleId = useId();
  const { t } = useTranslation();

  const upcoming = useUpcomingAppointments();
  const search = useAppointmentSearch();

  const appointments = search.isSearching ? search.results : upcoming.appointments;
  const isEmpty = appointments.length === 0 && !upcoming.isLoading;

  return (
    <section aria-labelledby={titleId}>
      <PageHeader
        titleId={titleId}
        title={search.isSearching ? t("home.search.title") : t("home.title")}
        meta={
          search.isSearching
            ? t("home.search.results", { count: search.results.length })
            : t("home.meta", { count: upcoming.appointments.length })
        }
        actions={
          <Link
            to="/appointments/new"
            className="rounded-control border border-ink bg-ink px-4 py-2.5 text-sm font-medium text-inverse no-underline transition-opacity duration-150 hover:opacity-90"
          >
            {t("nav.newAppointment")}
          </Link>
        }
      />

      <AppointmentSearchField
        query={search.query}
        onQueryChange={search.setQuery}
        isSearching={search.isSearching}
        resultCount={search.results.length}
      />

      <PageStatus isLoading={upcoming.isLoading} error={upcoming.error} onRetry={upcoming.retry}>
        {isEmpty ? (
          search.isSearching ? (
            <EmptyState
              title={t("home.search.emptyTitle")}
              body={t("home.search.noResults", { term: search.query })}
            />
          ) : (
            <EmptyState
              title={t("home.emptyTitle")}
              body={t("home.emptyBody")}
              action={
                <Link
                  to="/appointments/new"
                  className="rounded-control border border-line-strong bg-canvas px-4 py-2.5 text-sm font-medium text-ink no-underline transition-colors duration-150 hover:bg-sunken"
                >
                  {t("home.emptyCta")}
                </Link>
              }
            />
          )
        ) : (
          <>
            {search.isSearching && (
              <p className="mb-3 text-xs text-muted">{t("home.search.includesPast")}</p>
            )}
            <AppointmentList appointments={appointments} groupByDay={!search.isSearching} />
          </>
        )}
      </PageStatus>
    </section>
  );
};
