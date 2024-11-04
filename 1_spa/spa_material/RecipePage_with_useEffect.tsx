import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DetailedRecipeDto, RecipeDto } from "../../../components/api-types.ts";
import { fetchRecipe } from "../../../components/use-queries.ts";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";
import ky from "ky";
import { GetRecipeResponse } from "../spa_frontend/src/components/api-types";
export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const [recipe, setRecipe] = useState<GetRecipeResponse | null>(null);
  const [isPending, setIsPending] = useState(true);
  const { recipeId } = Route.useParams();

  useEffect(() => {
    ky.get(`/api/recipes/${recipeId}?slowdown=800`)
      .json()
      .then((json) => GetRecipeResponse.parse(json))
      .then((recipe) => setRecipe(recipe))
      .finally(() => setIsPending(false));
  }, [recipeId]);

  if (isPending || !recipe) {
    return <div>Recipe {recipeId} is loading</div>;
  }

  return <RecipePageContent recipe={recipe} />;
}
