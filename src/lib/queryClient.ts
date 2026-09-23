import { QueryClient } from "@tanstack/react-query";
import type { ApiError } from "../api/errors";

declare module "@tanstack/react-query" {
    interface Register {
        defaultError: ApiError;
    }
}

const STALE_TIME_MS = 30_000;
const MAX_RETRIES = 2;
const CLIENT_ERROR_MIN = 400;
const CLIENT_ERROR_MAX = 499;

const shouldRetry = (failureCount: number, error: ApiError): boolean => {
    const isClientError =
        error.status !== null && error.status >= CLIENT_ERROR_MIN && error.status <= CLIENT_ERROR_MAX;
    return !isClientError && failureCount < MAX_RETRIES;
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: STALE_TIME_MS,
            retry: shouldRetry,
        },
    },
});