import { createRootRoute, Outlet } from "@tanstack/react-router";
import { GlobalPageLayout } from "../components/layout/GlobalPageLayout.tsx";

export const Route = createRootRoute({
  component: RootRoute,
});

export default function RootRoute() {
  return (
    <GlobalPageLayout>
      <Outlet />
      {/*<TanStackRouterDevtools position={"bottom-right"} />*/}
      {/*<ReactQueryDevtools buttonPosition={"bottom-right"} />*/}
    </GlobalPageLayout>
  );
}
