import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Habit, HabitSlice } from "./types";
import { nanoid } from "nanoid";

const useGraphStore = create<HabitSlice>()(
  persist(
    (set, get) => ({
      graphs: {},
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
