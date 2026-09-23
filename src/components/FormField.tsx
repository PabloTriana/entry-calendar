import { useId, type ReactElement } from "react";

export interface FieldControlProps {
  readonly id: string;
  readonly className: string;
  readonly "aria-invalid": boolean | undefined;
  readonly "aria-describedby": string | undefined;
}

interface FormFieldProps {
  readonly label: string;
  readonly error?: string;
  readonly hint?: string;
  readonly span?: "full";
  readonly children: (control: FieldControlProps) => ReactElement;
}

const CONTROL_CLASS =
  "w-full min-w-0 rounded-control border border-line-strong bg-canvas px-3 py-2.5 text-sm text-ink transition-colors duration-150 placeholder:text-muted focus:border-ink aria-invalid:border-l-2 aria-invalid:border-ink";

export const FormField = ({
  label,
  error,
  hint,
  span,
  children,
}: FormFieldProps): ReactElement => {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter((value) => value !== null)
    .join(" ");

  return (
    <div className={`grid min-w-0 gap-2 ${span === "full" ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>

      {children({
        id,
        className: CONTROL_CLASS,
        "aria-invalid": error !== undefined ? true : undefined,
        "aria-describedby": describedBy === "" ? undefined : describedBy,
      })}

      {hint && (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-ink">
          {error}
        </p>
      )}
    </div>
  );
};
