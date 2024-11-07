import { Ingredient } from "@/app/components/api-types.ts";
import IngredientList from "@/app/components/recipepage/IngredientsList.tsx";
import { useState } from "react";

type ConfigurableIngredientsSection = {
  ingredients: Ingredient[];
  defaultServings?: number;
};
export default function ConfigurableIngredientsSection({
  ingredients,
  defaultServings = 4,
}: ConfigurableIngredientsSection) {
  // todo:
  //   - "use client"
  //   - servings auf dem Server speichern
  //   - Netzwerkverkehr!
  //   - In RecipePageContent 'defaultServings'
  //      vom Server laden und als Property übergeben
  //
  const [servings, setServings] = useState(defaultServings);

  const handleServingsChange = (newServings: number) => {
    setServings(newServings);

    // todo: "Speichern" auf dem Server
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
          />
          <span className={"text-gray-500"}> {servings} servings </span>
          <i
            className={
              "fa-solid fa-circle-minus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
            }
          />{" "}
        </div>
      </div>
      <IngredientList ingredients={ingredients} servings={servings} />
    </>
  );
}
