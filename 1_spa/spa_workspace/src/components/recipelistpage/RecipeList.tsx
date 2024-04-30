import { useGetAllRecipesQuery } from "../use-queries.ts";
import { getRouteApi, MatchRoute } from "@tanstack/react-router";
import { LoadingRecipeCard } from "./LoadingRecipeCard.tsx";
import { RecipeCard } from "./RecipeCard.tsx";

const recipeListRoute = getRouteApi("/recipes/");

export default function RecipeList() {
  const { page, orderBy } = recipeListRoute.useSearch({
    select: (s) => ({
      page: s.page || 0,
      orderBy: s.orderBy,
    }),
  });
  const result = useGetAllRecipesQuery(page, orderBy);
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {result.data.content.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className={
              "h-full transform rounded border border-gray-200 bg-white p-4 shadow-lg transition-all duration-500 ease-in-out hover:drop-shadow-2xl "
            }
          >
            <MatchRoute to={"/"} params={{ recipeId: recipe.id }} pending>
              {(match) => {
                return match ? (
                  <LoadingRecipeCard />
                ) : (
                  <RecipeCard recipe={recipe} />
                );
              }}
            </MatchRoute>
          </div>
        );
      })}
    </div>
  );
}
