import { createFileRoute } from "@tanstack/react-router";
import { HabitPage } from "../features/habit-page/HabitPage";

export const Route = createFileRoute("/habit/$habitId")({
  component: HabitPage,
});
