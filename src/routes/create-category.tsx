import { createFileRoute } from "@tanstack/react-router";
import { CreateCategory } from "../features/create-category/CreateCategory";

export const Route = createFileRoute("/create-category")({
  component: CreateCategory,
});
