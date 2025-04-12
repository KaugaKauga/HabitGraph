import { ColorType } from "./utils/colorUtils";

export type GraphEntry = {
  id: string;
  categoryId: string;
  date: string;
};

export type GraphContainer = {
  id: string;
  color: ColorType;
  name: string;
  data: GraphEntry[];
};

export type GraphSlice = {
  graphs: { [key: string]: GraphContainer };
  addEntry: ({
    entry,
    categoryId,
  }: {
    entry: GraphEntry;
    categoryId: string;
  }) => void;
  getGraphById: ({ categoryId }: { categoryId: string }) => GraphContainer;
};
