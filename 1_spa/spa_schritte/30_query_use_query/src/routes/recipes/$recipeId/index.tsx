import { fetchRecipe } from "../../../components/use-queries.ts";
import { createFileRoute } from "@tanstack/react-router";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../../../components/LoadingIndicator.tsx";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();

  const result = useQuery({
    queryKey: ["recipes", recipeId],
    queryFn: () => fetchRecipe(recipeId),
  });

  if (result.isSuccess) {
    return <RecipePageContent recipe={result.data.recipe} />;
  }

  if (result.isLoading) {
    return <LoadingIndicator />;
  }

  return <div>There was an error.</div>;
}
