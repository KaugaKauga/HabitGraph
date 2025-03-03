const generateDummyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    data.push({ date, count: Math.floor(Math.random() * 5) });
  }
  return data;
};

const getColorClass = (count: number): string => {
  const colorMap: { [key: number]: string } = {
    0: "bg-purple-100",
    1: "bg-purple-200",
    2: "bg-purple-300",
    3: "bg-purple-400",
    4: "bg-purple-500",
    5: "bg-purple-600",
    6: "bg-purple-700",
    7: "bg-purple-800",
    8: "bg-purple-900",
  };
  return colorMap[count] || "bg-purple-100"; // Default to lightest if count is invalid
};

const Graph = () => {
  const data = generateDummyData();
  return (
    <div className="grid grid-cols-20 grid-rows-5 gap-1">
      {data.map((day, index) => (
        <div
          key={index}
          className={`w-4 h-4 ${getColorClass(
            day.count
          )} hover:shadow-md hover:shadow-yellow-400`}
          title={`${day.date.toDateString()}: ${day.count} contributions`}
        />
      ))}
    </div>
  );
};

export { Graph };
