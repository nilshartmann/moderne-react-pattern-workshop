import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DetailedRecipeDto, RecipeDto } from "../../../components/api-types.ts";
import { fetchRecipe } from "../../../components/use-queries.ts";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const [recipe, setRecipe] = useState<DetailedRecipeDto | null>(null);
  const [isPending, setIsPending] = useState(true);
  const { recipeId } = Route.useParams();

  useEffect(() => {
    fetchRecipe(recipeId)
      .then((r) => setRecipe(r.recipe))
      .finally(() => setIsPending(false));
  }, [recipeId]);

  if (isPending || !recipe) {
    return <div>Recipe {recipeId} is loading</div>;
  }

  return <RecipePageContent recipe={recipe} />;
}
