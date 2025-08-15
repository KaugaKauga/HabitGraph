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
  createdAt: string;
};

export type ThemeMode = "light" | "dark" | "system";

export type ThemeState = {
  manualTheme: ThemeMode;
  effectiveTheme: "cupcake" | "synthwave";
};

export type ThemeSlice = {
  theme: ThemeState;
  setTheme: (theme: ThemeMode) => void;
  getEffectiveTheme: () => "cupcake" | "synthwave";
  initializeTheme: () => void;
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

export type AppSlice = HabitSlice & ThemeSlice;
