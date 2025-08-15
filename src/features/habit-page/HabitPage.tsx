import { Link } from "@tanstack/react-router";
import { Route } from "../../routes/habit.$habitId";
import { useGraphStore } from "../../store";
import arrowLeft from "../../assets/arrow-left.svg";
import arrowLeftDark from "../../assets/arrow-left-dark.svg";
import {
  compareLastNDaysWithPrevious,
  getCurrentStreak,
  getEntriesSinceStart,
  getLongestStreak,
} from "./habitAnalytics";
import { getTextColorClass } from "../../utils/colorUtils";
import { StatDisplay } from "../../components/StatDisplay";

const HabitPage = () => {
  const { habitId } = Route.useParams();
  const {
    getHabitById,
    theme: { effectiveTheme },
  } = useGraphStore();
  const habit = getHabitById({ habitId });
  const textColor = getTextColorClass(habit.color);

  const arrowSrc = effectiveTheme === "dark" ? arrowLeftDark : arrowLeft;

  const {
    current: sevenCurrent,
    previous: sevenPrevious,
    change: sevenChange,
    isImprovement: sevenIsImprovement,
  } = compareLastNDaysWithPrevious(habit, 7);

  const {
    current: thirtyCurrent,
    previous: thirtyPrevious,
    change: thirtyChange,
    isImprovement: thirtyIsImprovement,
  } = compareLastNDaysWithPrevious(habit, 30);

  const {
    current: ninetyCurrent,
    previous: ninetyPrevious,
    change: ninetyChange,
    isImprovement: ninetyIsImprovement,
  } = compareLastNDaysWithPrevious(habit, 90);

  const sinceStart = getEntriesSinceStart(habit);
  const currentStreak = getCurrentStreak(habit);
  const longestStreak = getLongestStreak(habit);

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex justify-between mb-8 items-center">
        <Link className="link" to="/">
          <img src={arrowSrc} alt="Home" className="size-[1.2em]" />
        </Link>
        <h2 className={`text-2xl font-bold lowercase dark:text-blue-200`}>
          {habit.name}
        </h2>
        <div className="flex flex-col"></div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-2 gap-4 justify-center items-start">
          {habit.isTrueFalse && (
            <StatDisplay
              title="Current streak"
              stat={`${currentStreak}`}
              subTitle={`Longest: ${longestStreak}`}
              textColor={textColor}
            />
          )}
          <StatDisplay
            title="Seven Days"
            stat={`${sevenCurrent}`}
            subTitle={`${sevenIsImprovement ? "↗︎" : "↘︎"} ${sevenChange}% (${sevenPrevious})`}
            textColor={textColor}
          />
          <StatDisplay
            title="Thirty Days"
            stat={`${thirtyCurrent}`}
            subTitle={`${thirtyIsImprovement ? "↗︎" : "↘︎"} ${thirtyChange}% (${thirtyPrevious})`}
            textColor={textColor}
          />
          <StatDisplay
            title="Ninety Days"
            stat={`${ninetyCurrent}`}
            subTitle={`${ninetyIsImprovement ? "↗︎" : "↘︎"} ${ninetyChange}% (${ninetyPrevious})`}
            textColor={textColor}
          />
          <StatDisplay
            title="Since start"
            stat={`${sinceStart}`}
            textColor={textColor}
          />
        </div>
        <div className="flex items-center justify-center">
          <StatDisplay
            title="Created"
            stat={`${new Date(habit.createdAt).toLocaleDateString() ?? "-"}`}
            textColor={textColor}
          />
        </div>
      </div>
    </div>
  );
};

export { HabitPage };
