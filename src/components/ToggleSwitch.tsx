import type { ReactElement, ReactNode } from "react";

interface ToggleSwitchProps {
  readonly checked: boolean;
  readonly onToggle: () => void;
  readonly ariaLabel: string;
  readonly icon: ReactNode;
}

export const ToggleSwitch = ({ checked, onToggle, ariaLabel, icon }: ToggleSwitchProps): ReactElement => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    onClick={onToggle}
    className="relative flex h-8 w-16 shrink-0 items-center rounded-full border border-line-strong bg-sunken transition-colors duration-200"
  >
    <span
      aria-hidden="true"
      className={`absolute left-0.5 flex size-7 items-center justify-center rounded-full bg-canvas text-ink shadow-control transition-transform duration-200 ${
        checked ? "translate-x-[30px]" : "translate-x-0"
      }`}
    >
      {icon}
    </span>
  </button>
);
