import { addHours, format, parse, startOfDay } from "date-fns";
import { fromDateTimeLocalValue, toDateTimeLocalValue } from "../../../lib/date";
import type { Appointment, AppointmentInput } from "../../../types";
import type { AppointmentFormValues } from "../schemas/appointmentSchema";

const DATE_PARAM_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DATE_KEY_FORMAT = "yyyy-MM-dd";
const DATE_TIME_LOCAL_FORMAT = "yyyy-MM-dd'T'HH:mm";
const DEFAULT_START_HOUR = 9;
const DEFAULT_DURATION_HOURS = 1;

export const buildDefaultValues = (dateParam: string | null): AppointmentFormValues => {
    const day =
        dateParam && DATE_PARAM_PATTERN.test(dateParam)
            ? parse(dateParam, DATE_KEY_FORMAT, new Date())
            : new Date();

    const startsAt = addHours(startOfDay(day), DEFAULT_START_HOUR);

    return {
        description: "",
        appointment_type_id: Number.NaN,
        location: null,
        notes: null,
        starts_at: format(startsAt, DATE_TIME_LOCAL_FORMAT),
        ends_at: format(addHours(startsAt, DEFAULT_DURATION_HOURS), DATE_TIME_LOCAL_FORMAT),
        interested_people: [],
    };
};

export const toFormValues = (appointment: Appointment): AppointmentFormValues => ({
    description: appointment.description,
    appointment_type_id: appointment.appointment_type_id,
    location: appointment.location,
    notes: appointment.notes,
    starts_at: toDateTimeLocalValue(appointment.starts_at),
    ends_at: toDateTimeLocalValue(appointment.ends_at),
    interested_people: appointment.interested_people.map((person) => ({
        id: person.id,
        name: person.name,
        email: person.email,
        _destroy: false,
    })),
});

export const toAppointmentInput = (values: AppointmentFormValues): AppointmentInput => ({
    description: values.description,
    appointment_type_id: values.appointment_type_id,
    location: values.location,
    notes: values.notes,
    starts_at: fromDateTimeLocalValue(values.starts_at),
    ends_at: fromDateTimeLocalValue(values.ends_at),
    interested_people_attributes: values.interested_people
        .filter((person) => person.id !== undefined || !person._destroy)
        .map((person) => ({
            id: person.id,
            name: person.name ?? "",
            email: person.email,
            _destroy: person._destroy,
        })),
});
