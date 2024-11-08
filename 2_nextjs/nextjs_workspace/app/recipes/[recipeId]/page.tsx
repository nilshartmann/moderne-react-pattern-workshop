import { fetchRecipe } from "@/app/components/queries.ts";
import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type RecipePageProps = {
  params: {
    recipeId: string;
  };
};

export default async function RecipePage({ params }: RecipePageProps) {
  return null;
}
