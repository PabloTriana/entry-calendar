import { useMemo, type ReactElement } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type UseFormSetError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FormErrorSummary } from "../../../components/FormErrorSummary";
import { FormField } from "../../../components/FormField";
import {
  buildAppointmentTypeSchema,
  type AppointmentTypeFormValues,
} from "../schemas/appointmentTypeSchema";

interface AppointmentTypeFormProps {
  readonly defaultValues: AppointmentTypeFormValues;
  readonly isSubmitting: boolean;
  readonly onSubmit: (
    values: AppointmentTypeFormValues,
    setError: UseFormSetError<AppointmentTypeFormValues>,
  ) => void;
}

export const AppointmentTypeForm = ({
  defaultValues,
  isSubmitting,
  onSubmit,
}: AppointmentTypeFormProps): ReactElement => {
  const { t } = useTranslation();
  const schema = useMemo(() => buildAppointmentTypeSchema(t), [t]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AppointmentTypeFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={(event) => void handleSubmit((values) => onSubmit(values, setError))(event)}
      className="grid max-w-xl gap-5 sm:grid-cols-2"
    >
      <FormErrorSummary message={errors.root?.server?.message} />

      <FormField label={t("appointmentTypes.fields.name")} error={errors.name?.message}>
        {(control) => <input type="text" autoComplete="off" {...control} {...register("name")} />}
      </FormField>

      <FormField label={t("appointmentTypes.fields.color")} error={errors.color?.message}>
        {(control) => (
          <input
            type="color"
            {...control}
            {...register("color")}
            className="h-11 w-20 cursor-pointer rounded-control border border-line-strong bg-canvas p-0"
          />
        )}
      </FormField>

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5 sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-control border border-ink bg-ink px-4 py-2.5 text-sm font-medium text-inverse transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? t("common.saving") : t("common.save")}
        </button>
        <Link
          to="/appointment-types"
          className="px-2 py-2.5 text-sm text-muted no-underline hover:text-ink"
        >
          {t("common.cancel")}
        </Link>
      </div>
    </form>
  );
};
