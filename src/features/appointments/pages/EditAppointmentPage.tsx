import { useId, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../components/PageHeader";
import { useNavigate, useParams } from "react-router";
import { PageStatus } from "../../../components/PageStatus";
import {
  useAppointmentsDelete,
  useAppointmentsDetail,
  useAppointmentsUpdate,
} from "../../../hooks/useAppointments";
import { applyApiErrors } from "../../../lib/formErrors";
import { AppointmentForm } from "../components/AppointmentForm";
import { APPOINTMENT_ERROR_ALIASES, APPOINTMENT_FIELDS } from "../schemas/appointmentSchema";
import { toAppointmentInput, toFormValues } from "../utils/appointmentFormValues";

export const EditAppointmentPage = (): ReactElement => {
  const titleId = useId();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const id = Number(params.id);
  const { data, isLoading, error } = useAppointmentsDetail(Number.isNaN(id) ? undefined : id);
  const { mutate: update, isPending } = useAppointmentsUpdate();
  const { mutate: remove } = useAppointmentsDelete();

  const handleDelete = (): void => {
    if (!window.confirm(t("appointments.deleteConfirm"))) {
      return;
    }
    remove(id, { onSuccess: () => void navigate("/") });
  };

  return (
    <section aria-labelledby={titleId}>
      <PageHeader titleId={titleId} title={t("appointments.edit")} />

      <PageStatus isLoading={isLoading} error={error}>
        {data && (
          <AppointmentForm
            defaultValues={toFormValues(data)}
            isSubmitting={isPending}
            onDelete={handleDelete}
            onSubmit={(values, setError) =>
              update(
                { id, input: toAppointmentInput(values) },
                {
                  onSuccess: () => void navigate("/"),
                  onError: (mutationError) =>
                    applyApiErrors(
                      mutationError,
                      setError,
                      APPOINTMENT_ERROR_ALIASES,
                      APPOINTMENT_FIELDS,
                    ),
                },
              )
            }
          />
        )}
      </PageStatus>
    </section>
  );
};
