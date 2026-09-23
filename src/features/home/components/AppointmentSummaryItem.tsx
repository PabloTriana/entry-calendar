import { ClockIcon, HistoryIcon, MapPinIcon, TagIcon, UsersIcon } from "lucide-react";
import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { cssVars } from "../../../lib/cssVars";
import type { Appointment, AppointmentType } from "../../../types";

const META_ICON_PROPS = { size: 12, strokeWidth: 1.75, "aria-hidden": true, className: "shrink-0" } as const;

interface AppointmentSummaryItemProps {
  readonly appointment: Appointment;
  readonly appointmentType: AppointmentType | undefined;
  readonly isPast: boolean;
}

export const AppointmentSummaryItem = ({
  appointment,
  appointmentType,
  isPast,
}: AppointmentSummaryItemProps): ReactElement => {
  const { t } = useTranslation();
  const { time, dayLabelShort } = useDateFormat();

  const peopleCount = appointment.interested_people.length;
  const color = isPast ? undefined : appointmentType?.color;

  return (
    <li
      style={color ? cssVars({ "--event": color }) : undefined}
      className="overflow-hidden rounded-card border border-line-strong border-l-[3px] border-l-event bg-canvas shadow-control transition-all duration-150 hover:-translate-y-0.5 hover:shadow-control-hover"
    >
      <Link
        to={`/appointments/${appointment.id}/edit`}
        className="grid gap-0.5 px-3.5 py-2.5 no-underline transition-colors duration-150 hover:bg-sunken"
      >
        <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
          <span
            className={`text-sm font-semibold tracking-tight ${isPast ? "text-muted" : "text-ink"}`}
          >
            {appointment.description}
          </span>
          <time
            dateTime={appointment.starts_at}
            className="flex items-center gap-1 text-xs tabular-nums text-muted first-letter:uppercase"
          >
            <ClockIcon {...META_ICON_PROPS} />
            {dayLabelShort(new Date(appointment.starts_at))}, {time(appointment.starts_at)}
          </time>
        </span>

        <span className="grid gap-0.5 text-xs text-muted">
          {appointmentType && (
            <span className={`flex items-center gap-1 ${isPast ? "" : "text-ink"}`}>
              <TagIcon {...META_ICON_PROPS} />
              <span className="text-muted">{t("appointments.fields.appointmentType")}:</span>
              <span className="font-medium">{appointmentType.name}</span>
            </span>
          )}
          {appointment.location && (
            <span className="flex items-center gap-1">
              <MapPinIcon {...META_ICON_PROPS} />
              <span>{t("appointments.fields.location")}:</span>
              <span className="font-medium text-ink">{appointment.location}</span>
            </span>
          )}
          {peopleCount > 0 && (
            <span className="flex items-center gap-1">
              <UsersIcon {...META_ICON_PROPS} />
              <span>{t("appointments.fields.people")}:</span>
              <span className="font-medium text-ink">{peopleCount}</span>
            </span>
          )}
          {isPast && (
            <span className="flex items-center gap-1">
              <HistoryIcon {...META_ICON_PROPS} />
              <span>{t("appointments.fields.status")}:</span>
              <span className="font-medium text-ink">{t("appointments.past")}</span>
            </span>
          )}
        </span>
      </Link>
    </li>
  );
};
