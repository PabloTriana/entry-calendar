import axios from "axios";
import { env } from "../lib/env";
import { toApiError } from "./errors";

const REQUEST_TIMEOUT_MS = 10_000;

export const apiClient = axios.create({
    baseURL: env.apiUrl,
    timeout: REQUEST_TIMEOUT_MS,
    headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
    },
})

apiClient.interceptors.response.use((response) => response, (error: unknown) => Promise.reject(toApiError(error)));