import { z } from "zod";

// type RecipeListSearchParams = {
//   // Im zod-Typen sollte page nicht nur optional sein, sondern auch einen mindest Wert von 0 haben
//   //  (es gibt keine negativen page-Angaben)
//   page?: number;
//
//   orderBy?: "time" | "like";
//
//   bookmarkId: string | null;
// };

const RecipeListSearchParams = z.object({
  page: z.number().min(0).optional(),
  orderBy: z.enum(["time", "like"]).optional(),
  bookmarkId: z.string().nullable(),
});

type RecipeListSearchParams = z.infer<typeof RecipeListSearchParams>;

// todo:
//
//  - Beschreibe mit zod das "RecipeListSearchParams".
//    - Das Schema soll dem TypeScript-Typen "RecipeListSearchParams" von oben entsprechen
//
//  - Kommentiere die Typ-Definition von RecipeListSearchParams oben aus
//
//  - Lass dir von zod den Typescript-Typen für deine Objekt-Beschreibung geben:
//    -  type RecipeListSearchParams = z.infer<typeof RecipeListSearchParams>;
//
//    (Hinweis: ein TypeScript 'type' und eine JavaScript Variable können denselben Namen haben,
//     deswegen kann hier der Name des TypeScript-Typen auch dem Namen des zod-Objekts entsprechen)
//
//  - Wenn du den zod-Typen korrekt definiert hast, dürfte es in dieser Datei weiterhin keinen Compile-
//     Fehler geben, da der zod-Typ ja identisch mit dem TypeScript-Typen sein sollte.
//
//  - Ersetze in onRouteChange den Type-Cast durch den "parse"-Aufruf deines Zod-Typen.
//     Auch hier sollte dann kein Compile-Fehler auftreten

declare function createSearchParams(): unknown;

function onRouteChange() {
  // wir tun hier so, als ob createSearchParams eine Funktion des Routers wäre,
  // die uns ein Objekt mit den aktuellen Such-Parametern gibt, mit denen
  // wir irgendwas tun möchten
  const params = createSearchParams();

  // was passiert, wenn du den Type-Cast ("as RecipeListSearchParams")
  // hier entfernst?
  //
  // -> Ersetze den Type-Cast durch einen Aufruf von 'parse' auf deinem Zod-Objekt

  handleSearchParams(params as RecipeListSearchParams);
}

function handleSearchParams(p: RecipeListSearchParams) {
  // exemplarisch den RecipeListSearchParams Typen verwenden, um sicherzustellen,
  // dass er auch mit zod korrekt erzeugt wurde

  function handlePage(_?: number) {
    // ...
  }

  function handleOrder(_?: "time" | "like") {
    // ...
  }

  function handleBookmarkId(_: string | null) {
    // ...
  }

  handlePage(p.page);
  handleBookmarkId(p.bookmarkId);
  handleOrder(p.orderBy);
}

onRouteChange();
