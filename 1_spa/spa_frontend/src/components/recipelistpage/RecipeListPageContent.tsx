import RecipeListNavBar from "./RecipeListNavBar.tsx";
import RecipeListPaginationBar from "./RecipeListPaginationBar.tsx";
import RecipeList from "./RecipeList.tsx";

export default function RecipeListPageContent() {
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
