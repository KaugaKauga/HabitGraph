import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Habit, AppSlice, ThemeMode } from "./types";
import { nanoid } from "nanoid";

const useGraphStore = create<AppSlice>()(
  persist(
    (set, get) => ({
      graphs: {},
      // Theme state
      theme: {
        manualTheme: "system" as ThemeMode,
        effectiveTheme: "light" as "light" | "dark",
      },
      // Theme actions
      setTheme: (theme: ThemeMode) => {
        set(() => {
          const newEffectiveTheme =
            theme === "system"
              ? window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
              : (theme as "light" | "dark");

          // Update DOM immediately
          document.documentElement.setAttribute(
            "data-theme",
            newEffectiveTheme,
          );

          return {
            theme: {
              manualTheme: theme,
              effectiveTheme: newEffectiveTheme,
            },
          };
        });
      },
      getEffectiveTheme: () => {
        return get().theme.effectiveTheme;
      },
      initializeTheme: () => {
        const { theme } = get();
        const effectiveTheme =
          theme.manualTheme === "system"
            ? window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
            : (theme.manualTheme as "light" | "dark");

        // Update DOM
        document.documentElement.setAttribute("data-theme", effectiveTheme);

        // Update state if needed
        if (theme.effectiveTheme !== effectiveTheme) {
          set((state) => ({
            theme: {
              ...state.theme,
              effectiveTheme,
            },
          }));
        }
      },
      getHabitById: ({ habitId }) => {
        const graphs = get().graphs;

        return graphs[habitId];
      },
      addGraph: ({ name, isTrueFalse, isHigherBetter, color }) => {
        set((state) => {
          const categoryId = nanoid();
          const graphContainer: Habit = {
            id: categoryId,
            color,
            isTrueFalse,
            isHigherBetter,
            name,
            data: [],
            createdAt: new Date().toISOString(),
          };
          return {
            graphs: {
              ...state.graphs,
              [categoryId]: graphContainer,
            },
          };
        });
      },
      addEntry: ({ entry, categoryId }) =>
        set((state) => {
          const graph = state.graphs[categoryId];
          if (graph) {
            return {
              graphs: {
                ...state.graphs,
                [categoryId]: {
                  ...graph,
                  data: [...graph.data, entry],
                },
              },
            };
          }
          return state;
        }),
    }),
    {
      name: "habit-storage",
    },
  ),
);

export { useGraphStore };
