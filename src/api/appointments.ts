import type { Appointment, AppointmentInput } from "../types";
import { createCrudService } from "./crudService";

export const appointmentsApi = createCrudService<Appointment, AppointmentInput>(
    '/appointments',
    'appointment',
);