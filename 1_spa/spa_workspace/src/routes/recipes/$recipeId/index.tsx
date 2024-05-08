import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { fetchRecipe } from "../../../components/use-queries.ts";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { GlobalLoadingIndicator } from "../../../components/material/GlobalLoadingIndicator.tsx";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePageWrapper,
});

function RecipePageWrapper() {
  return (
    <Suspense fallback={<GlobalLoadingIndicator />}>
      <RecipePage />
    </Suspense>
  );
}

function RecipePage() {
  const { recipeId } = Route.useParams();

  // const user = useCurrentUser();

  // Laden der Bewertung

  const queryClient = useQueryClient();

  // queryClient.ensureQueryData({       // 4000
  //   queryKey: ["FEEDBACK", recipeId],
  //   queryFn: () => fetchRecipe(recipeId),
  // });

  const result = useSuspenseQuery({
    // 1000
    queryKey: ["recipes", recipeId],
    queryFn: () => fetchRecipe(recipeId),
  });

  return <RecipePageContent recipe={result.data.recipe} />; // 4000

  // const [recipe, setRecipe] = useState<DetailedRecipeDto | null>(null);
  // const [isPending, setIsPending] = useState(true);
  // const { recipeId } = Route.useParams();
  //
  // useEffect(() => {
  //   fetchRecipe(recipeId)
  //     .then((r) => setRecipe(r.recipe))
  //     .finally(() => setIsPending(false));
  // }, [recipeId]);
  //
  // if (isPending || !recipe) {
  //   return <div>Recipe {recipeId} is loading</div>;
  // }
}
