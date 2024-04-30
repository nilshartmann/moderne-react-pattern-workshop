import PaginationBar from "@/app/components/PaginationBar.tsx";
import { PageButton } from "@/app/components/Button.tsx";
import Link from "next/link";
import { buildUrl } from "@/app/components/material/build-url.ts";
import { TRecipePageListParams } from "@/app/components/recipelistpage/RecipeListSearchParams.ts";

type RecipeListPaginationBarProps = {
  pageCountPromise: Promise<{
    totalPages: number;
  }>;
  params: TRecipePageListParams;
};

export default function RecipeListPaginationBar({
  pageCountPromise,
  params,
}: RecipeListPaginationBarProps) {
  const totalPagesPromise = pageCountPromise.then((t) => t.totalPages);
  const currentPage = params.page || 0;

  return (
    <div className={"flex justify-center"}>
      <PaginationBar
        totalPagesPromise={totalPagesPromise}
        currentPage={currentPage}
      >
        {(btn) =>
          btn.disabled ? (
            <PageButton state={btn} />
          ) : (
            <Link href={buildUrl("/recipes", { ...params, page: btn.page })}>
              <PageButton state={btn} />
            </Link>
          )
        }
      </PaginationBar>
    </div>
  );
}
