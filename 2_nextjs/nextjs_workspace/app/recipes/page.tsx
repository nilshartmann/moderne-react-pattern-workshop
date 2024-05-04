import { fetchRecipes } from "@/app/components/queries.ts";
import RecipeListNavBar from "@/app/components/recipelistpage/RecipeListNavBar.tsx";
import RecipeListPaginationBar from "@/app/components/recipelistpage/RecipeListPaginationBar.tsx";
import RecipeList from "@/app/components/recipelistpage/RecipeList.tsx";

type RecipeListPageProps = {
  searchParams: Record<string, string>;
};

export default function RecipeListPage({ searchParams }: RecipeListPageProps) {
  const page = parseInt(searchParams.page) || 0;
  // TODO:
  //   - Verwende die fertige 'fetchRecipes'-Funktion, um die Daten für
  //     Übersichtsseite zu laden
  //     - An 'fetchRecipes' kannst Du als ersten Parameter 'page' übergeben
  //   - fetchRecipes liefert ein Promise zurück.
  //   - Render 'RecipeList' und 'RecipeListPaginationBar' und übergib das Promise

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto space-y-8 pb-8 pt-8"}>
        {/*

        TODO:
          - Render RecipeList
          - Render RecipeListPaginationBar
            - hier musst Du das Promise UND die 'searchParams' (unverändert) übergeben

        */}
      </div>
    </div>
  );
}
