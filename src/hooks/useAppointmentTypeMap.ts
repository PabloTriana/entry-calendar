import { useMemo } from "react";
import type { AppointmentType } from "../types";
import { useAppointmentTypesList } from "./useAppointmentTypes";

export type AppointmentTypeMap = ReadonlyMap<number, AppointmentType>;

export const useAppointmentTypeMap = (): AppointmentTypeMap => {
    const { data } = useAppointmentTypesList();

    return useMemo(
        () => new Map((data ?? []).map((type) => [type.id, type])),
        [data],
    );
};
