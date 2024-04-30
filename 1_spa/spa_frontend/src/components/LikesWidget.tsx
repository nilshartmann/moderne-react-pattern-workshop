import { twMerge } from "tailwind-merge";
import { RecipeDto } from "./api-types.ts";
import { useLikeMutation } from "./use-queries.ts";

type LikesWidgetProps = {
  recipe: RecipeDto;
};

export function LikesWidget({ recipe }: LikesWidgetProps) {
  const likeMutation = useLikeMutation(recipe.id);

  const isPending = likeMutation.isPending;

  const handleIncreaseLikes = async () => {
    likeMutation.mutate();
    // const result = await increaseLikes(recipe.id);
    // setLikes(result.newLikes);
  };

  return (
    <p
      onClick={isPending ? undefined : handleIncreaseLikes}
      className={twMerge(
        "me-2 inline-block rounded border border-orange_2 bg-white p-2 text-[15px] text-orange_2 hover:cursor-pointer hover:bg-orange_2 hover:text-white",
        isPending &&
          "border-gray-300 bg-gray-300 hover:cursor-default hover:border-gray-300 hover:bg-gray-300",
      )}
    >
      <i className="fa-regular fa-heart mr-2"></i>
      {recipe.likes}
    </p>
  );
}
