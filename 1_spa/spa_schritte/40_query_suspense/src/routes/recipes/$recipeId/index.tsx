import { fetchRecipe } from "../../../components/use-queries.ts";
import { createFileRoute } from "@tanstack/react-router";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();

  const result = useSuspenseQuery({
    queryKey: ["recipes", recipeId],
    queryFn: () => fetchRecipe(recipeId),
  });

  return <RecipePageContent recipe={result.data.recipe} />;
}
