import { useRef, useState } from "react";
import { useGraphStore } from "../../store";
import { useNavigate } from "@tanstack/react-router";
import { ColorType, colorTypes, getColorClass } from "../../utils/colorUtils";

const CreateCategory = () => {
  const { addGraph } = useGraphStore();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const trueFalseRef = useRef<HTMLInputElement>(null);
  const higherIsBetterRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setColor] = useState<ColorType>("indigo");

  const handleCreate = () => {
    const name = nameRef.current?.value.trim();
    const isTrueFalse = trueFalseRef.current?.checked || false;
    const isHigherBetter = higherIsBetterRef.current?.checked || false;

    if (!name) {
      alert("Please enter a habit name.");
      nameRef.current?.focus();
      return;
    }

    addGraph({ name, isTrueFalse, isHigherBetter, color: selectedColor });
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="space-y-2 h-full flex flex-col items-center justify-center">
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">Habit</legend>
        <input
          ref={nameRef}
          type="text"
          className="input w-full"
          placeholder="Name of the habit I want to track"
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
  );
};

export { CreateCategory };
