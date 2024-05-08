import { createRootRoute, Outlet } from "@tanstack/react-router";
import { GlobalPageLayout } from "../components/layout/GlobalPageLayout.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  component: RootRoute,
});

export default function RootRoute() {
  return (
    <GlobalPageLayout>
      <Outlet />
      {/*<TanStackRouterDevtools position={"bottom-right"} />*/}
      <ReactQueryDevtools buttonPosition={"bottom-right"} />
    </GlobalPageLayout>
  );
}
