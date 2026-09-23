interface Timestamps {
    readonly created_at: string;
    readonly updated_at: string;
}

export interface AppointmentType extends Timestamps {
    readonly id: number;
    readonly name: string;
    readonly color: string | null;
}

export interface InterestedPerson {
    readonly id: number;
    readonly name: string;
    readonly email: string | null;
}

export interface Appointment extends Timestamps {
    readonly id: number;
    readonly description: string;
    readonly notes: string | null;
    readonly location: string | null;
    readonly appointment_type_id: number;
    readonly starts_at: string;
    readonly ends_at: string;
    readonly interested_people: readonly InterestedPerson[];
}

export interface InterestedPersonAttributes {
    readonly id?: number;
    readonly name: string;
    readonly email: string | null;
    readonly _destroy?: boolean;
}

export type AppointmentTypeInput = Pick<AppointmentType, "name" | "color">;

export type AppointmentInput = Pick<
    Appointment,
    "description" | "notes" | "location" | "appointment_type_id" | "starts_at" | "ends_at"
> & {
    readonly interested_people_attributes: readonly InterestedPersonAttributes[];
};
