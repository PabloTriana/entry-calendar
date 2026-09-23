import { useTranslation } from "react-i18next";
import type { ApiError } from "../api/errors";

const TRANSLATED_STATUSES = [404, 422, 500] as const;

type TranslatedStatus = (typeof TRANSLATED_STATUSES)[number];

const isTranslatedStatus = (status: number | null): status is TranslatedStatus =>
    TRANSLATED_STATUSES.some((candidate) => candidate === status);

export const useApiErrorMessage = (): ((error: ApiError) => string) => {
    const { t } = useTranslation();

    return (error) => (isTranslatedStatus(error.status) ? t(`errors.http.${error.status}`) : error.message);
};
