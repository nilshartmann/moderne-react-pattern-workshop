"use client";
import PaginationBar from "@/app/components/PaginationBar.tsx";
import { PageButton } from "@/app/components/Button.tsx";
import Link from "next/link";
import { buildUrl } from "@/app/components/material/build-url.ts";
import { useRecipifyWindowTitle } from "@/app/components/useRecipifyWindowTitle.tsx";
import { use } from "react";

type RecipeListPaginationBarProps = {
  pageCountPromise: Promise<{
    totalPages: number;
  }>;
  params: Record<string, string>;
};

export default function RecipeListPaginationBar({
  pageCountPromise,
  params,
}: RecipeListPaginationBarProps) {
  console.log(
    "Rendering RecipeListPaginationBar at ",
    new Date().toLocaleTimeString(),
  );

  const pageCount = use(pageCountPromise);
  const totalPages = pageCount.totalPages;

  const currentPage = parseInt(params.page || "0");

  useRecipifyWindowTitle(`Page ${currentPage} of ${totalPages}`);

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
