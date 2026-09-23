import { useId, useMemo, useState, type ReactElement } from "react";
import { PageStatus } from "../../../components/PageStatus";
import { CalendarHeader } from "../components/CalendarHeader";
import { DayAppointments } from "../components/DayAppointments";
import { MonthGrid } from "../components/MonthGrid";
import { useCalendarMonth } from "../hooks/useCalendarMonth";

export const CalendarPage = (): ReactElement => {
  const titleId = useId();
  const calendar = useCalendarMonth();
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);

  const days = useMemo(() => calendar.weeks.flat(), [calendar.weeks]);
  const selectedDay = days.find((day) => day.key === selectedDayKey) ?? null;

  const monthCount = useMemo(
    () =>
      days
        .filter((day) => day.isCurrentMonth)
        .reduce((total, day) => total + day.appointments.length, 0),
    [days],
  );

  return (
    <section aria-labelledby={titleId}>
      <CalendarHeader
        month={calendar.month}
        titleId={titleId}
        monthCount={monthCount}
        onPrevious={calendar.goToPreviousMonth}
        onNext={calendar.goToNextMonth}
        onToday={calendar.goToCurrentMonth}
      />

      <PageStatus isLoading={calendar.isLoading} error={calendar.error} onRetry={calendar.retry}>
        <MonthGrid
          weeks={calendar.weeks}
          selectedDayKey={selectedDayKey}
          onSelectDay={setSelectedDayKey}
        />

        {selectedDay && <DayAppointments day={selectedDay} />}
      </PageStatus>
    </section>
  );
};
