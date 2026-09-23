import { useId, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../components/PageHeader";
import { useNavigate } from "react-router";
import { useAppointmentTypesCreate } from "../../../hooks/useAppointmentTypes";
import { applyApiErrors } from "../../../lib/formErrors";
import { AppointmentTypeForm } from "../components/AppointmentTypeForm";
import {
  APPOINTMENT_TYPE_FIELDS,
  DEFAULT_APPOINTMENT_TYPE_COLOR,
} from "../schemas/appointmentTypeSchema";

export const NewAppointmentTypePage = (): ReactElement => {
  const titleId = useId();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useAppointmentTypesCreate();

  return (
    <section aria-labelledby={titleId}>
      <PageHeader titleId={titleId} title={t("appointmentTypes.new")} />

      <AppointmentTypeForm
        defaultValues={{ name: "", color: DEFAULT_APPOINTMENT_TYPE_COLOR }}
        isSubmitting={isPending}
        onSubmit={(values, setError) =>
          mutate(values, {
            onSuccess: () => void navigate("/appointment-types"),
            onError: (error) => applyApiErrors(error, setError, {}, APPOINTMENT_TYPE_FIELDS),
          })
        }
      />
    </section>
  );
};
