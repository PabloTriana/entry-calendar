import type { TFunction } from "i18next";
import * as yup from "yup";

const NAME_MAX_LENGTH = 100;
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

export const DEFAULT_APPOINTMENT_TYPE_COLOR = "#AA3BFF";

export const APPOINTMENT_TYPE_FIELDS = ["name", "color"] as const;

export const buildAppointmentTypeSchema = (t: TFunction) =>
    yup.object({
        name: yup
            .string()
            .trim()
            .required(t("validation.required"))
            .max(NAME_MAX_LENGTH, t("validation.maxLength", { max: NAME_MAX_LENGTH })),
        color: yup
            .string()
            .required(t("validation.required"))
            .matches(HEX_COLOR, t("validation.invalidColor")),
    });

export type AppointmentTypeFormValues = yup.InferType<
    ReturnType<typeof buildAppointmentTypeSchema>
>;
