import { ColorType, getTextColorClass } from "../utils/colorUtils";
import { Graph } from "./Graph";

type GraphProps = {
  color?: ColorType;
  title: string;
};

const GraphSection = ({ color, title }: GraphProps) => {
  const textColor = getTextColorClass(color);
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 justify-between">
        <h2 className={`text-2xl font-bold lowercase ${textColor}`}>{title}</h2>
        <svg
          className={`w-6 h-6 ${textColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <Graph color={color} />
    </div>
  );
};

export { GraphSection };
