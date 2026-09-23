import type { ReactElement } from "react";

interface FormErrorSummaryProps {
  readonly message?: string;
}

export const FormErrorSummary = ({ message }: FormErrorSummaryProps): ReactElement | null => {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="rounded-card border border-ink border-l-2 bg-sunken px-4 py-3 text-sm text-ink sm:col-span-2"
    >
      {message}
    </div>
  );
};
