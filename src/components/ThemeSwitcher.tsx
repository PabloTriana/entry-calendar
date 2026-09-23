import { MoonIcon, SunIcon } from "lucide-react";
import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { ToggleSwitch } from "./ToggleSwitch";
import { Tooltip } from "./Tooltip";

interface ThemeSwitcherProps {
  readonly isCollapsed?: boolean;
}

export const ThemeSwitcher = ({ isCollapsed = false }: ThemeSwitcherProps): ReactElement => {
  const { t } = useTranslation();
  const [theme, setTheme] = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? t("nav.themeSwitchToLight") : t("nav.themeSwitchToDark");
  const toggle = (): void => setTheme(isDark ? "light" : "dark");
  const icon = isDark ? (
    <MoonIcon size={14} strokeWidth={1.75} aria-hidden="true" />
  ) : (
    <SunIcon size={14} strokeWidth={1.75} aria-hidden="true" />
  );

  if (isCollapsed) {
    return (
      <Tooltip label={label}>
        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label={label}
          onClick={toggle}
          className="flex size-9 items-center justify-center rounded-control border border-line-strong text-muted transition-colors duration-150 hover:bg-sunken hover:text-ink"
        >
          {icon}
        </button>
      </Tooltip>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 px-1">
      <span className="flex items-center gap-1.5 text-sm text-muted">
        <SunIcon size={14} strokeWidth={1.75} aria-hidden="true" />
        {t("nav.theme")}
      </span>
      <ToggleSwitch checked={isDark} onToggle={toggle} ariaLabel={label} icon={icon} />
    </div>
  );
};
