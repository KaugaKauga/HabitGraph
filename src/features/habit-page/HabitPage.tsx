import { Link } from "@tanstack/react-router";
import { Route } from "../../routes/habit.$habitId";
import { useGraphStore } from "../../store";
import arrowLeft from "../../assets/arrow-left.svg";

const HabitPage = () => {
  const { habitId } = Route.useParams();
  const { getHabitById } = useGraphStore();
  const habit = getHabitById({ habitId });

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex justify-between mb-8">
        <Link className="link" to="/">
          <img src={arrowLeft} alt="Home" className="size-[1.2em]" />
        </Link>
        <h2 className={`text-2xl font-bold lowercase`}>{habit.name}</h2>
        <div></div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 justify-center flex flex-col items-center p-2"></div>
    </div>
  );
};

export { HabitPage };
