import { ColorType, getColorClass } from "../utils/colorUtils";

interface GraphProps {
  color?: ColorType;
}

const fakeData = [
  { id: "1", categoryId: "veg", date: "2025-02-25T09:30:00+01:00" },
  { id: "2", categoryId: "veg", date: "2025-02-25T12:15:00+01:00" },
  { id: "3", categoryId: "veg", date: "2025-02-25T18:45:00+01:00" },
  { id: "4", categoryId: "veg", date: "2025-02-22T11:20:00+01:00" },
  { id: "5", categoryId: "veg", date: "2025-02-21T13:05:00+01:00" },
  { id: "6", categoryId: "veg", date: "2025-02-20T19:30:00+01:00" },
  { id: "7", categoryId: "veg", date: "2025-02-19T08:45:00+01:00" },
  { id: "8", categoryId: "veg", date: "2025-02-18T14:25:00+01:00" },
  { id: "9", categoryId: "veg", date: "2025-02-17T17:10:00+01:00" },
  { id: "10", categoryId: "veg", date: "2025-02-16T20:50:00+01:00" },
];

const generateLast100Days = () => {
  const today = new Date();
  return Array.from({ length: 100 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toLocaleDateString();
  }).reverse();
};

const prepareGraphData = (last100Days: string[]) => {
  const dateMap: Record<string, number> = Object.fromEntries(
    last100Days.map((date) => [date, 0])
  );

  fakeData.forEach(({ date }) => {
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

const Graph = ({ color = "purple" }: GraphProps) => {
  const last100Days = generateLast100Days();
  const data = prepareGraphData(last100Days);

  return (
    <div className="grid grid-cols-20 grid-rows-5 gap-1 w-full">
      {data.map((day, index) => (
        <div
          key={index}
          className={`w-3 h-3 ${getColorClass(
            day.count,
            color
          )} hover:shadow-md`}
          title={`${day.date}: ${day.count} contributions`}
        />
      ))}
    </div>
  );
};

export { Graph };
