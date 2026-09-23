import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ApiError } from "../api/errors";

export type FieldAliases = Readonly<Record<string, string>>;

const ROOT_SERVER_FIELD = "root.server";

export const applyApiErrors = <TFieldValues extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<TFieldValues>,
    aliases: FieldAliases = {},
    knownFields: readonly string[] = [],
): void => {
    if (!(error instanceof ApiError)) {
        return;
    }

    if (!error.validationErrors) {
        setError(ROOT_SERVER_FIELD as Path<TFieldValues>, {
            type: "server",
            message: error.message,
        });
        return;
    }

    const unmapped: string[] = [];

    for (const [key, messages] of Object.entries(error.validationErrors)) {
        const field = aliases[key] ?? key;
        const message = messages.join(", ");

        if (knownFields.includes(field)) {
            setError(field as Path<TFieldValues>, { type: "server", message });
        } else {
            unmapped.push(message);
        }
    }

    if (unmapped.length > 0) {
        setError(ROOT_SERVER_FIELD as Path<TFieldValues>, {
            type: "server",
            message: unmapped.join(" "),
        });
    }
};
