import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import es from "../locales/es.json";

export const SUPPORTED_LANGUAGES = ["es", "en"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const LANGUAGE_STORAGE_KEY = "entry-calendar.language";

void i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: es },
            en: { translation: en },
        },
        fallbackLng: "es",
        supportedLngs: SUPPORTED_LANGUAGES,
        load: "languageOnly",
        interpolation: { escapeValue: false },
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
            lookupLocalStorage: LANGUAGE_STORAGE_KEY,
        },
    });

const syncDocumentLanguage = (language: string): void => {
    document.documentElement.lang = language;
};

syncDocumentLanguage(i18next.resolvedLanguage ?? "es");
i18next.on("languageChanged", syncDocumentLanguage);

export { i18next };
