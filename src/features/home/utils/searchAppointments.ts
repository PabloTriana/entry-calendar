import { compareByStartsAt } from "../../../lib/date";
import { matchesQuery, normalizeForSearch } from "../../../lib/text";
import type { Appointment } from "../../../types";

export const searchAppointments = (
    appointments: readonly Appointment[],
    query: string,
): readonly Appointment[] => {
    const normalizedQuery = normalizeForSearch(query.trim());

    if (normalizedQuery === "") {
        return [];
    }

    return appointments
        .filter((appointment) =>
            matchesQuery([appointment.description, appointment.notes], normalizedQuery),
        )
        .sort(compareByStartsAt);
};
