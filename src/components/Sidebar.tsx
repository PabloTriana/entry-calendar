import { CalendarIcon, CalendarPlusIcon, HomeIcon, TagPlusIcon, TagsIcon } from "lucide-react";
import type { ReactElement, Ref } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Tooltip } from "./Tooltip";

interface SidebarProps {
  readonly navId: string;
  readonly isOpen: boolean;
  readonly isCollapsed: boolean;
  readonly onToggleCollapse: () => void;
  readonly firstLinkRef: Ref<HTMLAnchorElement>;
}

const linkClass = ({ isActive }: { isActive: boolean }): string =>
  [
    "relative flex min-h-11 items-center gap-2.5 rounded-control px-3 text-sm no-underline transition-colors duration-150",
    isActive
      ? "bg-sunken font-semibold text-ink before:absolute before:inset-y-2 before:-left-1 before:w-0.5 before:bg-ink"
      : "font-normal text-muted hover:bg-sunken/60 hover:text-ink",
  ].join(" ");

const NAV_ICON_PROPS = { size: 18, strokeWidth: 1.5, "aria-hidden": true, className: "shrink-0" } as const;

export const Sidebar = ({
  navId,
  isOpen,
  isCollapsed,
  onToggleCollapse,
  firstLinkRef,
}: SidebarProps): ReactElement => {
  const { t } = useTranslation();

  const labelClass = isCollapsed ? "lg:sr-only" : "";

  return (
    <aside
      id={navId}
      data-open={isOpen}
      data-collapsed={isCollapsed}
      className="group fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] -translate-x-full flex-col gap-7 overflow-y-auto border-r border-line-strong bg-surface px-4 py-6 transition-transform duration-200 data-[open=true]:translate-x-0 motion-reduce:transition-none lg:sticky lg:top-0 lg:h-svh lg:w-full lg:translate-x-0 lg:transition-[width] lg:data-[collapsed=true]:w-[4.5rem] lg:data-[collapsed=true]:px-2"
    >
      <div className="-mx-4 flex items-center justify-between gap-2.5 border-b border-line px-7 pb-5 lg:group-data-[collapsed=true]:mx-0 lg:group-data-[collapsed=true]:flex-col lg:group-data-[collapsed=true]:gap-3 lg:group-data-[collapsed=true]:px-0">
        <span className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-control bg-ink text-xs font-semibold text-inverse lg:group-data-[collapsed=true]:hidden"
          >
            A
          </span>
          <p className={`text-base font-semibold tracking-tight text-ink ${labelClass}`}>
            {t("app.name")}
          </p>
        </span>

        <Tooltip label={isCollapsed ? t("nav.expand") : t("nav.collapse")} disabled={!isCollapsed}>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-pressed={isCollapsed}
            aria-label={isCollapsed ? t("nav.expand") : t("nav.collapse")}
            className="hidden size-8 shrink-0 items-center justify-center rounded-control text-muted transition-colors duration-150 hover:bg-sunken hover:text-ink lg:flex"
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </Tooltip>
      </div>

      <nav aria-label={t("nav.label")} className="grid gap-6">
        <ul className="grid gap-0.5">
          <li>
            <Tooltip label={t("nav.home")} disabled={!isCollapsed}>
              <NavLink to="/" end ref={firstLinkRef} className={linkClass}>
                <HomeIcon {...NAV_ICON_PROPS} />
                <span className={labelClass}>{t("nav.home")}</span>
              </NavLink>
            </Tooltip>
          </li>
          <li>
            <Tooltip label={t("nav.calendar")} disabled={!isCollapsed}>
              <NavLink to="/calendar" className={linkClass}>
                <CalendarIcon {...NAV_ICON_PROPS} />
                <span className={labelClass}>{t("nav.calendar")}</span>
              </NavLink>
            </Tooltip>
          </li>
          <li>
            <Tooltip label={t("nav.appointmentTypes")} disabled={!isCollapsed}>
              <NavLink to="/appointment-types" className={linkClass}>
                <TagsIcon {...NAV_ICON_PROPS} />
                <span className={labelClass}>{t("nav.appointmentTypes")}</span>
              </NavLink>
            </Tooltip>
          </li>
        </ul>

        <div className="-mx-4 grid gap-0.5 border-t border-line px-4 pt-5 lg:group-data-[collapsed=true]:mx-0 lg:group-data-[collapsed=true]:px-0">
          <p className={`px-3 pb-1.5 text-xs text-muted ${labelClass}`}>{t("nav.actions")}</p>
          <ul className="grid gap-0.5">
            <li>
              <Tooltip label={t("nav.newAppointment")} disabled={!isCollapsed}>
                <NavLink to="/appointments/new" className={linkClass}>
                  <CalendarPlusIcon {...NAV_ICON_PROPS} />
                  <span className={labelClass}>{t("nav.newAppointment")}</span>
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip label={t("nav.newAppointmentType")} disabled={!isCollapsed}>
                <NavLink to="/appointment-types/new" className={linkClass}>
                  <TagPlusIcon {...NAV_ICON_PROPS} />
                  <span className={labelClass}>{t("nav.newAppointmentType")}</span>
                </NavLink>
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>

      <div className="-mx-4 mt-auto flex flex-col items-stretch gap-2 border-t border-line px-4 pt-5 lg:group-data-[collapsed=true]:mx-0 lg:group-data-[collapsed=true]:items-center lg:group-data-[collapsed=true]:px-0">
        <ThemeSwitcher isCollapsed={isCollapsed} />
        <LanguageSwitcher isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};
