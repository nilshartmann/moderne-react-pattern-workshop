import { getRouteApi } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

type BookmarkButtonProps = {
  recipeId: string;
};

const recipeListRoute = getRouteApi("/recipes/");

export function BookmarkButton({ recipeId }: BookmarkButtonProps) {
  console.log("Rendering BookmarkButton for Recipe", recipeId);

  const navigate = recipeListRoute.useNavigate();
  // const currentlyBookmarked = recipeListRoute.useSearch({
  //   select: (s) => s.bookmarkId,
  // });
  //
  const currentlyBookmarked = recipeListRoute.useSearch({
    select: (s) => s.bookmarkId === recipeId,
  });

  // const isBookmarked = currentlyBookmarked === recipeId;

  const handleOnBookmarkClick = () => {
    navigate({
      search: (s) => ({
        ...s,
        bookmarkId: currentlyBookmarked ? undefined : recipeId,
      }),
    });
  };

  return (
    <BookmarkIcon
      isBookmarked={currentlyBookmarked}
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
