import { format, parseISO } from "date-fns";
import { enUS, es } from "date-fns/locale";

export type DateLocale = typeof enUS;

const DATE_LOCALES: Record<string, DateLocale> = { es, en: enUS };

const FALLBACK_LOCALE: DateLocale = es;

export const resolveDateLocale = (language: string): DateLocale =>
    DATE_LOCALES[language.split("-")[0]] ?? FALLBACK_LOCALE;

export const formatWithPattern = (date: Date, pattern: string, locale: DateLocale): string =>
    format(date, pattern, { locale });

export const formatIsoWithPattern = (iso: string, pattern: string, locale: DateLocale): string =>
    formatWithPattern(parseISO(iso), pattern, locale);

export const compareByStartsAt = (a: { starts_at: string }, b: { starts_at: string }): number =>
    parseISO(a.starts_at).getTime() - parseISO(b.starts_at).getTime();

export const toDateTimeLocalValue = (iso: string): string =>
    format(parseISO(iso), "yyyy-MM-dd'T'HH:mm");

export const fromDateTimeLocalValue = (value: string): string => new Date(value).toISOString();
