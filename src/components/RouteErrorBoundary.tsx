import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export const RouteErrorBoundary = (): ReactElement => {
  const { t } = useTranslation();
  const error = useRouteError();

  const message = isRouteErrorResponse(error) ? t("errors.notFound") : t("errors.generic");

  return (
    <section role="alert" className="grid justify-items-start gap-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{t("errors.title")}</h1>
      <p className="text-sm text-muted">{message}</p>
      <Link
        to="/"
        className="rounded-control border border-line-strong bg-canvas px-4 py-2.5 text-sm font-medium text-ink no-underline transition-colors duration-150 hover:bg-sunken"
      >
        {t("errors.backHome")}
      </Link>
    </section>
  );
};
