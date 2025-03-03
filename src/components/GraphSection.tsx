import { ColorType } from "../utils/colorUtils";
import { Graph } from "./Graph";

type GraphProps = {
  color?: ColorType;
  title: string;
};

const GraphSection = ({ color, title }: GraphProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold lowercase text-violet-300">{title}</h2>
      <Graph color={color} />
    </div>
  );
};

export { GraphSection };
