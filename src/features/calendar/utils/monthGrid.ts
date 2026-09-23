import {
    addDays,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isAfter,
    isBefore,
    isSameMonth,
    isToday,
    isValid,
    max,
    min,
    parse,
    parseISO,
    startOfDay,
    startOfMonth,
    startOfWeek,
    type Day,
} from "date-fns";
import { compareByStartsAt, type DateLocale } from "../../../lib/date";
import type { Appointment } from "../../../types";

const WEEK_STARTS_ON: Day = 1;
const DAYS_PER_WEEK = 7;
const DATE_KEY_FORMAT = "yyyy-MM-dd";
const MONTH_PARAM_FORMAT = "yyyy-MM";
const MONTH_PARAM_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export interface CalendarDay {
    readonly key: string;
    readonly date: Date;
    readonly isCurrentMonth: boolean;
    readonly isToday: boolean;
    readonly appointments: readonly Appointment[];
}

export type CalendarWeek = readonly CalendarDay[];

export interface WeekdayLabel {
    readonly narrow: string;
    readonly short: string;
    readonly long: string;
}

interface DateRange {
    readonly start: Date;
    readonly end: Date;
}

export const toDateKey = (date: Date): string => format(date, DATE_KEY_FORMAT);

export const toMonthParam = (month: Date): string => format(month, MONTH_PARAM_FORMAT);

export const parseMonthParam = (value: string | null): Date => {
    if (!value || !MONTH_PARAM_PATTERN.test(value)) {
        return startOfMonth(new Date());
    }
    return parse(value, MONTH_PARAM_FORMAT, new Date());
};

export const getWeekdayLabels = (locale: DateLocale): readonly WeekdayLabel[] => {
    const firstDay = startOfWeek(new Date(), { weekStartsOn: WEEK_STARTS_ON });
    return Array.from({ length: DAYS_PER_WEEK }, (_, index) => {
        const day = addDays(firstDay, index);
        return {
            narrow: format(day, "EEEEE", { locale }),
            short: format(day, "EEE", { locale }),
            long: format(day, "EEEE", { locale }),
        };
    });
};

const getGridRange = (month: Date): DateRange => ({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: WEEK_STARTS_ON }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: WEEK_STARTS_ON }),
});

const getVisibleDays = (appointment: Appointment, range: DateRange): readonly Date[] => {
    const start = parseISO(appointment.starts_at);
    if (!isValid(start)) {
        return [];
    }

    const parsedEnd = parseISO(appointment.ends_at);
    const end = isValid(parsedEnd) && !isBefore(parsedEnd, start) ? parsedEnd : start;

    if (isAfter(start, range.end) || isBefore(end, range.start)) {
        return [];
    }

    return eachDayOfInterval({
        start: startOfDay(max([start, range.start])),
        end: min([end, range.end]),
    });
};

const groupByDayKey = (
    appointments: readonly Appointment[],
    range: DateRange,
): ReadonlyMap<string, readonly Appointment[]> => {
    const groups = new Map<string, readonly Appointment[]>();

    [...appointments].sort(compareByStartsAt).forEach((appointment) => {
        getVisibleDays(appointment, range).forEach((day) => {
            const key = toDateKey(day);
            groups.set(key, [...(groups.get(key) ?? []), appointment]);
        });
    });

    return groups;
};

const chunkIntoWeeks = (days: readonly CalendarDay[]): readonly CalendarWeek[] =>
    Array.from({ length: Math.ceil(days.length / DAYS_PER_WEEK) }, (_, index) =>
        days.slice(index * DAYS_PER_WEEK, (index + 1) * DAYS_PER_WEEK),
    );

export const buildMonthGrid = (
    month: Date,
    appointments: readonly Appointment[],
): readonly CalendarWeek[] => {
    const range = getGridRange(month);
    const appointmentsByDay = groupByDayKey(appointments, range);

    const days = eachDayOfInterval(range).map((date): CalendarDay => {
        const key = toDateKey(date);
        return {
            key,
            date,
            isCurrentMonth: isSameMonth(date, month),
            isToday: isToday(date),
            appointments: appointmentsByDay.get(key) ?? [],
        };
    });

    return chunkIntoWeeks(days);
};