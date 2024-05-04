import { useRecipifyWindowTitle } from "../useRecipifyWindowTitle.tsx";
import { RecipeBanner } from "./RecipeBanner.tsx";
import { CookingTime } from "./CookingTime.tsx";
import { Instructions } from "./Instructions.tsx";
import { FeedbackForm } from "./FeedbackForm.tsx";
import { H2 } from "../Heading.tsx";
import { Sidebar } from "../Sidebar.tsx";
import { DetailedRecipeDto } from "../api-types.ts";
import FeedbackListLoader from "./FeedbackListLoader.tsx";
import IngredientsSection from "./IngredientsSection.tsx";

type RecipePageContentProps = {
  recipe: DetailedRecipeDto;
};

export default function RecipePageContent({ recipe }: RecipePageContentProps) {
  // React 19: <title>{recipe.title}</title>
  useRecipifyWindowTitle(recipe.title);

  return (
    <div className={"mb-20"}>
      <RecipeBanner recipe={recipe} />
      <div className={"container mx-auto mb-8 mt-8 md:flex md:space-x-12"}>
        <div className={"md:w-2/3"}>
          <CookingTime
            cookTime={recipe.cookTime}
            preparationTime={recipe.preparationTime}
          />
          <IngredientsSection ingredients={recipe.ingredients} />
          <Instructions recipe={recipe} />
        </div>
        <div className={"md:w-1/3"}>
          <Sidebar>
            <H2>Feedback</H2>

            {/*
               TODO

               - Kommentiere die FeedbackListLoader-Komponente ein
               - Kannst Du die Suspense-Grenzen so ziehen, dass NICHT auf den FeedbackListLoader gewartet wird
               - das Rezept soll also in jedem Fall angezeigt werden, auch wenn der FeedbackListLoader
                 seine Daten noch nicht gelesen hat
               - Du kannst zum Testen beide Queries künstlich verlangsamen:
                  - dazu in der demo-config.tsx-Datei die beiden Konstanten auf einen Delay (in ms) setzen:
                    - slowDown_GetRecipe  (für den Rezept-Query)
                    - slowDown_GetFeedbacks  (für das Feedback)
            */}

            {/*<FeedbackListLoader recipeId={recipe.id} />*/}
            <FeedbackForm recipeId={recipe.id} />
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
