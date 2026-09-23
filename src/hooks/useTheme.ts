import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "entry-calendar.theme";

const listeners = new Set<() => void>();

const notify = (): void => listeners.forEach((listener) => listener());

const subscribe = (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

const getSnapshot = (): Theme =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export const useTheme = (): readonly [Theme, (theme: Theme) => void] => {
    const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light" as Theme);

    const setTheme = useCallback((next: Theme) => {
        document.documentElement.dataset.theme = next;
        localStorage.setItem(STORAGE_KEY, next);
        notify();
    }, []);

    return [theme, setTheme];
};
