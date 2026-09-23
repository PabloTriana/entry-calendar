import { LanguagesIcon } from "lucide-react";
import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "./ToggleSwitch";
import { Tooltip } from "./Tooltip";

const LANGUAGE_NAMES: Record<string, string> = { es: "Español", en: "English" };
const LANGUAGE_CODES: Record<string, string> = { es: "ES", en: "EN" };

interface LanguageSwitcherProps {
  readonly isCollapsed?: boolean;
}

export const LanguageSwitcher = ({ isCollapsed = false }: LanguageSwitcherProps): ReactElement => {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "es";
  const isEnglish = current === "en";
  const label = `${t("nav.language")}: ${LANGUAGE_NAMES[current]}`;
  const toggle = (): void => void i18n.changeLanguage(isEnglish ? "es" : "en");
  const icon = <span className="text-[10px] font-bold leading-none">{LANGUAGE_CODES[current]}</span>;

  if (isCollapsed) {
    return (
      <Tooltip label={label}>
        <button
          type="button"
          role="switch"
          aria-checked={isEnglish}
          aria-label={label}
          onClick={toggle}
          className="flex size-9 items-center justify-center rounded-control border border-line-strong text-xs font-semibold text-muted transition-colors duration-150 hover:bg-sunken hover:text-ink"
        >
          {LANGUAGE_CODES[current]}
        </button>
      </Tooltip>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 px-1">
      <span className="flex items-center gap-1.5 text-sm text-muted">
        <LanguagesIcon size={14} strokeWidth={1.75} aria-hidden="true" />
        {t("nav.language")}
      </span>
      <ToggleSwitch checked={isEnglish} onToggle={toggle} ariaLabel={label} icon={icon} />
    </div>
  );
};
