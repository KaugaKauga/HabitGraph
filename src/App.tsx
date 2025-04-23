import { useNavigate } from "@tanstack/react-router";
import { GraphSection } from "./components/GraphSection";
import { useGraphStore } from "./store";

function App() {
  const { graphs } = useGraphStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full justify-center">
      <h2
        className="text-2xl font-bold text-stone-300"
        onClick={() => navigate({ to: "/create-category" })}
      >
        Create category
      </h2>
      <div className="flex-1 overflow-y-auto space-y-2 justify-center flex flex-col items-center">
        {Object.entries(graphs).map(([key, graph]) => (
          <GraphSection key={key} graph={graph} />
        ))}
      </div>
    </div>
  );
}

export default App;
