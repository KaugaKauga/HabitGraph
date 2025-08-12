import { Link } from "@tanstack/react-router";
import { Route } from "../../routes/habit.$habitId";
import { useGraphStore } from "../../store";
import arrowLeft from "../../assets/arrow-left.svg";
import {
  compareLastNDaysWithPrevious,
  getCurrentStreak,
  getEntriesFromLastNDays,
  getEntriesSinceStart,
  getLongestStreak,
} from "./habitAnalytics";
import { getTextColorClass } from "../../utils/colorUtils";

const HabitPage = () => {
  const { habitId } = Route.useParams();
  const { getHabitById } = useGraphStore();
  const habit = getHabitById({ habitId });
  const textColor = getTextColorClass(habit.color);

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
      <div className="flex justify-between mb-8">
        <Link className="link" to="/">
          <img src={arrowLeft} alt="Home" className="size-[1.2em]" />
        </Link>
        <h2 className={`text-2xl font-bold lowercase`}>{habit.name}</h2>
        <div className="flex flex-col"></div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-2 gap-4 justify-center items-start">
          {habit.isTrueFalse && (
            <div className="stats">
              <div className="stat place-items-center">
                <div className="stat-title">Current streak</div>
                <div className={`stat-value ${textColor}`}>{currentStreak}</div>
                <div className="stat-desc">Longest: {longestStreak}</div>
              </div>
            </div>
          )}
          <div className="stats">
            <div className="stat place-items-center">
              <div className="stat-title">Seven Days</div>
              <div className={`stat-value ${textColor}`}>{sevenCurrent}</div>
              <div className="stat-desc">
                {sevenIsImprovement ? "↗︎" : "↘︎"} {sevenChange}% (
                {sevenPrevious})
              </div>
            </div>
          </div>
          <div className="stats">
            <div className="stat place-items-center">
              <div className="stat-title">Thirty days</div>
              <div className={`stat-value ${textColor}`}>{thirtyCurrent}</div>
              <div className="stat-desc">
                {thirtyIsImprovement ? "↗︎" : "↘︎"} {thirtyChange}% (
                {thirtyPrevious})
              </div>
            </div>
          </div>
          <div className="stats">
            <div className="stat place-items-center">
              <div className="stat-title">Ninety days</div>
              <div className={`stat-value ${textColor}`}>{ninetyCurrent}</div>
              <div className="stat-desc">
                {ninetyIsImprovement ? "↗︎" : "↘︎"} {ninetyChange}% (
                {ninetyPrevious})
              </div>
            </div>
          </div>
          <div className="stats">
            <div className="stat place-items-center">
              <div className="stat-title">Since start</div>
              <div className={`stat-value ${textColor}`}>{sinceStart}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="stat">
            Created : {new Date(habit.createdAt).toLocaleDateString() ?? "-"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export { HabitPage };
