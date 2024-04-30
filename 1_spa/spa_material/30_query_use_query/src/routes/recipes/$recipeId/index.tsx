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
  //     - Der queryKey soll aus 'recipes' und der recipeId bestehen
  //     - Als queryFn kannst Du die fertige Funktion 'fetchRecipe' verwenden
  //     - Wenn der Query erfolgreich war, kannst Du die RecipePageContent-Komponente rendern:
  //        - dieser musst Du 'data.recipe' aus dem Query-Ergebnis übergeben
  //     - Wenn der Query noch lädt gib eine entsprechende Meldung aus
  //       - Den Lade-Zustand kannst Du testen, in dem Du den Query künstlich verlangsamst.
  //           - Dazu kannst Du als zweiten Parameter eine Verzögerung in Millisekunden als
  //             2. Parameter an 'fetchRecipe' übergeben
  //

  return <div>...</div>;
}