import { useGraphStore } from "../store";
import { Habit } from "../types";
import { getTextColorClass } from "../utils/colorUtils";
import { nanoid } from "nanoid";
import { Graph } from "./Graph";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import "cally";

type HabitProps = {
  habit: Habit;
};

const HabitSection = ({ habit }: HabitProps) => {
  const navigate = useNavigate();
  const textColor = getTextColorClass(habit.color);
  const { addEntry } = useGraphStore();
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (selectedDate: string) => {
    console.log("Selected date value:", selectedDate);
    if (selectedDate) {
      const entry = { id: nanoid(), categoryId: habit.id, date: selectedDate };
      addEntry({ categoryId: habit.id, entry });
      setShowCalendar(false);
    }
  };

  const handleIconClick = () => {
    setShowCalendar(!showCalendar);
  };

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
        <div className={`modal ${showCalendar ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Select Date</h3>
            <calendar-date
              onchange={(event) =>
                handleDateSelect((event.target as HTMLInputElement).value)
              }
              className="cally bg-base-100 border border-base-300 shadow-lg rounded-box w-full"
            >
              <svg
                aria-label="Previous"
                className="fill-current size-4"
                slot="previous"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                ></path>
              </svg>
              <svg
                aria-label="Next"
                className="fill-current size-4"
                slot="next"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
              </svg>
              <calendar-month></calendar-month>
            </calendar-date>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowCalendar(false)}>
                Cancel
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowCalendar(false)}
          ></div>
        </div>
        <svg
          className={`w-6 h-6 ${textColor} cursor-pointer`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleIconClick}
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
