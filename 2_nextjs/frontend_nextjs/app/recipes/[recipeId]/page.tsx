import { fetchRecipe } from "@/app/components/queries.ts";
import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type RecipePageProps = {
  params: {
    recipeId: string;
  };
};

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  console.log("LOADING FOR META DATA", params.recipeId);
  const data = await fetchRecipe(params.recipeId);

  if (data) {
    return {
      title: `${data.recipe.title}`,
    };
  }

  return {};
}

export default async function RecipePage({ params }: RecipePageProps) {
  console.log("LOADING FOR PAGE", params.recipeId);
  const recipe = await fetchRecipe(params.recipeId);

  if (!recipe) {
    notFound();
  }

  return <RecipePageContent recipe={recipe.recipe} />;
}
