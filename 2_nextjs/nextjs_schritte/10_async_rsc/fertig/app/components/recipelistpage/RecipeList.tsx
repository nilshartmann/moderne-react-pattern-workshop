import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";

type RecipeListProps = {
  recipesPromise: Promise<PageResponseRecipeDto>;
};

export default async function RecipeList({ recipesPromise }: RecipeListProps) {
  console.log("Rendering RecipeList at ", new Date().toLocaleTimeString());

  const result = await recipesPromise;
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {result.content.map((recipe) => {
        return (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
}
