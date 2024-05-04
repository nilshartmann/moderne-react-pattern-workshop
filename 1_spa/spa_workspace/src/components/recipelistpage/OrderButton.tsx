import { ReactNode } from "react";
import { Button, CheckLabel } from "../Button.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";

const recipeListRoute = getRouteApi("/recipes/");

type OrderButtonProps = {
  children: ReactNode;
  orderBy?: "time" | "likes" | undefined;
};

export function OrderButton({ children, orderBy }: OrderButtonProps) {
  // TODO:
  //   - 'currentOrderBy' soll den Wert des Search Parameters 'orderBy' enthalten
  //   - Verwende 'recipeListRoute.useSearch' um diesen Search Parameter zu lesen
  //     - Das ist die aktuell eingestellte Sortierreihenfolge
  //       Die wird für den Button (nur) benötigt, damit er sich entsprechend
  //       darstellen kann
  //
  const currentOrderBy = undefined;

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
      <Link to={"/recipes"} disabled={checked}>
        <CheckLabel checked={checked}>{children}</CheckLabel>
      </Link>
    </Button>
  );
}
