import { Link } from "@tanstack/react-router";
import { GraphSection } from "./components/GraphSection";
import { useGraphStore } from "./store";
import chartBar from "./assets/chart-bar.svg";
import gear from "./assets/gear.svg";
import plus from "./assets/plus.svg";

function App() {
  const { graphs } = useGraphStore();

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex justify-between mb-8">
        <Link className="link" to="/settings">
          <img src={gear} alt="Settings" className="size-[1.2em]" />
        </Link>
        <Link className="link text-sand-300" to="/statistics">
          <img src={chartBar} alt="Statistics" className="size-[1.2em]" />
        </Link>
        <Link className="link" to="/create-category">
          <img src={plus} alt="Add Category" className="size-[1.2em]" />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 justify-center flex flex-col items-center">
        {Object.entries(graphs).map(([key, graph]) => (
          <GraphSection key={key} graph={graph} />
        ))}
      </div>
    </div>
  );
}

export default App;
