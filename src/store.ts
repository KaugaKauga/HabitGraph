import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GraphSlice } from "./types";

const useGraphStore = create<GraphSlice>()(
  persist(
    (set, get) => ({
      graphs: {
        "TEST-CAT": {
          id: "TEST-CAT",
          color: "emerald",
          name: "Veg days",
          data: [
            { id: "entry-1", categoryId: "TEST-CAT", date: "2025-03-24" },
            { id: "entry-2", categoryId: "TEST-CAT", date: "2025-03-25" },
          ],
        },
      },
      getGraphById: ({ categoryId }) => {
        const graphs = get().graphs;

        return graphs[categoryId];
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
      name: "graph-storage",
    },
  ),
);

export { useGraphStore };
