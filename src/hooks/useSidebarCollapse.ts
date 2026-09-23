import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "entry-calendar.sidebar-collapsed";

const readStored = (): boolean => {
    try {
        return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
        return false;
    }
};

export interface SidebarCollapse {
    readonly isCollapsed: boolean;
    readonly toggle: () => void;
}

export const useSidebarCollapse = (): SidebarCollapse => {
    const [isCollapsed, setIsCollapsed] = useState(readStored);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, String(isCollapsed));
        } catch {
            // ignore storage failures (e.g. private browsing)
        }
    }, [isCollapsed]);

    const toggle = useCallback(() => setIsCollapsed((previous) => !previous), []);

    return { isCollapsed, toggle };
};
