import { ColorType, getColorClass } from "../utils/colorUtils";

interface GraphProps {
  color?: ColorType;
}

const generateDummyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    data.push({ date, count: Math.floor(Math.random() * 9) });
  }
  return data;
};

const Graph = ({ color = "purple" }: GraphProps) => {
  const data = generateDummyData();
  return (
    <div className="grid grid-cols-20 grid-rows-5 gap-2">
      {data.map((day, index) => (
        <div
          key={index}
          className={`w-4 h-4 ${getColorClass(
            day.count,
            color
          )} hover:shadow-md hover:shadow-purple-400`}
          title={`${day.date.toDateString()}: ${day.count} contributions`}
        />
      ))}
    </div>
  );
};

export { Graph };
