import { useMemo, type ReactElement } from "react";
import { isBefore, parseISO } from "date-fns";
import { useAppointmentTypeMap } from "../../../hooks/useAppointmentTypeMap";
import { useDateFormat } from "../../../hooks/useDateFormat";
import type { Appointment } from "../../../types";
import { toDateKey } from "../../calendar/utils/monthGrid";
import { AppointmentSummaryItem } from "./AppointmentSummaryItem";

interface AppointmentListProps {
  readonly appointments: readonly Appointment[];
  readonly groupByDay: boolean;
}

interface DayGroup {
  readonly key: string;
  readonly date: Date;
  readonly appointments: readonly Appointment[];
}

const groupAppointments = (appointments: readonly Appointment[]): readonly DayGroup[] => {
  const groups = new Map<string, Appointment[]>();

  for (const appointment of appointments) {
    const date = parseISO(appointment.starts_at);
    const key = toDateKey(date);
    groups.set(key, [...(groups.get(key) ?? []), appointment]);
  }

  return [...groups].map(([key, items]) => ({
    key,
    date: parseISO(items[0].starts_at),
    appointments: items,
  }));
};

export const AppointmentList = ({
  appointments,
  groupByDay,
}: AppointmentListProps): ReactElement => {
  const appointmentTypes = useAppointmentTypeMap();
  const { dayLabel } = useDateFormat();
  const now = new Date();

  const groups = useMemo(
    () => (groupByDay ? groupAppointments(appointments) : []),
    [appointments, groupByDay],
  );

  const renderItem = (appointment: Appointment): ReactElement => (
    <AppointmentSummaryItem
      key={appointment.id}
      appointment={appointment}
      appointmentType={appointmentTypes.get(appointment.appointment_type_id)}
      isPast={isBefore(parseISO(appointment.ends_at), now)}
    />
  );

  if (!groupByDay) {
    return <ul className="grid gap-2">{appointments.map(renderItem)}</ul>;
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.key}>
          <h2 className="mb-2 text-sm font-semibold text-ink first-letter:uppercase">
            {dayLabel(group.date)}
          </h2>
          <ul className="grid gap-2">{group.appointments.map(renderItem)}</ul>
        </section>
      ))}
    </div>
  );
};
