"use client";
import { RecipeDto } from "@/app/components/api-types.ts";
import { useOptimistic, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";
import { increaseLikes } from "@/app/components/recipe-actions.ts";

type LikesWidgetProps = {
  recipe: RecipeDto;
};

export function LikesWidget({ recipe }: LikesWidgetProps) {
  const [likes, setLikes] = useState(recipe.likes);
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, updateOptimisticLikes] = useOptimistic(
    likes,
    (currentLikes, amount: number) => {
      return currentLikes + amount;
    },
  );

  const handleIncreaseLikes = () => {
    startTransition(async () => {
      // updateOptimisticLikes(1);
      // const result = await increaseLikes(recipe.id);
      setLikes(result.newLikes);
    });
  };

  return (
    <p
      onClick={handleIncreaseLikes}
      className={twMerge(
        "me-2 inline-block rounded border border-orange_2 bg-white p-2 text-[15px] text-orange_2 hover:cursor-pointer hover:bg-orange_2 hover:text-white",
        // isPending &&
        //   "border-gray-300 bg-gray-300 hover:cursor-default hover:border-gray-300 hover:bg-gray-300",
      )}
    >
      <i className="fa-regular fa-heart mr-2"></i>
      {likes} (optimistic: {optimisticLikes})
    </p>
  );
}
