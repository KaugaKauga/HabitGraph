import "./App.css";
import { Graph } from "./components/Graph";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div>
        <h1>HabitGraph</h1>
      </div>
      <Graph />
      <Graph />
      <Graph />
    </div>
  );
}

export default App;
