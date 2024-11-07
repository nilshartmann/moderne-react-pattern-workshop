"use client";

import { useState } from "react";
import { Ingredient } from "@/app/components/api-types.ts";
import IngredientList from "@/app/components/recipepage/IngredientsList.tsx";
import { saveDefaultServings } from "@/app/components/recipepage/ingredients-preferences.ts";

type ConfigurableIngredientsSection = {
  ingredients: Ingredient[];
  defaultServings: number;
};
export default function ConfigurableIngredientsSection({
  ingredients,
  defaultServings,
}: ConfigurableIngredientsSection) {
  const [servings, setServings] = useState(defaultServings);

  const handleServingsChange = (newServings: number) => {
    setServings(newServings);
    saveDefaultServings(newServings);
  };
  return (
    <>
      <div className={"mb-8 mt-8 flex items-center justify-between"}>
        <h2 className={"font-space text-3xl font-bold"}>Ingredients</h2>
        <div
          className={
            "rounded-lg border border-dotted border-gray-500 p-4 text-lg"
          }
        >
          <button
            className={
              "fa-solid fa-circle-plus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
            }
            onClick={() => handleServingsChange(servings + 1)}
          />
          <span className={"text-gray-500"}> {servings} servings </span>
          <i
            className={
              "fa-solid fa-circle-minus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
            }
            onClick={() => handleServingsChange(servings - 1)}
          />{" "}
        </div>
      </div>
      <IngredientList ingredients={ingredients} servings={servings} />
    </>
  );
}
