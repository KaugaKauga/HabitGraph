import { GraphEntry } from "../types";
import { ColorType, getColorClass } from "../utils/colorUtils";

type GraphProps = {
  color?: ColorType;
  entries: GraphEntry[];
};

const generateLast100Days = () => {
  const today = new Date();
  return Array.from({ length: 140 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toLocaleDateString();
  }).reverse();
};

const prepareGraphData = (last100Days: string[], entries: GraphEntry[]) => {
  const dateMap: Record<string, number> = Object.fromEntries(
    last100Days.map((date) => [date, 0]),
  );

  entries.forEach(({ date }) => {
    const formattedDate = new Date(date).toLocaleDateString();
    if (dateMap[formattedDate] !== undefined) {
      dateMap[formattedDate] += 1;
    }
  });

  return last100Days.map((date) => ({
    date,
    count: dateMap[date] || 0,
  }));
};

const Graph = ({ color = "purple", entries }: GraphProps) => {
  const last100Days = generateLast100Days();
  const renderData = prepareGraphData(last100Days, entries);

  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: 20 }).map((_, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-1">
          {Array.from({ length: 7 }).map((_, rowIndex) => {
            const dayIndex = colIndex * 7 + rowIndex;
            const day = renderData[dayIndex];
            return day ? (
              <div
                key={rowIndex}
                className={`w-3 h-3 ${getColorClass(day.count, color)} hover:shadow-md`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ) : (
              <div key={rowIndex} className="w-3 h-3 bg-stone-100" />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export { Graph };
