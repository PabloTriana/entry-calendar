import { isAxiosError } from "axios";

export type ValidationErrors = Readonly<Record<string, string[]>>;

const HTTP_UNPROCESSABLE_ENTITY = 422;

const STATUS_MESSAGES: Readonly<Record<number, string>> = {
  404: 'El recurso no existe o fue eliminado',
  422: 'Los datos enviados no son válidos',
  500: 'Error interno del servidor',
};

export class ApiError extends Error {
  readonly status: number | null;
  readonly validationErrors: ValidationErrors | null;

  constructor(message: string, status: number | null = null, validationErrors: ValidationErrors = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.validationErrors = validationErrors;
  }
}

const isValidationErrors = (data: unknown): data is ValidationErrors =>
  typeof data === 'object' &&
  data !== null &&
  !Array.isArray(data) &&
  Object.values(data).every(
    (messages) => Array.isArray(messages) && messages.every((m) => typeof m === 'string'),
  );

export const toApiError = (error: unknown): ApiError => {
  if (!isAxiosError(error)) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return new ApiError(message, null);
  }

  const status = error.response?.status ?? null;
  if (status === null) {
    return new ApiError('No se pudo conectar con el servidor', null);
  }

  const data: unknown = error.response?.data;
  if (status === HTTP_UNPROCESSABLE_ENTITY && isValidationErrors(data)) {
    return new ApiError(STATUS_MESSAGES[status], status, data);
  }

  return new ApiError(STATUS_MESSAGES[status] ?? `Error ${status}`, status);
};