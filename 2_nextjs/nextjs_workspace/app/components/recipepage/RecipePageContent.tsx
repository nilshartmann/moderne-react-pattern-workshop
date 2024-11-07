import { RecipeBanner } from "./RecipeBanner.tsx";
import { CookingTime } from "./CookingTime.tsx";
import { Instructions } from "./Instructions.tsx";
import { DetailedRecipeDto } from "../api-types.ts";
import { Sidebar } from "@/app/components/Sidebar.tsx";
import { H2 } from "@/app/components/Heading.tsx";
import IngredientsSection from "@/app/components/recipepage/IngredientsSection.tsx";

type RecipePageContentProps = {
  recipe: DetailedRecipeDto;
};

export default async function RecipePageContent({
  recipe,
}: RecipePageContentProps) {
  const defaultServings = 4;
  return (
    <div>
      <RecipeBanner recipe={recipe} />
      <div className={"container mx-auto mb-8 mt-8 md:flex md:space-x-12"}>
        <div className={"md:w-2/3"}>
          <CookingTime
            cookTime={recipe.cookTime}
            preparationTime={recipe.preparationTime}
          />
          {/*

          // todo: Austauschen gegen ConfigurableIngredientsSection
          //  - oben: defaultServings aus "Datenbank" laden

          */}
          <IngredientsSection
            ingredients={recipe.ingredients}
            defaultServings={defaultServings}
          />
          <Instructions recipe={recipe} />
        </div>
        <div className={"md:w-1/3"}>
          <Sidebar>
            {/*
            - todo:
              - FeedbackListLoader einbauen
              - Verzögern des Ladens in 'demo_config'
              - In FeedbackListLoader Laden der Daten zeigen
              - Suspense
            */}
            <H2>Feedback</H2>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
