import { useId, useMemo, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../components/PageHeader";
import { useNavigate, useSearchParams } from "react-router";
import { useAppointmentsCreate } from "../../../hooks/useAppointments";
import { applyApiErrors } from "../../../lib/formErrors";
import { AppointmentForm } from "../components/AppointmentForm";
import {
  APPOINTMENT_ERROR_ALIASES,
  APPOINTMENT_FIELDS,
} from "../schemas/appointmentSchema";
import { buildDefaultValues, toAppointmentInput } from "../utils/appointmentFormValues";

export const NewAppointmentPage = (): ReactElement => {
  const titleId = useId();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutate, isPending } = useAppointmentsCreate();

  const dateParam = searchParams.get("date");
  const defaultValues = useMemo(() => buildDefaultValues(dateParam), [dateParam]);

  return (
    <section aria-labelledby={titleId}>
      <PageHeader titleId={titleId} title={t("appointments.new")} />

      <AppointmentForm
        defaultValues={defaultValues}
        isSubmitting={isPending}
        onSubmit={(values, setError) =>
          mutate(toAppointmentInput(values), {
            onSuccess: () => void navigate("/"),
            onError: (error) =>
              applyApiErrors(error, setError, APPOINTMENT_ERROR_ALIASES, APPOINTMENT_FIELDS),
          })
        }
      />
    </section>
  );
};
