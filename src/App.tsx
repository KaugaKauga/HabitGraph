import { Graph } from "./components/Graph";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 w-screen bg-violet-200">
      <div>
        <h1 className="text-4xl font-bold text-violet-400">HabitGraph</h1>
      </div>
      <Graph />
      <Graph />
      <Graph />
    </div>
  );
}

export default App;
