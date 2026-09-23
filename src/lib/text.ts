export const normalizeForSearch = (value: string): string =>
    value
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLocaleLowerCase("es");

export const matchesQuery = (
    haystacks: readonly (string | null)[],
    normalizedQuery: string,
): boolean =>
    haystacks.some(
        (haystack) => haystack !== null && normalizeForSearch(haystack).includes(normalizedQuery),
    );
