import { useMemo } from "react";
import { parseISO, startOfToday } from "date-fns";
import type { ApiError } from "../../../api/errors";
import { useAppointmentsList } from "../../../hooks/useAppointments";
import { compareByStartsAt } from "../../../lib/date";
import type { Appointment } from "../../../types";

const EMPTY_APPOINTMENTS: readonly Appointment[] = [];

export interface UpcomingAppointmentsState {
    readonly appointments: readonly Appointment[];
    readonly isLoading: boolean;
    readonly error: ApiError | null;
    readonly retry: () => void;
}

export const useUpcomingAppointments = (): UpcomingAppointmentsState => {
    const { data = EMPTY_APPOINTMENTS, isLoading, error, refetch } = useAppointmentsList();

    const appointments = useMemo(() => {
        const today = startOfToday();

        return [...data]
            .filter((appointment) => parseISO(appointment.ends_at) >= today)
            .sort(compareByStartsAt);
    }, [data]);

    return { appointments, isLoading, error, retry: () => void refetch() };
};
