"use client";
import { RecipeDto } from "@/app/components/api-types.ts";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type LikesWidgetProps = {
  recipe: RecipeDto;
};

export function LikesWidget({ recipe }: LikesWidgetProps) {
  const [likes, setLikes] = useState(recipe.likes);

  // todo:
  //  - Wenn der Aufruf deiner Action funktioniert, kannst Du
  //    eine Transition einfügen, so dass die 'isPending'-Information
  //    über die Transition verwaltet wird?
  // - Wenn auch die Transition funktioniert, kannst Du ein "optimistisches" Ergebnis
  //    mit "useOptimistic" zurückliefern?
  const isPending = false;

  const handleIncreaseLikes = () => {
    // todo: rufe die increaseLikes Server-Action-Funktion auf
    //       die Funktion liefert ein Objekt zurück, in dem die 'newLikes'
    //       vorhanden sind.
    //       Setze die newLikes in den State
    //
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
      {likes}
    </p>
  );
}
