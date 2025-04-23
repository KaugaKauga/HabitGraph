import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GraphContainer, GraphSlice } from "./types";
import { nanoid } from "nanoid";

const useGraphStore = create<GraphSlice>()(
  persist(
    (set, get) => ({
      graphs: {},
      getGraphById: ({ categoryId }) => {
        const graphs = get().graphs;

        return graphs[categoryId];
      },
      addGraph: ({ name, isTrueFalse, isHigherBetter, color }) => {
        set((state) => {
          const categoryId = nanoid();
          const graphContainer: GraphContainer = {
            id: categoryId,
            color,
            isTrueFalse,
            isHigherBetter,
            name,
            data: [],
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
      name: "graph-storage",
    },
  ),
);

export { useGraphStore };
