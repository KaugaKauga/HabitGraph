import { ColorType } from "./utils/colorUtils";

export type HabitEntry = {
  id: string;
  categoryId: string;
  date: string;
};

export type Habit = {
  id: string;
  color: ColorType;
  name: string;
  data: HabitEntry[];
  isHigherBetter: boolean;
  isTrueFalse: boolean;
};

export type HabitSlice = {
  graphs: { [key: string]: Habit };
  addEntry: ({
    entry,
    categoryId,
  }: {
    entry: HabitEntry;
    categoryId: string;
  }) => void;
  getHabitById: ({ habitId }: { habitId: string }) => Habit;
  addGraph: ({
    name,
    isTrueFalse,
    isHigherBetter,
    color,
  }: {
    name: string;
    isTrueFalse: boolean;
    isHigherBetter: boolean;
    color: ColorType;
  }) => void;
};
