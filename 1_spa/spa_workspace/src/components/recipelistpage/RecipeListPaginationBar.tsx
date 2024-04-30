import PaginationBar from "../PaginationBar.tsx";
import PaginationButton from "./PaginationButton.tsx";
import { useGetTotalPageCountQuery } from "../use-queries.ts";
import { getRouteApi } from "@tanstack/react-router";

const recipeListRoute = getRouteApi("/recipes/");

export default function RecipeListPaginationBar() {
  const { page, orderBy } = recipeListRoute.useSearch({
    select: (s) => ({
      page: s.page || 0,
      orderBy: s.orderBy,
    }),
  });

  const totalPages = useGetTotalPageCountQuery(page, orderBy);

  return (
    <div className={"flex justify-center"}>
      <PaginationBar
        totalPages={totalPages === -1 ? 10 : totalPages}
        currentPage={page}
        disabled={totalPages === -1}
      >
        {(btn) => <PaginationButton btn={btn} />}
      </PaginationBar>
    </div>
  );
}
