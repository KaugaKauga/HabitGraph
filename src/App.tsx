import { useNavigate } from "@tanstack/react-router";
import { GraphSection } from "./components/GraphSection";
import { useGraphStore } from "./store";

function App() {
  const { graphs } = useGraphStore();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-stone-300">HabitGraph</h1>
      </div>
      <h2
        className="text-2xl font-bold text-stone-300"
        onClick={() => navigate({ to: "/create-category" })}
      >
        Create category
      </h2>
      {Object.entries(graphs).map(([key, graph]) => (
        <GraphSection key={key} graph={graph} />
      ))}
    </>
  );
}

export default App;
