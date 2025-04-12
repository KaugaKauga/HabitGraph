import { GraphSection } from "./components/GraphSection";
import { useGraphStore } from "./store";

function App() {
  const { graphs } = useGraphStore();
  console.log({ graphs });
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-stone-300">HabitGraph</h1>
      </div>
      {Object.entries(graphs).map(([key, graph]) => (
        <GraphSection key={key} graph={graph} />
      ))}
    </>
  );
}

export default App;
