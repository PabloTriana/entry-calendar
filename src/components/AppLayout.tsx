import { useEffect, useId, useRef, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router";
import { useDisclosure } from "../hooks/useDisclosure";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useSidebarCollapse } from "../hooks/useSidebarCollapse";
import { MenuIcon } from "./icons";
import { Sidebar } from "./Sidebar";

const COMPACT_VIEWPORT = "(max-width: 63.99rem)";

export const AppLayout = (): ReactElement => {
  const { t } = useTranslation();
  const navId = useId();
  const location = useLocation();
  const isCompact = useMediaQuery(COMPACT_VIEWPORT);
  const { isOpen, close, toggle } = useDisclosure();
  const { isCollapsed, toggle: toggleCollapse } = useSidebarCollapse();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => close(), [location.key, close]);

  useEffect(() => {
    if (!isCompact) {
      close();
    }
  }, [isCompact, close]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    firstLinkRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, close]);

  const isDrawerOpen = isCompact && isOpen;

  return (
    <div
      className={`grid min-h-svh grid-cols-1 transition-[grid-template-columns] duration-200 ${
        isCollapsed ? "lg:grid-cols-[4.5rem_1fr]" : "lg:grid-cols-[18rem_1fr]"
      }`}
    >
      <a
        href="#main-content"
        className="fixed left-4 top-0 z-60 -translate-y-full rounded-control border border-line-strong bg-canvas px-4 py-2 text-sm transition-transform focus-visible:translate-y-4"
      >
        {t("nav.skipToContent")}
      </a>

      <button
        type="button"
        ref={toggleRef}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={navId}
        aria-label={t("nav.toggle")}
        className="fixed left-4 top-4 z-50 flex size-11 items-center justify-center rounded-control border border-line-strong bg-canvas text-ink transition-colors duration-150 hover:bg-sunken lg:hidden"
      >
        <MenuIcon />
      </button>

      <Sidebar
        navId={navId}
        isOpen={isDrawerOpen}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
        firstLinkRef={firstLinkRef}
      />

      {isDrawerOpen && (
        <div
          aria-hidden="true"
          onClick={close}
          className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
        />
      )}

      <main
        id="main-content"
        inert={isDrawerOpen}
        className="mx-auto w-full max-w-5xl px-4 pb-20 pt-20 lg:px-12 lg:py-12"
      >
        <Outlet />
      </main>
    </div>
  );
};
