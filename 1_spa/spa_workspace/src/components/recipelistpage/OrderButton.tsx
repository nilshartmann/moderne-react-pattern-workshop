import { ReactNode } from "react";
import { Button, CheckLabel } from "../Button.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";

// todo: mit getRouteApi("/recipes") die RouteApi holen
const recipeListRoute = getRouteApi("/recipes/");

type OrderButtonProps = {
  children: ReactNode;
  orderBy?: "time" | "likes" | undefined;
};

export function OrderButton({ children, orderBy }: OrderButtonProps) {
  // TODO:
  //   - Hole dir mit getRouteApi("/recipes") die aktuelle RouteAPI.
  //       - Dieser Aufruf muss außerhalb der Komponente erfolgen (s.o.)
  //       - Darauf kannst du dann typsicher useSearch aufrufen
  //   - 'currentOrderBy' soll den aktullen Wert des Search Parameters 'orderBy' aus der URL enthalten
  //   - Verwende 'recipeListRoute.useSearch' um diesen Search Parameter zu lesen
  //     - Das ist die aktuell eingestellte Sortierreihenfolge
  //       Die wird für den Button (nur) benötigt, damit er sich entsprechend darstellen kann
  //        ("angehakt" bzw. "nicht angehakt")
  //
  const currentOrderBy = recipeListRoute.useSearch({
    select(s) {
      return s.orderBy;
    },
  });

  const checked = orderBy === currentOrderBy;
  return (
    <Button checked={checked}>
      {/*
           TODO:

           - Füge der 'Link'-Komponente das  'search'-Property hinzu:
             - Das search-Property soll die bisherigen Search-Parameter enthalten
               (also die, die evtl. bereits in der URL vorhanden sind)
             - und in jedem Fall den Paramter 'orderBy'.
               -  (Den Wert für 'orderBy' kannst du aus dem 'orderBy'-PROPERTY nehmen,
                  das an diese OrderButton-Komponente übergeben wurde)
           - Wenn Du den Link vervollständigt hast, kannst Du in 'RecipeListPageContent.tsx' die beiden
              Komponenten 'RecipeListNavBar' und 'RecipeListPaginationBar' einkommentieren (siehe TODO dort),
              um deinen Code auszuprobieren
         */}
      <Link
        to={"/recipes"}
        disabled={checked}
        search={(s) => ({
          ...s,
          orderBy,
        })}
      >
        <CheckLabel checked={checked}>{children}</CheckLabel>
      </Link>
    </Button>
  );
}
