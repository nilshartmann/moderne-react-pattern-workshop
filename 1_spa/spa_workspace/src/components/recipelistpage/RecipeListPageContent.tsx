import RecipeListNavBar from "./RecipeListNavBar.tsx";
import RecipeListPaginationBar from "./RecipeListPaginationBar.tsx";
import RecipeList from "./RecipeList.tsx";

export default function RecipeListPageContent() {
  // TODO Übung Search Parameter
  //
  //   Kommentiere 'RecipeListNavBar' und 'RecipeListPaginationBar' ein,
  //     wenn du den OrderButton vervollständigt hast
  //   - Wenn der OrderButton implementiert ist, kannst Du nun
  //     die Sortierung ändern und (auf der Seite unten) eine andere Seite
  //     (1, 2, 3, ...) anspringen
  //   - Wenn alles richtig ist, sollte die Sortierreihenfolge erhalten bleiben,
  //      wenn sich der 'page'-Search-Parameter beim Seitenwechsel ändert
  //      (beim Wechsel von Seite 1 auf 2 der Liste soll die Sortierung natürlich
  //       erhalten bleiben)

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto space-y-8 pb-8 pt-8"}>
        <RecipeListNavBar />

        <RecipeList />

        <RecipeListPaginationBar />
      </div>
    </div>
  );
}
