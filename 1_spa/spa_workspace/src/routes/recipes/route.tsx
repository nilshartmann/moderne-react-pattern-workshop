import * as React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RecipesPageLayout } from "../../components/material/RecipesPageLayout.tsx";

export const Route = createFileRoute("/recipes")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RecipesPageLayout>
      <Outlet />
    </RecipesPageLayout>
  );
}
