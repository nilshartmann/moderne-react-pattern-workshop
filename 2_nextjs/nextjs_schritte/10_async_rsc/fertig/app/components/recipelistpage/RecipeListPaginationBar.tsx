import PaginationBar from "@/app/components/PaginationBar.tsx";
import { PageButton } from "@/app/components/Button.tsx";
import Link from "next/link";
import { buildUrl } from "@/app/components/material/build-url.ts";

type RecipeListPaginationBarProps = {
  pageCountPromise: Promise<{
    totalPages: number;
  }>;
  params: Record<string, string>;
};

export default async function RecipeListPaginationBar({
  pageCountPromise,
  params,
}: RecipeListPaginationBarProps) {
  console.log(
    "Rendering RecipeListPaginationBar at ",
    new Date().toLocaleTimeString(),
  );

  const pageCount = await pageCountPromise;
  const totalPages = pageCount.totalPages;

  const currentPage = parseInt(params.page || "0");

  return (
    <div className={"mt-8 flex justify-center"}>
      <PaginationBar totalPages={totalPages} currentPage={currentPage}>
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
