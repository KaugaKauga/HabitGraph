import { useGraphStore } from "../store";
import { Habit } from "../types";
import { getTextColorClass } from "../utils/colorUtils";
import { nanoid } from "nanoid";
import { Graph } from "./Graph";
import { useNavigate } from "@tanstack/react-router";

type HabitProps = {
  habit: Habit;
};

const HabitSection = ({ habit }: HabitProps) => {
  const navigate = useNavigate();
  const textColor = getTextColorClass(habit.color);
  const { addEntry } = useGraphStore();
  const today = new Date().toISOString().slice(0, 10);
  const entry = { id: nanoid(), categoryId: habit.id, date: today };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 justify-between mb-2">
        <h2
          className={`text-2xl font-bold lowercase ${textColor}`}
          onClick={() =>
            navigate({ to: "/habit/$habitId", params: { habitId: habit.id } })
          }
        >
          {habit.name}
        </h2>
        <svg
          className={`w-6 h-6 ${textColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => addEntry({ categoryId: habit.id, entry })}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <Graph color={habit.color} entries={habit.data} />
    </div>
  );
};

export { HabitSection };
