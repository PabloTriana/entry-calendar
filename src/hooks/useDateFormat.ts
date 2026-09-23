import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    formatIsoWithPattern,
    formatWithPattern,
    resolveDateLocale,
    type DateLocale,
} from "../lib/date";

export interface DateFormatters {
    readonly locale: DateLocale;
    readonly time: (iso: string) => string;
    readonly dayNumber: (date: Date) => string;
    readonly dayLabel: (date: Date) => string;
    readonly dayLabelShort: (date: Date) => string;
    readonly monthTitle: (month: Date) => string;
}

export const useDateFormat = (): DateFormatters => {
    const { t, i18n } = useTranslation();

    return useMemo(() => {
        const locale = resolveDateLocale(i18n.language);

        return {
            locale,
            time: (iso) => formatIsoWithPattern(iso, t("formats.time"), locale),
            dayNumber: (date) => formatWithPattern(date, "d", locale),
            dayLabel: (date) => formatWithPattern(date, t("formats.dayLabel"), locale),
            dayLabelShort: (date) => formatWithPattern(date, t("formats.dayLabelShort"), locale),
            monthTitle: (month) => formatWithPattern(month, t("formats.monthTitle"), locale),
        };
    }, [t, i18n.language]);
};
