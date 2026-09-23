import type { TFunction } from "i18next";
import * as yup from "yup";

const TEXT_MAX_LENGTH = 255;
const PERSON_NAME_MAX_LENGTH = 120;

export const APPOINTMENT_FIELDS = [
    "description",
    "notes",
    "location",
    "appointment_type_id",
    "starts_at",
    "ends_at",
] as const;

export const APPOINTMENT_ERROR_ALIASES = { appointment_type: "appointment_type_id" } as const;

const emptyToNull = (value: unknown, original: unknown): unknown =>
    original === "" ? null : value;

export const buildAppointmentSchema = (t: TFunction) =>
    yup.object({
        description: yup
            .string()
            .trim()
            .required(t("validation.required"))
            .max(TEXT_MAX_LENGTH, t("validation.maxLength", { max: TEXT_MAX_LENGTH })),
        appointment_type_id: yup
            .number()
            .transform((value: number) => (Number.isNaN(value) ? undefined : value))
            .required(t("validation.required")),
        location: yup
            .string()
            .nullable()
            .transform(emptyToNull)
            .max(TEXT_MAX_LENGTH, t("validation.maxLength", { max: TEXT_MAX_LENGTH }))
            .defined(),
        notes: yup.string().nullable().transform(emptyToNull).defined(),
        starts_at: yup.string().required(t("validation.required")),
        ends_at: yup
            .string()
            .required(t("validation.required"))
            .test({
                name: "ends-after-starts",
                message: t("validation.endsBeforeStarts"),
                test: (value, context) => {
                    const startsAt = context.resolve(yup.ref("starts_at")) as string | undefined;
                    if (!value || !startsAt) {
                        return true;
                    }
                    return new Date(value) >= new Date(startsAt);
                },
            }),
        interested_people: yup
            .array()
            .of(
                yup.object({
                    id: yup.number().optional(),
                    _destroy: yup.boolean().default(false),
                    name: yup.string().when("_destroy", {
                        is: true,
                        then: (schema) => schema.defined(),
                        otherwise: (schema) =>
                            schema
                                .trim()
                                .required(t("validation.required"))
                                .max(
                                    PERSON_NAME_MAX_LENGTH,
                                    t("validation.maxLength", { max: PERSON_NAME_MAX_LENGTH }),
                                ),
                    }),
                    email: yup.string().nullable().transform(emptyToNull).defined(),
                }),
            )
            .default([]),
    });

export type AppointmentFormValues = yup.InferType<ReturnType<typeof buildAppointmentSchema>>;
