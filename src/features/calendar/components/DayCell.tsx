import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import type { AppointmentTypeMap } from "../../../hooks/useAppointmentTypeMap";
import { useDateFormat } from "../../../hooks/useDateFormat";
import type { CalendarDay } from "../utils/monthGrid";
import { EventBadge } from "./EventBadge";

const MAX_VISIBLE_EVENTS = 3;

interface DayCellProps {
  readonly day: CalendarDay;
  readonly isSelected: boolean;
  readonly onSelect: (dayKey: string) => void;
  readonly appointmentTypes: AppointmentTypeMap;
}

export const DayCell = ({
  day,
  isSelected,
  onSelect,
  appointmentTypes,
}: DayCellProps): ReactElement => {
  const { t } = useTranslation();
  const { dayNumber, dayLabel } = useDateFormat();

  const visibleAppointments = day.appointments.slice(0, MAX_VISIBLE_EVENTS);
  const hiddenCount = day.appointments.length - visibleAppointments.length;

  const summary =
    day.appointments.length === 0
      ? t("calendar.dayCell.none")
      : t("calendar.dayCell.appointments", { count: day.appointments.length });

  return (
    <td
      className={`h-16 border-b border-r border-line p-0 align-top last:border-r-0 sm:h-28 ${
        day.isCurrentMonth ? "bg-canvas" : "bg-surface"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(day.key)}
        aria-pressed={isSelected}
        aria-current={day.isToday ? "date" : undefined}
        aria-label={`${dayLabel(day.date)}, ${summary}`}
        className={`flex h-full w-full flex-col gap-1 px-1 pt-1 text-left transition-colors duration-150 hover:bg-sunken sm:px-2 sm:pt-2 ${
          isSelected ? "bg-sunken ring-1 ring-inset ring-ink" : ""
        }`}
      >
        <time
          dateTime={day.key}
          className={`flex size-6 items-center justify-center rounded-full text-xs sm:text-sm ${
            day.isToday ? "bg-ink font-medium text-inverse" : ""
          } ${day.isCurrentMonth ? "text-ink" : "text-muted"}`}
        >
          {dayNumber(day.date)}
        </time>

        {visibleAppointments.length > 0 && (
          <ul
            aria-hidden="true"
            className="flex flex-wrap justify-start gap-1 sm:grid sm:gap-0.5"
          >
            {visibleAppointments.map((appointment) => (
              <EventBadge
                key={appointment.id}
                appointment={appointment}
                appointmentType={appointmentTypes.get(appointment.appointment_type_id)}
              />
            ))}
          </ul>
        )}

        {hiddenCount > 0 && (
          <span aria-hidden="true" className="hidden text-[0.6875rem] text-muted sm:block">
            {t("calendar.dayCell.more", { count: hiddenCount })}
          </span>
        )}
      </button>
    </td>
  );
};
