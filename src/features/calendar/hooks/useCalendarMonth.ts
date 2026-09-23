import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { addMonths, startOfMonth, subMonths } from "date-fns";
import type { ApiError } from "../../../api/errors";
import type { Appointment } from "../../../types";
import { useAppointmentsList } from "../../../hooks/useAppointments";
import {
  buildMonthGrid,
  parseMonthParam,
  toMonthParam,
  type CalendarWeek,
} from "../utils/monthGrid";

const MONTH_SEARCH_PARAM = "month";

const EMPTY_APPOINTMENTS: readonly Appointment[] = [];

export interface CalendarMonthState {
  readonly month: Date;
  readonly weeks: readonly CalendarWeek[];
  readonly isLoading: boolean;
  readonly error: ApiError | null;
  readonly retry: () => void;
  readonly goToPreviousMonth: () => void;
  readonly goToNextMonth: () => void;
  readonly goToCurrentMonth: () => void;
}

export const useCalendarMonth = (): CalendarMonthState => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: appointments = EMPTY_APPOINTMENTS, isLoading, error, refetch } = useAppointmentsList();

  const month = useMemo(
    () => parseMonthParam(searchParams.get(MONTH_SEARCH_PARAM)),
    [searchParams],
  );

  const weeks = useMemo(() => buildMonthGrid(month, appointments), [month, appointments]);

  const setMonth = useCallback(
    (nextMonth: Date): void => {
      setSearchParams((previous) => {
        const params = new URLSearchParams(previous);
        params.set(MONTH_SEARCH_PARAM, toMonthParam(nextMonth));
        return params;
      });
    },
    [setSearchParams],
  );

  return {
    month,
    weeks,
    isLoading,
    error,
    retry: () => void refetch(),
    goToPreviousMonth: () => setMonth(subMonths(month, 1)),
    goToNextMonth: () => setMonth(addMonths(month, 1)),
    goToCurrentMonth: () => setMonth(startOfMonth(new Date())),
  };
};