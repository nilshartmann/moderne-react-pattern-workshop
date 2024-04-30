import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();

  return <h1>Rezept: {recipeId}</h1>;
}
