import { createFileRoute } from "@tanstack/react-router";
import { CreateHabit } from "../features/create-category/CreateHabit";

export const Route = createFileRoute("/create-habit")({
  component: CreateHabit,
});
