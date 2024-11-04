import { getRouteApi } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

type BookmarkButtonProps = {
  recipeId: string;
};

const recipeListRoute = getRouteApi("/recipes/");

export function BookmarkButton({ recipeId }: BookmarkButtonProps) {
  console.log("Rendering BookmarkButton for Recipe", recipeId);

  const navigate = recipeListRoute.useNavigate();

  // todo:
  // 0. In RecipePageListParams bookmarkId hinzufügen
  //   bookmarkId: z.string().optional(),
  // 1. currentBookmarkId abfragen
  //  recipeListRoute.useSearch({   select: (s) => s.bookmarkId });
  // 2. navigate um URL zu setzen
  // 3. RecipeCard BookmarkButton
  // 4. RecipeCard memo
  // 5. direkt "isBookmarked" abfragen

  const currentBookmarkId = "";

  const isBookmarked = currentBookmarkId === recipeId;

  const handleOnBookmarkClick = () => {
    navigate({
      search: (s) => ({
        ...s,
        // todo: bookmarkId
      }),
    });
  };

  return (
    <BookmarkIcon
      isBookmarked={isBookmarked}
      onToggleBookmark={handleOnBookmarkClick}
    />
  );
}

type BookmarkIconProps = {
  isBookmarked?: boolean;
  onToggleBookmark(): void;
};
function BookmarkIcon({ isBookmarked, onToggleBookmark }: BookmarkIconProps) {
  return (
    <div className={"absolute right-8 top-8 "}>
      <div
        className={
          "flex h-9 w-9 items-center justify-center rounded-full bg-white"
        }
        onClick={(e) => {
          e.preventDefault();
          onToggleBookmark();
        }}
      >
        <i
          className={twMerge(
            "fa-solid fa-bookmark text-lg text-gray-300 transition-all duration-500 ease-in-out hover:text-orange_2",
            isBookmarked && "text-green hover:text-green",
          )}
        ></i>
      </div>
    </div>
  );
}
