import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect, useState } from "react";
import {
  DetailedRecipeDto,
  GetRecipeFeedbacksResponse,
  GetRecipeResponse,
  RecipeDto,
} from "../../../components/api-types.ts";
import {
  feedbackQueryOptions,
  fetchRecipe,
} from "../../../components/use-queries.ts";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";
import ky from "ky";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GlobalLoadingIndicator } from "../../../components/material/GlobalLoadingIndicator.tsx";
import {
  fetchFromApi,
  getEndpointConfig,
} from "../../../components/fetch-from-api.ts";
import { slowDown_GetFeedbacks } from "../../../demo-config.tsx";
import { ErrorBoundary } from "react-error-boundary";
export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();

  return (
    <div className={"flex"}>
      <ErrorBoundary fallback={<div>Es ist ein Fehler aufgetreten</div>}>
        <Suspense fallback={<GlobalLoadingIndicator />}>
          <Recipe recipeId={recipeId} />;
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function Recipe({ recipeId }: { recipeId: string }) {
  const queryClient = useQueryClient();

  queryClient.ensureQueryData(feedbackQueryOptions(recipeId));

  // useQuery<GetRecipeFeedbacksResponse>({
  //   queryKey: ["recipes", recipeId, "feedbacks"],
  //   queryFn: () => {
  //     return fetchFromApi(
  //       getEndpointConfig("get", "/api/recipes/{recipeId}/feedbacks"),
  //       {
  //         path: {
  //           recipeId,
  //         },
  //         query: {
  //           slowdown: slowDown_GetFeedbacks,
  //         },
  //       },
  //     );
  //   },
  // });

  const result = useSuspenseQuery({
    queryKey: ["recipes", recipeId],
    async queryFn() {
      const result = await ky
        .get(`/api/recipes/${recipeId}?slowdown=1600`)
        .json();

      return GetRecipeResponse.parse(result);
    },
  });

  //......................
  // use(result.promise)

  return <RecipePageContent recipe={result.data.recipe} />;
}

// function Recipe({ recipeId }: { recipeId: string }) {
//   const result = useQuery({
//     queryKey: ["recipes", recipeId],
//     async queryFn() {
//       const result = await ky
//         .get(`/api/recipes/${recipeId}?slowdown=1600`)
//         .json();
//
//       return GetRecipeResponse.parse(result);
//     },
//   });
//
//   if (result.isLoading) {
//     return <div>Loading....</div>;
//   }
//
//   if (result.isError) {
//     return <div>Error: {result.error.toString()}</div>;
//   }
//
//   if (result.isSuccess) {
//     return <RecipePageContent recipe={result.data.recipe} />;
//   }
//
//   // useEffect(() => {
//   //   setIsPending(true);
//   //
//   //   ky.get(`/api/recipes/${recipeId}?slowdown=1600`)
//   //     .json()
//   //     .then((json) => GetRecipeResponse.parse(json))
//   //     .then((recipe) => setRecipe(recipe))
//   //     .finally(() => setIsPending(false));
//   // }, [recipeId]);
// }
