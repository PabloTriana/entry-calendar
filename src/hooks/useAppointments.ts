import { appointmentsApi } from "../api/appointments"
import { createResourceHooks } from "./createResourceHooks"

export const {
    useList: useAppointmentsList,
    useDetail: useAppointmentsDetail,
    useCreate: useAppointmentsCreate,
    useUpdate: useAppointmentsUpdate,
    useDelete: useAppointmentsDelete,
} = createResourceHooks("appointments", appointmentsApi)