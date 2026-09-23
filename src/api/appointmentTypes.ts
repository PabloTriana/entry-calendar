import type { AppointmentType, AppointmentTypeInput } from "../types"
import { createCrudService } from "./crudService"

export const appointmentTypesApi = createCrudService<AppointmentType, AppointmentTypeInput>("/appointment_types",
    "appointment_type")