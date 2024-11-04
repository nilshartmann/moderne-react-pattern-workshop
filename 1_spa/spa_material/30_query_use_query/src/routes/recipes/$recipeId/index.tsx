import { fetchRecipe } from "../../../components/use-queries.ts";
import { createFileRoute } from "@tanstack/react-router";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();

  // TODO:
  //
  //   - Verwende "useQuery", um das Rezept mit der Id 'recipeId' zu laden
  //     - Das queryKey-Array soll zwei Einträge haben:
  //        1. der String 'recipes'
  //        2. die recipeId dieser Route
  //     - Als queryFn musst du eine Funktion implementieren, die entweder mit "fetch" oder "ky" Daten liest
  //        (ky ist wahrscheinlich einfacher)
  //     - Der Endpunkt ist "/api/recipes/RECIPE_ID"
  //     - Das Ergebnis ist vom (Zod-/TypeScript-)Typ "GetRecipeResponse". Dieser ist schon fertig
  //     - Verwende daran die "parse"-Methode, um das gelesene Objekt zu validieren und den korrekten Typ
  //       zurückzuliefenr
  //     - Wenn der Query erfolgreich war, kannst Du die RecipePageContent-Komponente rendern:
  //        - dieser musst Du 'data.recipe' aus dem Query-Ergebnis übergeben
  //     - Wenn der Query noch lädt gib eine entsprechende Meldung aus
  //       - Den Lade-Zustand kannst Du testen, in dem Du den Query künstlich verlangsamst.
  //           - Dazu kannst Du im Endpunkt als Query-Parameter 'slowdown=MS' setzen, z.B.
  //                 "api/recipes/40?slowdown=2000" würde 2 Sekunden warten, bevor das Ergebnis vom Server kommt
  //

  return <div>...</div>;
}
