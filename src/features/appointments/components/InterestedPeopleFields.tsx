import type { ReactElement } from "react";
import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormField } from "../../../components/FormField";
import type { AppointmentFormValues } from "../schemas/appointmentSchema";

interface InterestedPeopleFieldsProps {
  readonly control: Control<AppointmentFormValues>;
  readonly register: UseFormRegister<AppointmentFormValues>;
}

export const InterestedPeopleFields = ({
  control,
  register,
}: InterestedPeopleFieldsProps): ReactElement => {
  const { t } = useTranslation();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "interested_people",
    keyName: "fieldId",
  });

  const removeAt = (index: number): void => {
    const person = fields[index];

    if (person.id === undefined) {
      remove(index);
      return;
    }

    update(index, { ...person, _destroy: true });
  };

  return (
    <fieldset className="grid min-w-0 gap-4 rounded-card border border-line-strong bg-surface p-4 sm:col-span-2">
      <legend className="px-1 text-sm font-medium text-ink">{t("people.title")}</legend>

      {fields.length === 0 && <p className="text-sm text-muted">{t("people.empty")}</p>}

      {fields.length > 0 && (
        <ul className="grid gap-3">
          {fields.map((person, index) => (
            <li
              key={person.fieldId}
              className={`grid gap-3 rounded-card border border-line bg-canvas p-3 sm:grid-cols-[2fr_2fr_auto] sm:items-end ${
                person._destroy ? "opacity-60" : ""
              }`}
            >
              {person._destroy ? (
                <>
                  <span className="text-sm text-ink line-through sm:col-span-2">
                    {person.name}
                  </span>
                  <span className="text-xs text-muted sm:col-span-2">{t("people.removed")}</span>
                  <button
                    type="button"
                    onClick={() => update(index, { ...person, _destroy: false })}
                    className="min-h-11 rounded-control border border-line-strong px-3 text-sm text-ink transition-colors duration-150 hover:bg-sunken"
                  >
                    {t("common.undo")}
                  </button>
                </>
              ) : (
                <>
                  <FormField label={t("people.name")}>
                    {(control_) => (
                      <input
                        type="text"
                        autoComplete="off"
                        {...control_}
                        {...register(`interested_people.${index}.name`)}
                      />
                    )}
                  </FormField>

                  <FormField label={t("people.email")}>
                    {(control_) => (
                      <input
                        type="email"
                        autoComplete="off"
                        {...control_}
                        {...register(`interested_people.${index}.email`)}
                      />
                    )}
                  </FormField>

                  <button
                    type="button"
                    onClick={() => removeAt(index)}
                    className="h-11 rounded-control border border-line-strong px-3 text-sm text-muted transition-colors duration-150 hover:border-ink hover:text-ink"
                  >
                    {t("people.remove")}
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => append({ name: "", email: null, _destroy: false })}
        className="min-h-11 justify-self-start rounded-control border border-line-strong bg-canvas px-4 text-sm font-medium text-ink transition-colors duration-150 hover:bg-sunken"
      >
        {t("people.add")}
      </button>
    </fieldset>
  );
};
