import { ReactNode } from "react";
import { RecipesPageLayout } from "@/app/components/material/RecipesPageLayout.tsx";
import { Metadata } from "next";
import { fetchRecipe } from "@/app/components/queries.ts";

type RecipesLayoutProps = {
  children: ReactNode;
};

export default function RecipesLayout({ children }: RecipesLayoutProps) {
  return <RecipesPageLayout>{children}</RecipesPageLayout>;
}
