import { useCallback, useDeferredValue, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { ApiError } from "../../../api/errors";
import { useAppointmentsList } from "../../../hooks/useAppointments";
import type { Appointment } from "../../../types";
import { searchAppointments } from "../utils/searchAppointments";

const SEARCH_PARAM = "q";

const EMPTY_APPOINTMENTS: readonly Appointment[] = [];

export interface AppointmentSearchState {
    readonly query: string;
    readonly setQuery: (query: string) => void;
    readonly isSearching: boolean;
    readonly results: readonly Appointment[];
    readonly isLoading: boolean;
    readonly error: ApiError | null;
    readonly retry: () => void;
}

export const useAppointmentSearch = (): AppointmentSearchState => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data = EMPTY_APPOINTMENTS, isLoading, error, refetch } = useAppointmentsList();

    const query = searchParams.get(SEARCH_PARAM) ?? "";
    const deferredQuery = useDeferredValue(query);

    const setQuery = useCallback(
        (next: string) => {
            setSearchParams(
                (previous) => {
                    const params = new URLSearchParams(previous);
                    if (next.trim() === "") {
                        params.delete(SEARCH_PARAM);
                    } else {
                        params.set(SEARCH_PARAM, next);
                    }
                    return params;
                },
                { replace: true },
            );
        },
        [setSearchParams],
    );

    const results = useMemo(
        () => searchAppointments(data, deferredQuery),
        [data, deferredQuery],
    );

    return {
        query,
        setQuery,
        isSearching: query.trim() !== "",
        results,
        isLoading,
        error,
        retry: () => void refetch(),
    };
};
