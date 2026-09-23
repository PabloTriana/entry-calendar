import { useMemo, type ReactElement } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type UseFormSetError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FormErrorSummary } from "../../../components/FormErrorSummary";
import { FormField } from "../../../components/FormField";
import { useAppointmentTypesList } from "../../../hooks/useAppointmentTypes";
import { buildAppointmentSchema, type AppointmentFormValues } from "../schemas/appointmentSchema";
import { InterestedPeopleFields } from "./InterestedPeopleFields";

interface AppointmentFormProps {
  readonly defaultValues: AppointmentFormValues;
  readonly isSubmitting: boolean;
  readonly onSubmit: (
    values: AppointmentFormValues,
    setError: UseFormSetError<AppointmentFormValues>,
  ) => void;
  readonly onDelete?: () => void;
}

export const AppointmentForm = ({
  defaultValues,
  isSubmitting,
  onSubmit,
  onDelete,
}: AppointmentFormProps): ReactElement => {
  const { t } = useTranslation();
  const schema = useMemo(() => buildAppointmentSchema(t), [t]);
  const { data: appointmentTypes } = useAppointmentTypesList();

  const {
    register,
    control,
    handleSubmit,
    setError,
    trigger,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const startsAtField = register("starts_at");

  return (
    <form
      onSubmit={(event) => void handleSubmit((values) => onSubmit(values, setError))(event)}
      className="grid max-w-2xl gap-5 sm:grid-cols-2"
    >
      <FormErrorSummary message={errors.root?.server?.message} />

      <FormField
        label={t("appointments.fields.description")}
        error={errors.description?.message}
        span="full"
      >
        {(control_) => (
          <input type="text" autoComplete="off" {...control_} {...register("description")} />
        )}
      </FormField>

      <FormField
        label={t("appointments.fields.appointmentType")}
        error={errors.appointment_type_id?.message}
      >
        {(control_) => (
          <select {...control_} {...register("appointment_type_id")}>
            <option value="">{t("appointments.fields.appointmentTypePlaceholder")}</option>
            {appointmentTypes?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        )}
      </FormField>

      <FormField label={t("appointments.fields.location")} error={errors.location?.message}>
        {(control_) => (
          <input type="text" autoComplete="off" {...control_} {...register("location")} />
        )}
      </FormField>

      <FormField label={t("appointments.fields.startsAt")} error={errors.starts_at?.message}>
        {(control_) => (
          <input
            type="datetime-local"
            {...control_}
            {...startsAtField}
            onChange={(event) => {
              void startsAtField.onChange(event);
              void trigger("ends_at");
            }}
          />
        )}
      </FormField>

      <FormField label={t("appointments.fields.endsAt")} error={errors.ends_at?.message}>
        {(control_) => <input type="datetime-local" {...control_} {...register("ends_at")} />}
      </FormField>

      <FormField label={t("appointments.fields.notes")} error={errors.notes?.message} span="full">
        {(control_) => <textarea rows={4} {...control_} {...register("notes")} />}
      </FormField>

      <InterestedPeopleFields control={control} register={register} />

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5 sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-control border border-ink bg-ink px-4 py-2.5 text-sm font-medium text-inverse transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? t("common.saving") : t("common.save")}
        </button>
        <Link to="/" className="px-2 py-2.5 text-sm text-muted no-underline hover:text-ink">
          {t("common.cancel")}
        </Link>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="ml-auto min-h-11 rounded-control border border-line-strong px-4 text-sm text-muted transition-colors duration-150 hover:border-ink hover:text-ink"
          >
            {t("common.delete")}
          </button>
        )}
      </div>
    </form>
  );
};
