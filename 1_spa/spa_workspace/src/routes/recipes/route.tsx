import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RecipesPageLayout } from "../../components/material/RecipesPageLayout.tsx";
import { Suspense } from "react";
import { GlobalLoadingIndicator } from "../../components/material/GlobalLoadingIndicator.tsx";

export const Route = createFileRoute("/recipes")({
  component: () => (
    <RecipesPageLayout>
      <Outlet />
    </RecipesPageLayout>
  ),
});
