"use client";
import PaginationBar from "@/app/components/PaginationBar.tsx";
import { PageButton } from "@/app/components/Button.tsx";
import Link from "next/link";
import { buildUrl } from "@/app/components/material/build-url.ts";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import { useRecipifyWindowTitle } from "@/app/components/useRecipifyWindowTitle.tsx";

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
  console.log("RecipeListPaginationBar wird gerendert");
  const totalPages = use(pageCountPromise).totalPages;

  useRecipifyWindowTitle("Browser Titel!!!");

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
