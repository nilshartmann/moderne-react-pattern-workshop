import Link from "next/link";
import PaginationBar from "@/app/components/PaginationBar.tsx";
import { PageButton } from "@/app/components/Button.tsx";
import { buildUrl } from "@/app/components/material/build-url.ts";
import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import { fetchRecipes } from "@/app/components/queries.ts";
import {
  getValidatedRecipeListSearchParams,
  TRecipePageListParams,
} from "@/app/components/recipelistpage/RecipeListSearchParams.ts";
import RecipeListNavBar from "@/app/components/recipelistpage/RecipeListNavBar.tsx";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";
import RecipeListPaginationBar from "@/app/components/recipelistpage/RecipeListPaginationBar.tsx";

type RecipeListPageProps = {
  searchParams: TRecipePageListParams;
};

export default async function RecipeListPage({
  searchParams,
}: RecipeListPageProps) {
  const params = getValidatedRecipeListSearchParams(searchParams);

  const result = fetchRecipes(params.page, params.orderBy, params.showOnlyIds);

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto space-y-8 pb-8 pt-8"}>
        <RecipeListNavBar />

        <RecipeList recipesPromise={result} />

        <RecipeListPaginationBar
          pageCountPromise={result}
          params={searchParams}
        />
      </div>
    </div>
  );
}

type RecipeListProps = {
  recipesPromise: Promise<PageResponseRecipeDto>;
};

async function RecipeList({ recipesPromise }: RecipeListProps) {
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
