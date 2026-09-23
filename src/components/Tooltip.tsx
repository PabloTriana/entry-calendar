import { useRef, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  readonly label: string;
  readonly disabled?: boolean;
  readonly children: ReactElement;
}

interface Position {
  readonly top: number;
  readonly left: number;
}

export const Tooltip = ({ label, disabled = false, children }: TooltipProps): ReactElement => {
  const [position, setPosition] = useState<Position | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  if (disabled) {
    return children;
  }

  const show = (): void => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    setPosition({ top: rect.top + rect.height / 2, left: rect.right + 8 });
  };

  const hide = (): void => setPosition(null);

  return (
    <span
      ref={wrapperRef}
      className="relative flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {position &&
        createPortal(
          <span
            role="tooltip"
            style={{ top: position.top, left: position.left }}
            className="pointer-events-none fixed z-60 -translate-y-1/2 whitespace-nowrap rounded-control bg-ink px-2.5 py-1.5 text-xs font-medium text-inverse shadow-lg"
          >
            {label}
          </span>,
          document.body,
        )}
    </span>
  );
};
