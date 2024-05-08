import { createFileRoute } from "@tanstack/react-router";
import RecipeListPageContent from "../../components/recipelistpage/RecipeListPageContent.tsx";
import { RecipePageListParams } from "../../components/recipelistpage/RecipeListRouteParams.ts";
import RecipeListPageContentWrapper from "../../components/recipelistpage/RecipeListPageContentWrapper.tsx";

export const Route = createFileRoute("/recipes/")({
  component: RecipeListPageContentWrapper,
  validateSearch: (searchObj) => RecipePageListParams.parse(searchObj),
});
