import { ClockIcon, MapPinIcon } from "lucide-react";
import { useId, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { InterestedPeopleList } from "../../../components/InterestedPeopleList";
import { useAppointmentTypeMap } from "../../../hooks/useAppointmentTypeMap";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { cssVars } from "../../../lib/cssVars";
import type { CalendarDay } from "../utils/monthGrid";

const META_ICON_PROPS = { size: 13, strokeWidth: 1.75, "aria-hidden": true, className: "shrink-0" } as const;

interface DayAppointmentsProps {
  readonly day: CalendarDay;
}

export const DayAppointments = ({ day }: DayAppointmentsProps): ReactElement => {
  const headingId = useId();
  const { t } = useTranslation();
  const { time, dayLabel } = useDateFormat();
  const appointmentTypes = useAppointmentTypeMap();

  return (
    <section
      aria-labelledby={headingId}
      aria-live="polite"
      className="mt-8 grid justify-items-start gap-4"
    >
      <h2 id={headingId} className="text-lg font-semibold text-ink first-letter:uppercase">
        {dayLabel(day.date)}
      </h2>

      {day.appointments.length === 0 ? (
        <p className="text-sm text-muted">{t("calendar.day.empty")}</p>
      ) : (
        <ul className="grid w-full gap-3">
          {day.appointments.map((appointment) => {
            const color = appointmentTypes.get(appointment.appointment_type_id)?.color;

            return (
              <li
                key={appointment.id}
                style={color ? cssVars({ "--event": color }) : undefined}
                className="grid gap-1.5 overflow-hidden rounded-card border border-line-strong border-l-[3px] border-l-event bg-canvas px-4 py-3.5 shadow-control transition-all duration-150 hover:-translate-y-0.5 hover:bg-sunken hover:shadow-control-hover"
              >
                <Link
                  to={`/appointments/${appointment.id}/edit`}
                  className="flex flex-wrap items-baseline gap-x-3 text-sm text-ink no-underline hover:underline"
                >
                  <time dateTime={appointment.starts_at} className="flex items-center gap-1 text-muted">
                    <ClockIcon {...META_ICON_PROPS} />
                    {time(appointment.starts_at)}
                  </time>
                  <span className="font-medium">{appointment.description}</span>
                </Link>

                {appointment.location && (
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <MapPinIcon {...META_ICON_PROPS} />
                    {appointment.location}
                  </p>
                )}

                <InterestedPeopleList people={appointment.interested_people} />
              </li>
            );
          })}
        </ul>
      )}

      <Link
        to={`/appointments/new?date=${day.key}`}
        className="rounded-control border border-line-strong bg-canvas px-4 py-2.5 text-sm font-medium text-ink no-underline transition-colors duration-150 hover:bg-sunken"
      >
        {t("calendar.day.newAppointment")}
      </Link>
    </section>
  );
};
