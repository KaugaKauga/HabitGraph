import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Habit, AppSlice, ThemeMode } from "./types";
import { nanoid } from "nanoid";

// Theme colors for meta tag updates
const themeColors = {
  cupcake: "#faf7f5",
  synthwave: "#1a103d",
};

// Function to update theme-color meta tag
const updateThemeColorMeta = (theme: "cupcake" | "synthwave") => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", themeColors[theme]);
  }
};

const useGraphStore = create<AppSlice>()(
  persist(
    (set, get) => ({
      graphs: {},
      // Theme state
      theme: {
        manualTheme: "system" as ThemeMode,
        effectiveTheme: "cupcake" as "cupcake" | "synthwave",
      },
      // Theme actions
      setTheme: (theme: ThemeMode) => {
        set(() => {
          const newEffectiveTheme =
            theme === "system"
              ? window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "synthwave"
                : "cupcake"
              : theme === "dark"
                ? "synthwave"
                : "cupcake";

          // Update DOM immediately
          document.documentElement.setAttribute(
            "data-theme",
            newEffectiveTheme,
          );

          // Update theme-color meta tag for iOS
          updateThemeColorMeta(newEffectiveTheme);

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
              ? "synthwave"
              : "cupcake"
            : theme.manualTheme === "dark"
              ? "synthwave"
              : "cupcake";

        // Update DOM
        document.documentElement.setAttribute("data-theme", effectiveTheme);

        // Update theme-color meta tag for iOS
        updateThemeColorMeta(effectiveTheme);

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

          if (graph.isTrueFalse) {
            const entryDate = new Date(entry.date).toDateString();
            const hasExistingEntry = graph.data.some(
              (existingEntry) =>
                new Date(existingEntry.date).toDateString() === entryDate,
            );

            if (hasExistingEntry) {
              return state; // Block the entry
            }
          }

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
