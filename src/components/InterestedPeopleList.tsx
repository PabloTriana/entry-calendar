import type { ReactElement } from "react";
import type { InterestedPerson } from "../types";

interface InterestedPeopleListProps {
  readonly people: readonly InterestedPerson[];
}

export const InterestedPeopleList = ({
  people,
}: InterestedPeopleListProps): ReactElement | null => {
  if (people.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-1.5 text-xs">
      {people.map((person) => (
        <li
          key={person.id}
          className="rounded-full border border-line px-2 py-0.5 text-muted"
        >
          {person.name}
        </li>
      ))}
    </ul>
  );
};
