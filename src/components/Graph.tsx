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

const Graph = () => {
  const data = generateDummyData();

  return (
    <div className="grid grid-cols-20 grid-rows-5 gap-1">
      {data.map((day, index) => (
        <div
          key={index}
          className="w-3 h-3 bg-emerald-400"
          title={`${day.date.toDateString()}: ${day.count} contributions`}
        />
      ))}
    </div>
  );
};

export { Graph };
