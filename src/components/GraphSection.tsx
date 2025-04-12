import { useGraphStore } from "../store";
import { GraphContainer } from "../types";
import { getTextColorClass } from "../utils/colorUtils";
import { nanoid } from "nanoid";
import { Graph } from "./Graph";

type GraphProps = {
  graph: GraphContainer;
};

const GraphSection = ({ graph }: GraphProps) => {
  const textColor = getTextColorClass(graph.color);
  const { addEntry } = useGraphStore();
  const today = new Date().toISOString().slice(0, 10);
  const entry = { id: nanoid(), categoryId: graph.id, date: today };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 justify-between">
        <h2 className={`text-2xl font-bold lowercase ${textColor}`}>
          {graph.name}
        </h2>
        <svg
          className={`w-6 h-6 ${textColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => addEntry({ categoryId: graph.id, entry })}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <Graph color={graph.color} entries={graph.data} />
    </div>
  );
};

export { GraphSection };
