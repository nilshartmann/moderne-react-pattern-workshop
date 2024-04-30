import { useGetRecipeSuspenseQuery } from "../../../components/use-queries.ts";
import { createFileRoute } from "@tanstack/react-router";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();

  const { data } = useGetRecipeSuspenseQuery(recipeId);

  return <RecipePageContent recipe={data.recipe} />;
}
