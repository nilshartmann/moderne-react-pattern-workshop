import { createFileRoute } from "@tanstack/react-router";
import RecipeListPageContentWrapper from "../../components/recipelistpage/RecipeListPageContentWrapper.tsx";
import { RecipePageListParams } from "../../components/recipelistpage/RecipeListRouteParams.ts";

// TODO:
//  - add validateSearch-Method that uses 'RecipePageListParams' to
//     define and validate the search params for this route
//
export const Route = createFileRoute("/recipes/")({
  component: RecipeListPageContentWrapper,
  validateSearch: (search) => RecipePageListParams.parse(search),
});
