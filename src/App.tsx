import { GraphSection } from "./components/GraphSection";
import { useGraphStore } from "./store";

function App() {
  const { graphs } = useGraphStore();
  console.log({ graphs });
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 w-screen bg-stone-100">
      <div>
        <h1 className="text-4xl font-bold text-stone-300">HabitGraph</h1>
      </div>
      <GraphSection color="emerald" title="Veg meals" />
      <GraphSection color="purple" title="Work out" />
      <GraphSection color="fuchsia" title="Fuchsia" />
    </div>
  );
}

export default App;
