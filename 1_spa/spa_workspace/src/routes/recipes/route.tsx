import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes")({
  component: RecipesLayout,
});

function RecipesLayout() {
  return (
    <div>
      <p>LAYOUT!!!!!!!!!!!</p>
      <Outlet />
    </div>
  );
}
