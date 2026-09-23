import { useId, useState, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { EmptyState } from "../../../components/EmptyState";
import { FormErrorSummary } from "../../../components/FormErrorSummary";
import { PageHeader } from "../../../components/PageHeader";
import { PageStatus } from "../../../components/PageStatus";
import { useApiErrorMessage } from "../../../hooks/useApiErrorMessage";
import {
  useAppointmentTypesDelete,
  useAppointmentTypesList,
} from "../../../hooks/useAppointmentTypes";
import { cssVars } from "../../../lib/cssVars";
import { DEFAULT_APPOINTMENT_TYPE_COLOR } from "../schemas/appointmentTypeSchema";

export const AppointmentTypesPage = (): ReactElement => {
  const titleId = useId();
  const { t } = useTranslation();
  const toMessage = useApiErrorMessage();
  const [deleteError, setDeleteError] = useState<string>();

  const { data, isLoading, error, refetch } = useAppointmentTypesList();
  const { mutate: remove } = useAppointmentTypesDelete();

  const handleDelete = (id: number): void => {
    if (!window.confirm(t("appointmentTypes.deleteConfirm"))) {
      return;
    }

    setDeleteError(undefined);
    remove(id, {
      onError: (mutationError) => {
        const reason = mutationError.validationErrors?.base?.join(" ");
        setDeleteError(reason ?? toMessage(mutationError));
      },
    });
  };

  return (
    <section aria-labelledby={titleId}>
      <PageHeader
        titleId={titleId}
        title={t("appointmentTypes.title")}
        meta={t("appointmentTypes.meta", { count: data?.length ?? 0 })}
        actions={
          <Link
            to="/appointment-types/new"
            className="rounded-control border border-ink bg-ink px-4 py-2.5 text-sm font-medium text-inverse no-underline transition-opacity duration-150 hover:opacity-90"
          >
            {t("appointmentTypes.new")}
          </Link>
        }
      />

      <div className="mb-6">
        <FormErrorSummary message={deleteError} />
      </div>

      <PageStatus isLoading={isLoading} error={error} onRetry={() => void refetch()}>
        {data?.length === 0 ? (
          <EmptyState
            title={t("appointmentTypes.emptyTitle")}
            body={t("appointmentTypes.emptyBody")}
            action={
              <Link
                to="/appointment-types/new"
                className="rounded-control border border-line-strong bg-canvas px-4 py-2.5 text-sm font-medium text-ink no-underline transition-colors duration-150 hover:bg-sunken"
              >
                {t("appointmentTypes.new")}
              </Link>
            }
          />
        ) : (
          <ul className="grid gap-3">
            {data?.map((type) => (
              <li
                key={type.id}
                style={cssVars({ "--event": type.color ?? DEFAULT_APPOINTMENT_TYPE_COLOR })}
                className="flex flex-wrap items-center gap-4 overflow-hidden rounded-card border border-line-strong border-l-[3px] border-l-event bg-canvas px-4 py-3.5 shadow-control transition-all duration-150 hover:-translate-y-0.5 hover:bg-sunken hover:shadow-control-hover"
              >
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full bg-event ring-1 ring-line"
                />
                <span className="flex-1 text-[0.9375rem] font-semibold tracking-tight text-ink">
                  {type.name}
                </span>
                <span className="flex gap-2">
                  <Link
                    to={`/appointment-types/${type.id}/edit`}
                    className="flex min-h-8 items-center rounded-control border border-line-strong bg-canvas px-2.5 text-sm text-ink no-underline transition-colors duration-150 hover:bg-sunken"
                  >
                    {t("common.edit")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(type.id)}
                    className="min-h-8 rounded-control border border-line-strong px-2.5 text-sm text-muted transition-colors duration-150 hover:border-ink hover:text-ink"
                  >
                    {t("common.delete")}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </PageStatus>
    </section>
  );
};
