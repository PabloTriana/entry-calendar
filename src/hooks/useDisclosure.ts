import { useCallback, useMemo, useState } from "react";

export interface Disclosure {
    readonly isOpen: boolean;
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
}

export const useDisclosure = (initialOpen = false): Disclosure => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((previous) => !previous), []);

    return useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);
};
