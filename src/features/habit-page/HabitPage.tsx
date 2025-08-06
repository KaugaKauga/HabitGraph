import { Link } from "@tanstack/react-router";
import { Route } from "../../routes/habit.$habitId";
import { useGraphStore } from "../../store";
import arrowLeft from "../../assets/arrow-left.svg";
import { getEntriesFromLastNDays } from "./habitAnalytics";
import { getTextColorClass } from "../../utils/colorUtils";

const HabitPage = () => {
  const { habitId } = Route.useParams();
  const { getHabitById } = useGraphStore();
  const habit = getHabitById({ habitId });
  const textColor = getTextColorClass(habit.color);

  const sevenDays = getEntriesFromLastNDays(habit, 7);
  const thirtyDays = getEntriesFromLastNDays(habit, 30);
  const ninetyDays = getEntriesFromLastNDays(habit, 90);

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex justify-between mb-8">
        <Link className="link" to="/">
          <img src={arrowLeft} alt="Home" className="size-[1.2em]" />
        </Link>
        <h2 className={`text-2xl font-bold lowercase`}>{habit.name}</h2>
        <div className="flex flex-col"></div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 justify-center flex flex-col items-center p-2">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Seven Days</div>
            <div className={`stat-value ${textColor}`}>{sevenDays}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Thirty days</div>
            <div className={`stat-value ${textColor}`}>{thirtyDays}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Ninety days</div>
            <div className={`stat-value ${textColor}`}>{ninetyDays}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HabitPage };
