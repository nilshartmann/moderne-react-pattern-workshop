import { createFileRoute } from "@tanstack/react-router";
import RecipeListPageContent from "../../components/recipelistpage/RecipeListPageContent.tsx";
import { RecipePageListParams } from "../../components/recipelistpage/RecipeListRouteParams.ts";
import RecipeListPageContentWrapper from "../../components/recipelistpage/RecipeListPageContentWrapper.tsx";

export const Route = createFileRoute("/recipes/")({
  component: RecipeListPageContentWrapper,
  // TODO:
  //  - Füge die 'validateSearch'-Method hinzu
  //    - Du kannst das fertige Zod-Objekt 'RecipePageListParams' verwenden, um die
  //      übergebenen Search Parameter zu validieren (parse-Methode)
  //    - Als Rückgabe-Wert von 'validateSearch' kannst Du den Rückgabewert von 'parse' verwenden
  //    - Doku: https://tanstack.com/router/latest/docs/framework/react/guide/search-params#validating-and-typing-search-params
});
