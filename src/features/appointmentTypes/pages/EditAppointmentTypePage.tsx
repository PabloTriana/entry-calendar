import { useId, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../../components/PageHeader";
import { useNavigate, useParams } from "react-router";
import { PageStatus } from "../../../components/PageStatus";
import {
  useAppointmentTypesDetail,
  useAppointmentTypesUpdate,
} from "../../../hooks/useAppointmentTypes";
import { applyApiErrors } from "../../../lib/formErrors";
import { AppointmentTypeForm } from "../components/AppointmentTypeForm";
import {
  APPOINTMENT_TYPE_FIELDS,
  DEFAULT_APPOINTMENT_TYPE_COLOR,
} from "../schemas/appointmentTypeSchema";

export const EditAppointmentTypePage = (): ReactElement => {
  const titleId = useId();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const id = Number(params.id);
  const { data, isLoading, error } = useAppointmentTypesDetail(Number.isNaN(id) ? undefined : id);
  const { mutate, isPending } = useAppointmentTypesUpdate();

  return (
    <section aria-labelledby={titleId}>
      <PageHeader titleId={titleId} title={t("appointmentTypes.edit")} />

      <PageStatus isLoading={isLoading} error={error}>
        {data && (
          <AppointmentTypeForm
            defaultValues={{
              name: data.name,
              color: data.color ?? DEFAULT_APPOINTMENT_TYPE_COLOR,
            }}
            isSubmitting={isPending}
            onSubmit={(values, setError) =>
              mutate(
                { id, input: values },
                {
                  onSuccess: () => void navigate("/appointment-types"),
                  onError: (mutationError) =>
                    applyApiErrors(mutationError, setError, {}, APPOINTMENT_TYPE_FIELDS),
                },
              )
            }
          />
        )}
      </PageStatus>
    </section>
  );
};
