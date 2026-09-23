import type { ReactElement } from "react";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { cssVars } from "../../../lib/cssVars";
import type { Appointment, AppointmentType } from "../../../types";

interface EventBadgeProps {
  readonly appointment: Appointment;
  readonly appointmentType: AppointmentType | undefined;
}

export const EventBadge = ({ appointment, appointmentType }: EventBadgeProps): ReactElement => {
  const { time } = useDateFormat();
  const color = appointmentType?.color;

  return (
    <li
      style={color ? cssVars({ "--event": color }) : undefined}
      className="size-1.5 overflow-hidden rounded-full bg-event text-[0] sm:flex sm:size-auto sm:gap-1 sm:truncate sm:rounded-none sm:border-l-2 sm:border-event sm:bg-transparent sm:pl-1.5 sm:text-[0.6875rem] sm:leading-5 sm:text-ink"
    >
      <time dateTime={appointment.starts_at} className="hidden sm:inline sm:text-muted">
        {time(appointment.starts_at)}
      </time>
      <span className="hidden sm:inline sm:truncate">{appointment.description}</span>
    </li>
  );
};
