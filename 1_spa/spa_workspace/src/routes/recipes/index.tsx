import { createFileRoute } from "@tanstack/react-router";
import RecipeListPageContent from "../../components/recipelistpage/RecipeListPageContent.tsx";
import { RecipePageListParams } from "../../components/recipelistpage/RecipeListRouteParams.ts";

// TODO:
//  - add validateSearch-Method that uses 'RecipePageListParams' to
//     define and validate the search params for this route
//
export const Route = createFileRoute("/recipes/")({
  component: RecipeListPageContent,
  validateSearch: (search) => RecipePageListParams.parse(search),
});
