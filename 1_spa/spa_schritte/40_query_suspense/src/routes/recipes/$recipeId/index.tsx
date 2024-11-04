import { fetchRecipe } from "../../../components/use-queries.ts";
import { createFileRoute } from "@tanstack/react-router";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GetRecipeResponse } from "../../../../../../spa_frontend/src/components/api-types";
import ky from "ky";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();

  const result = useSuspenseQuery({
    queryKey: ["recipes", recipeId],
    async queryFn() {
      const recipe = await ky.get(`/api/recipes/${recipeId}`).json();
      return GetRecipeResponse.parse(recipe);
    },
  });

  return <RecipePageContent recipe={result.data.recipe} />;
}
