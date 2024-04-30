import { createFileRoute } from "@tanstack/react-router";
import RecipeListPageContent from "../../components/recipelistpage/RecipeListPageContent.tsx";
import { RecipePageListParams } from "../../components/recipelistpage/RecipeListRouteParams.ts";

export const Route = createFileRoute("/recipes/")({
  component: RecipeListPageContent,
});
