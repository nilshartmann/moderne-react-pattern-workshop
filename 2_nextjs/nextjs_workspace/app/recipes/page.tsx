import { fetchRecipe, fetchRecipes } from "@/app/components/queries.ts";
import RecipeListNavBar from "@/app/components/recipelistpage/RecipeListNavBar.tsx";
import RecipeListPaginationBar from "@/app/components/recipelistpage/RecipeListPaginationBar.tsx";
import RecipeList from "@/app/components/recipelistpage/RecipeList.tsx";
import { cookies } from "next/headers";

type RecipeListPageProps = {
  searchParams: Record<string, string>;
};

export default async function RecipeListPage() {
  console.log("Rendering RecipeListPage");
  const searchParams = {};
  // const page = parseInt(searchParams.page) || 0;
  const page = 0;
  const recipesPromise = fetchRecipes();

  //

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto space-y-8 pb-8 pt-8"}>
        <RecipeList recipesPromise={recipesPromise} />
        <RecipeListPaginationBar
          pageCountPromise={recipesPromise}
          params={searchParams}
        />
      </div>
    </div>
  );
}
