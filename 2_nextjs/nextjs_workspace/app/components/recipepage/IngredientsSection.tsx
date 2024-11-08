import { Ingredient } from "@/app/components/api-types.ts";
import IngredientList from "@/app/components/recipepage/IngredientsList.tsx";
import { twMerge } from "tailwind-merge";

type IngredientsProps = {
  ingredients: Ingredient[];
};
export default function IngredientsSection({ ingredients }: IngredientsProps) {
  const servings = 4;
  return (
    <>
      <div className={"mb-8 mt-8 flex items-center justify-between"}>
        <h2 className={"font-space text-3xl font-bold"}>Ingredients</h2>
        <div
          className={
            "rounded-lg border border-dotted border-gray-500 p-4 text-lg"
          }
        >
          <i
            className={
              "fa-solid fa-circle-plus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
            }
          />
          <span className={"text-gray-500 "}> {servings} servings </span>
          <i
            className={twMerge(
              "fa-solid fa-circle-minus cursor-pointer text-orange_2 hover:text-orange_2-500",
              servings < 2 &&
                "cursor-default text-gray-300 hover:text-gray-300",
            )}
          />{" "}
        </div>
      </div>
      <IngredientList ingredients={ingredients} servings={servings} />
    </>
  );
}
