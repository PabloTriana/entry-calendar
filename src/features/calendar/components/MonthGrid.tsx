import { useMemo, type ReactElement } from "react";
import { useAppointmentTypeMap } from "../../../hooks/useAppointmentTypeMap";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { getWeekdayLabels, type CalendarWeek } from "../utils/monthGrid";
import { DayCell } from "./DayCell";

interface MonthGridProps {
  readonly weeks: readonly CalendarWeek[];
  readonly selectedDayKey: string | null;
  readonly onSelectDay: (dayKey: string) => void;
}

export const MonthGrid = ({ weeks, selectedDayKey, onSelectDay }: MonthGridProps): ReactElement => {
  const { locale } = useDateFormat();
  const appointmentTypes = useAppointmentTypeMap();
  const weekdayLabels = useMemo(() => getWeekdayLabels(locale), [locale]);

  return (
    <table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-card border border-line-strong">
      <thead>
        <tr>
          {weekdayLabels.map((label) => (
            <th
              key={label.long}
              scope="col"
              abbr={label.long}
              className="border-b border-line bg-surface py-2.5 text-xs font-medium text-muted"
            >
              <span className="sm:hidden">{label.narrow}</span>
              <span className="hidden sm:inline">{label.short}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week) => (
          <tr key={week[0]?.key}>
            {week.map((day) => (
              <DayCell
                key={day.key}
                day={day}
                isSelected={day.key === selectedDayKey}
                onSelect={onSelectDay}
                appointmentTypes={appointmentTypes}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
