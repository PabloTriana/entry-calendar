import { appointmentTypesApi } from "../api/appointmentTypes"
import { createResourceHooks } from "./createResourceHooks"

export const {
    useList: useAppointmentTypesList,
    useDetail: useAppointmentTypesDetail,
    useCreate: useAppointmentTypesCreate,
    useUpdate: useAppointmentTypesUpdate,
    useDelete: useAppointmentTypesDelete,
} = createResourceHooks("appointment_types", appointmentTypesApi)
