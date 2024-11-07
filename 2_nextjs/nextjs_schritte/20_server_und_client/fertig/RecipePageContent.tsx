import { RecipeBanner } from "./RecipeBanner.tsx";
import { CookingTime } from "./CookingTime.tsx";
import { Instructions } from "./Instructions.tsx";
import { DetailedRecipeDto } from "../api-types.ts";
import { Sidebar } from "@/app/components/Sidebar.tsx";
import { H2 } from "@/app/components/Heading.tsx";
import ConfigurableIngredientsSection from "@/app/components/recipepage/ConfigurableIngredientsSection.tsx";
import { getDefaultServings } from "@/app/components/recipepage/ingredients-preferences.ts";

type RecipePageContentProps = {
  recipe: DetailedRecipeDto;
};

export default async function RecipePageContent({
  recipe,
}: RecipePageContentProps) {
  const defaultServings = await getDefaultServings();

  return (
    <div>
      <RecipeBanner recipe={recipe} />
      <div className={"container mx-auto mb-8 mt-8 md:flex md:space-x-12"}>
        <div className={"md:w-2/3"}>
          <CookingTime
            cookTime={recipe.cookTime}
            preparationTime={recipe.preparationTime}
          />
          <ConfigurableIngredientsSection
            ingredients={recipe.ingredients}
            defaultServings={defaultServings}
          />
          <Instructions recipe={recipe} />
        </div>
        <div className={"md:w-1/3"}>
          <Sidebar>
            <H2>Feedback</H2>
            {/*

            TODO:

             -> hier FeedbackList (oder FeedbackListLoader) verwenden,
                um Bewertungen zu laden und anzuzeigen
             --> Mit der Suspense-Komponente experimentieren!

            */}
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
