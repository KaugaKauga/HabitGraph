export type ColorType =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

export const getColorClass = (
  count: number,
  color: ColorType = "purple"
): string => {
  const colorMap: Record<ColorType, Record<number, string>> = {
    slate: {
      0: "bg-slate-100",
      1: "bg-slate-200",
      2: "bg-slate-300",
      3: "bg-slate-400",
      4: "bg-slate-500",
      5: "bg-slate-600",
      6: "bg-slate-700",
      7: "bg-slate-800",
      8: "bg-slate-900",
    },
    gray: {
      0: "bg-gray-100",
      1: "bg-gray-200",
      2: "bg-gray-300",
      3: "bg-gray-400",
      4: "bg-gray-500",
      5: "bg-gray-600",
      6: "bg-gray-700",
      7: "bg-gray-800",
      8: "bg-gray-900",
    },
    zinc: {
      0: "bg-zinc-100",
      1: "bg-zinc-200",
      2: "bg-zinc-300",
      3: "bg-zinc-400",
      4: "bg-zinc-500",
      5: "bg-zinc-600",
      6: "bg-zinc-700",
      7: "bg-zinc-800",
      8: "bg-zinc-900",
    },
    neutral: {
      0: "bg-neutral-100",
      1: "bg-neutral-200",
      2: "bg-neutral-300",
      3: "bg-neutral-400",
      4: "bg-neutral-500",
      5: "bg-neutral-600",
      6: "bg-neutral-700",
      7: "bg-neutral-800",
      8: "bg-neutral-900",
    },
    stone: {
      0: "bg-stone-100",
      1: "bg-stone-200",
      2: "bg-stone-300",
      3: "bg-stone-400",
      4: "bg-stone-500",
      5: "bg-stone-600",
      6: "bg-stone-700",
      7: "bg-stone-800",
      8: "bg-stone-900",
    },
    red: {
      0: "bg-red-100",
      1: "bg-red-200",
      2: "bg-red-300",
      3: "bg-red-400",
      4: "bg-red-500",
      5: "bg-red-600",
      6: "bg-red-700",
      7: "bg-red-800",
      8: "bg-red-900",
    },
    orange: {
      0: "bg-orange-100",
      1: "bg-orange-200",
      2: "bg-orange-300",
      3: "bg-orange-400",
      4: "bg-orange-500",
      5: "bg-orange-600",
      6: "bg-orange-700",
      7: "bg-orange-800",
      8: "bg-orange-900",
    },
    amber: {
      0: "bg-amber-100",
      1: "bg-amber-200",
      2: "bg-amber-300",
      3: "bg-amber-400",
      4: "bg-amber-500",
      5: "bg-amber-600",
      6: "bg-amber-700",
      7: "bg-amber-800",
      8: "bg-amber-900",
    },
    yellow: {
      0: "bg-yellow-100",
      1: "bg-yellow-200",
      2: "bg-yellow-300",
      3: "bg-yellow-400",
      4: "bg-yellow-500",
      5: "bg-yellow-600",
      6: "bg-yellow-700",
      7: "bg-yellow-800",
      8: "bg-yellow-900",
    },
    lime: {
      0: "bg-lime-100",
      1: "bg-lime-200",
      2: "bg-lime-300",
      3: "bg-lime-400",
      4: "bg-lime-500",
      5: "bg-lime-600",
      6: "bg-lime-700",
      7: "bg-lime-800",
      8: "bg-lime-900",
    },
    green: {
      0: "bg-green-100",
      1: "bg-green-200",
      2: "bg-green-300",
      3: "bg-green-400",
      4: "bg-green-500",
      5: "bg-green-600",
      6: "bg-green-700",
      7: "bg-green-800",
      8: "bg-green-900",
    },
    emerald: {
      0: "bg-emerald-100",
      1: "bg-emerald-200",
      2: "bg-emerald-300",
      3: "bg-emerald-400",
      4: "bg-emerald-500",
      5: "bg-emerald-600",
      6: "bg-emerald-700",
      7: "bg-emerald-800",
      8: "bg-emerald-900",
    },
    teal: {
      0: "bg-teal-100",
      1: "bg-teal-200",
      2: "bg-teal-300",
      3: "bg-teal-400",
      4: "bg-teal-500",
      5: "bg-teal-600",
      6: "bg-teal-700",
      7: "bg-teal-800",
      8: "bg-teal-900",
    },
    cyan: {
      0: "bg-cyan-100",
      1: "bg-cyan-200",
      2: "bg-cyan-300",
      3: "bg-cyan-400",
      4: "bg-cyan-500",
      5: "bg-cyan-600",
      6: "bg-cyan-700",
      7: "bg-cyan-800",
      8: "bg-cyan-900",
    },
    sky: {
      0: "bg-sky-100",
      1: "bg-sky-200",
      2: "bg-sky-300",
      3: "bg-sky-400",
      4: "bg-sky-500",
      5: "bg-sky-600",
      6: "bg-sky-700",
      7: "bg-sky-800",
      8: "bg-sky-900",
    },
    blue: {
      0: "bg-blue-100",
      1: "bg-blue-200",
      2: "bg-blue-300",
      3: "bg-blue-400",
      4: "bg-blue-500",
      5: "bg-blue-600",
      6: "bg-blue-700",
      7: "bg-blue-800",
      8: "bg-blue-900",
    },
    indigo: {
      0: "bg-indigo-100",
      1: "bg-indigo-200",
      2: "bg-indigo-300",
      3: "bg-indigo-400",
      4: "bg-indigo-500",
      5: "bg-indigo-600",
      6: "bg-indigo-700",
      7: "bg-indigo-800",
      8: "bg-indigo-900",
    },
    violet: {
      0: "bg-violet-100",
      1: "bg-violet-200",
      2: "bg-violet-300",
      3: "bg-violet-400",
      4: "bg-violet-500",
      5: "bg-violet-600",
      6: "bg-violet-700",
      7: "bg-violet-800",
      8: "bg-violet-900",
    },
    purple: {
      0: "bg-purple-100",
      1: "bg-purple-200",
      2: "bg-purple-300",
      3: "bg-purple-400",
      4: "bg-purple-500",
      5: "bg-purple-600",
      6: "bg-purple-700",
      7: "bg-purple-800",
      8: "bg-purple-900",
    },
    fuchsia: {
      0: "bg-fuchsia-100",
      1: "bg-fuchsia-200",
      2: "bg-fuchsia-300",
      3: "bg-fuchsia-400",
      4: "bg-fuchsia-500",
      5: "bg-fuchsia-600",
      6: "bg-fuchsia-700",
      7: "bg-fuchsia-800",
      8: "bg-fuchsia-900",
    },
    pink: {
      0: "bg-pink-100",
      1: "bg-pink-200",
      2: "bg-pink-300",
      3: "bg-pink-400",
      4: "bg-pink-500",
      5: "bg-pink-600",
      6: "bg-pink-700",
      7: "bg-pink-800",
      8: "bg-pink-900",
    },
    rose: {
      0: "bg-rose-100",
      1: "bg-rose-200",
      2: "bg-rose-300",
      3: "bg-rose-400",
      4: "bg-rose-500",
      5: "bg-rose-600",
      6: "bg-rose-700",
      7: "bg-rose-800",
      8: "bg-rose-900",
    },
  };

  return colorMap[color][count] || colorMap[color][0];
};

export const getTextColorClass = (color: ColorType = "purple"): string => {
  const textColorMap: Record<ColorType, string> = {
    slate: "text-slate-400",
    gray: "text-gray-400",
    zinc: "text-zinc-400",
    neutral: "text-neutral-400",
    stone: "text-stone-400",
    red: "text-red-400",
    orange: "text-orange-400",
    amber: "text-amber-400",
    yellow: "text-yellow-400",
    lime: "text-lime-400",
    green: "text-green-400",
    emerald: "text-emerald-400",
    teal: "text-teal-400",
    cyan: "text-cyan-400",
    sky: "text-sky-400",
    blue: "text-blue-400",
    indigo: "text-indigo-400",
    violet: "text-violet-400",
    purple: "text-purple-400",
    fuchsia: "text-fuchsia-400",
    pink: "text-pink-400",
    rose: "text-rose-400",
  };

  return textColorMap[color] || "text-purple-200";
};
