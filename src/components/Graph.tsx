import { HabitEntry } from "../types";
import { ColorType, getColorClass } from "../utils/colorUtils";

type GraphProps = {
  color?: ColorType;
  entries: HabitEntry[];
};

const generateGraphDays = () => {
  const today = new Date();
  const todayDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Calculate how many days back to go to reach the most recent Monday
  // If today is Monday (1), we go back 0 days
  // If today is Sunday (0), we go back 6 days to reach Monday
  const daysToMostRecentMonday = todayDayOfWeek === 0 ? 6 : todayDayOfWeek - 1;

  // We want to show 20 weeks (140 days), but we need to start from a Monday
  // Go back enough days to get 20 complete weeks starting from a Monday
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysToMostRecentMonday - 19 * 7); // 19 weeks back + days to Monday

  // Generate 20 weeks worth of days (140 days)
  const days = [];
  for (let i = 0; i < 140; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }

  return days;
};

const prepareGraphData = (days: Date[], entries: HabitEntry[]) => {
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Set to end of today for comparison

  const dateMap: Record<string, number> = {};

  // Initialize all days with 0 count
  days.forEach((date) => {
    const dateStr = date.toLocaleDateString();
    dateMap[dateStr] = 0;
  });

  // Count entries for each day
  entries.forEach(({ date }) => {
    const formattedDate = new Date(date).toLocaleDateString();
    if (dateMap[formattedDate] !== undefined) {
      dateMap[formattedDate] += 1;
    }
  });

  return days.map((date) => ({
    date: date.toLocaleDateString(),
    count: dateMap[date.toLocaleDateString()] || 0,
    isFuture: date > today,
    actualDate: date,
  }));
};

const Graph = ({ color = "purple", entries }: GraphProps) => {
  const days = generateGraphDays();
  const renderData = prepareGraphData(days, entries);

  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: 20 }).map((_, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-1">
          {Array.from({ length: 7 }).map((_, rowIndex) => {
            const dayIndex = colIndex * 7 + rowIndex;
            const day = renderData[dayIndex];

            if (!day) {
              return (
                <div
                  key={rowIndex}
                  className="w-3 h-3 bg-stone-100 opacity-10"
                />
              );
            }

            const baseClasses = "w-3 h-3 hover:shadow-md";
            const colorClasses = day.isFuture
              ? "opacity-0"
              : `${getColorClass(day.count, color)} ${!day.count && "dark:opacity-20 opacity-80"}`;

            return (
              <div
                key={rowIndex}
                className={`${baseClasses} ${colorClasses}`}
                title={
                  day.isFuture
                    ? `${day.date}: Future date`
                    : `${day.date}: ${day.count} contributions`
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export { Graph };
