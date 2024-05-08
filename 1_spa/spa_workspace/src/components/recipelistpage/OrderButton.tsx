import { ReactNode } from "react";
import { Button, CheckLabel } from "../Button.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";

const recipeListRoute = getRouteApi("/recipes/");

type OrderButtonProps = {
  children: ReactNode;
  orderBy?: "time" | "likes" | undefined;
};

export function OrderButton({ children, orderBy }: OrderButtonProps) {
  const currentOrderBy = recipeListRoute.useSearch({
    select: (currentParams) => currentParams.orderBy,
  });

  const checked = orderBy === currentOrderBy;
  return (
    <Button checked={checked}>
      {/*
           TODO:

           - Füge der 'Link'-Komponente das  'search'-Property hinzu
           - Die neuen Search Parameter sollen aus den bisherigen bestehen
               (also die, die evtl. bereits in der URL vorhanden sind)
           - und neu/aktualisiert soll der 'orderBy' Search Parameter sein
           -   (Der Wert für 'orderBy' ist das 'orderBy'-Property, das an die
               OrderButton-Komponente übergeben wurde)
           - Danach kannst Du in 'RecipeListPageContent.tsx' die beiden
              Komponenten 'RecipeListNavBar' und 'RecipeListPaginationBar' einkommentieren (siehe TODO dort),
              um deinen Code auszuprobieren
         */}
      <Link
        to={"/recipes"}
        disabled={checked}
        search={(currentSeachParams) => ({
          ...currentSeachParams,
          orderBy: orderBy,
        })}
      >
        <CheckLabel checked={checked}>{children}</CheckLabel>
      </Link>
    </Button>
  );
}
