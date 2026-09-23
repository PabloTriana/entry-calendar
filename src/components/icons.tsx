import type { ReactElement } from "react";

const BASE_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "size-4",
} as const;

export const MenuIcon = (): ReactElement => (
  <svg {...BASE_PROPS}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const ChevronLeftIcon = (): ReactElement => (
  <svg {...BASE_PROPS}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const ChevronRightIcon = (): ReactElement => (
  <svg {...BASE_PROPS}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
