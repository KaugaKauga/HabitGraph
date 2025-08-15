import { useRef, useState } from "react";
import { useGraphStore } from "../../store";
import { Link, useNavigate } from "@tanstack/react-router";
import { ColorType, colorTypes, getColorClass } from "../../utils/colorUtils";
import arrowLeft from "../../assets/arrow-left.svg";
import arrowLeftDark from "../../assets/arrow-left-dark.svg";

const CreateHabit = () => {
  const {
    addGraph,
    theme: { effectiveTheme },
  } = useGraphStore();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const trueFalseRef = useRef<HTMLInputElement>(null);
  const higherIsBetterRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setColor] = useState<ColorType>("indigo");

  const arrowLeftIcon =
    effectiveTheme === "synthwave" ? arrowLeftDark : arrowLeft;

  const handleCreate = () => {
    const name = nameRef.current?.value.trim();
    const isTrueFalse = trueFalseRef.current?.checked || false;
    const isHigherBetter = higherIsBetterRef.current?.checked || false;

    if (!name) {
      alert(`A habit needs a name 🤔`);
      nameRef.current?.focus();
      return;
    }

    addGraph({ name, isTrueFalse, isHigherBetter, color: selectedColor });
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex justify-between mb-8">
        <Link className="link" to="/">
          <img src={arrowLeftIcon} alt="Home" className="size-[1.2em]" />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 justify-center flex flex-col items-center p-2">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Habit</legend>
          <input
            ref={nameRef}
            type="text"
            className="input w-full"
            placeholder="Name of the habit to track"
            minLength={2}
            maxLength={20}
          />
          <p className="fieldset-label">
            Something like: Workout, Eat Kiwi, Veg meals
          </p>
        </fieldset>
        <div className="flex justify-between w-full">
          <fieldset className="fieldset">
            <label className="fieldset-label">
              <input ref={trueFalseRef} type="checkbox" className="checkbox" />
              True / False
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <label className="fieldset-label">
              <input
                ref={higherIsBetterRef}
                type="checkbox"
                defaultChecked
                className="checkbox"
              />
              Higher is better
            </label>
          </fieldset>
        </div>
        <div className="flex gap-4 flex-wrap">
          {colorTypes.map((color) => (
            <div
              className={`${getColorClass(3, color)} ${color === selectedColor ? "w-6 h-6" : "w-4 h-4"}`}
              key={color}
              onClick={() => setColor(color)}
            />
          ))}
        </div>
        <button className="btn btn-wide" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export { CreateHabit };
