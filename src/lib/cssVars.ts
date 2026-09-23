import type { CSSProperties } from "react";

export const cssVars = (variables: Readonly<Record<`--${string}`, string>>): CSSProperties =>
    variables as CSSProperties;
