import { Link } from "@tanstack/react-router";
import { HabitSection } from "./components/HabitSection";
import { useGraphStore } from "./store";
import chartBar from "./assets/chart-bar.svg";
import gear from "./assets/gear.svg";
import plus from "./assets/plus.svg";
import chartBarDark from "./assets/chart-bar-dark.svg";
import plusDark from "./assets/plus-dark.svg";
import gearSixDark from "./assets/gear-six-dark.svg";

function App() {
  const {
    graphs,
    theme: { effectiveTheme },
  } = useGraphStore();

  const chartBarSrc = effectiveTheme === "dark" ? chartBarDark : chartBar;
  const plusSrc = effectiveTheme === "dark" ? plusDark : plus;
  const gearSixSrc = effectiveTheme === "dark" ? gearSixDark : gear;

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex justify-between mb-8">
        <Link className="link" to="/settings">
          <img src={gearSixSrc} alt="Settings" className="size-[1.2em]" />
        </Link>
        <Link className="link text-sand-300" to="/statistics">
          <img src={chartBarSrc} alt="Statistics" className="size-[1.2em]" />
        </Link>
        <Link className="link" to="/create-habit">
          <img src={plusSrc} alt="Add Category" className="size-[1.2em]" />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 justify-center flex flex-col items-center">
        {Object.entries(graphs).map(([key, habit]) => (
          <HabitSection key={key} habit={habit} />
        ))}
      </div>
    </div>
  );
}

export default App;
