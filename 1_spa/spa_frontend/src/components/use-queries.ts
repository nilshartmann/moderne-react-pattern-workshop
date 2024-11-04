import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import {
  GetRecipeFeedbacksResponse,
  GetRecipeIngredientsResponse,
  GetRecipeResponse,
  PageResponseRecipeDto,
} from "./api-types.ts";
import { fetchFromApi, getEndpointConfig } from "./fetch-from-api.ts";
import {
  recipesPerPage,
  slowDown_AddFeedback,
  slowDown_GetFeedbacks,
  slowDown_GetIngredients,
  slowDown_GetRecipe,
  slowDown_GetRecipeList,
  slowDown_IncreaseLikes,
  slowDown_SubscribeNewsletter,
} from "../demo-config.tsx";
import ky from "ky";

const getAllRecipesQueryOptions = (
  page: number,
  orderBy?: "time" | "likes",
  ids?: string[],
) => {
  const idsString = ids?.join(",");

  return {
    queryKey: ["recipe-list", page, orderBy, idsString],
    queryFn: () => {
      return fetchFromApi(getEndpointConfig("get", "/api/recipes"), {
        query: {
          page,
          size: recipesPerPage,
          sort: orderBy,
          ids: idsString,
          slowdown: slowDown_GetRecipeList,
        },
      });
    },
  };
};

export function useGetAllRecipesQuery(
  page: number,
  orderBy?: "time" | "likes",
  ids?: string[],
): UseSuspenseQueryResult<PageResponseRecipeDto> {
  return useSuspenseQuery<PageResponseRecipeDto>(
    getAllRecipesQueryOptions(page, orderBy, ids),
  );
}

export function useGetTotalPageCountQuery(
  page: number,
  orderBy?: "time" | "likes",
) {
  const result = useQuery(getAllRecipesQueryOptions(page, orderBy));
  if (result.isSuccess) {
    return result.data.totalPages;
  }

  return -1;
}

export function fetchRecipe(recipeId: string) {
  return fetchFromApi(getEndpointConfig("get", "/api/recipes/{recipeId}"), {
    path: {
      recipeId,
    },
    query: {
      slowdown: slowDown_GetRecipe,
    },
  });
}

export function useGetRecipeSuspenseQuery(
  recipeId: string,
): UseSuspenseQueryResult<GetRecipeResponse> {
  return useSuspenseQuery<GetRecipeResponse>({
    queryKey: ["recipes", recipeId],
    async queryFn() {
      const recipe = await ky
        .get(`/api/recipes/${recipeId}?slowdown=${slowDown_GetRecipe}`)
        .json();
      return GetRecipeResponse.parse(recipe);
    },
  });
}

export function useGetRecipeIngredientsQuery(
  recipeId: string,
): UseSuspenseQueryResult<GetRecipeIngredientsResponse> {
  return useSuspenseQuery<GetRecipeIngredientsResponse>({
    queryKey: ["recipes", recipeId, "ingredients"],
    queryFn: () => {
      return fetchFromApi(
        getEndpointConfig("get", "/api/recipes/{recipeId}/ingredients"),
        {
          path: {
            recipeId,
          },
          query: {
            slowdown: slowDown_GetIngredients,
          },
        },
      );
    },
  });
}

export function useGetRecipeFeedbackQuery(
  recipeId: string,
): UseSuspenseQueryResult<GetRecipeFeedbacksResponse> {
  return useSuspenseQuery<GetRecipeFeedbacksResponse>({
    queryKey: ["recipes", recipeId, "feedbacks"],
    queryFn: () => {
      return fetchFromApi(
        getEndpointConfig("get", "/api/recipes/{recipeId}/feedbacks"),
        {
          path: {
            recipeId,
          },
          query: {
            slowdown: slowDown_GetFeedbacks,
          },
        },
      );
    },
  });
}

type AddFeedbackMutationProps = {
  payload: {
    commenter: string;
    stars: number;
    comment: string;
  };
};

export function useAddFeedbackMutation(recipeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["POST", "recipes", recipeId, "feedbacks"],
    mutationFn: ({ payload }: AddFeedbackMutationProps) => {
      return fetchFromApi(
        getEndpointConfig("post", "/api/recipes/{recipeId}/feedbacks"),
        {
          path: { recipeId },
          body: { feedbackData: payload },
          query: {
            slowdown: slowDown_AddFeedback,
          },
        },
      );
    },
    onSuccess: (newFeedback) => {
      queryClient.setQueryData(
        ["recipes", recipeId, "feedbacks"],
        (oldData: unknown) => {
          console.log("ON SUCCESS", newFeedback, oldData);
          if (!oldData) {
            return oldData;
          }
          const result = GetRecipeFeedbacksResponse.safeParse(oldData);
          if (!result.success) {
            console.log("Unknown query data in cache", result, oldData);
            return oldData;
          }

          const oldFeedbacks = result.data;

          const newData = {
            ...oldFeedbacks,
            feedbacks: [...oldFeedbacks.feedbacks, newFeedback.newFeedback],
          } satisfies GetRecipeFeedbacksResponse;

          console.log("NEW DATA", newData);
          return newData;
        },
      );
    },
  });
}

export function useSubscribeToNewsletterMutation() {
  return useMutation({
    mutationFn: (email: string) => {
      return fetchFromApi(
        getEndpointConfig("post", "/api/newsletter/subscribe"),
        {
          body: { email },
          query: {
            slowdown: slowDown_SubscribeNewsletter,
          },
        },
      );
    },
  });
}

export function useLikeMutation(recipeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["PUT", "recipes", recipeId, "likes"],
    mutationFn: () => {
      return fetchFromApi(
        getEndpointConfig("patch", "/api/recipes/{recipeId}/likes"),
        {
          path: { recipeId },
          query: {
            slowdown: slowDown_IncreaseLikes,
          },
        },
      );
    },
    onSuccess: async (patchLikesResult) => {
      // UPDATE CLIENT-SITE DATA AFTER LIKES:

      // Option 1:
      //  - invalidate data in cache
      //     - if data is not in cache -> nothing happens
      //     - if data is in cache -> data is considered stale
      //       - data will be read from backend if:
      //          - immediately if data is currently rendered on a component
      //          - later as soon as a component renders that uses the data
      //  - 'await'ing the invalidation make the whole mutation
      //      "pending" until: the mutation request is done AND
      //         the "invalidate" request is DONE
      //          (only if it is run imediately)
      await queryClient.invalidateQueries({ queryKey: ["recipe-list"] });

      // Option 2:
      //  Modify the cache data manually
      //    - advantage: no server request neccessary for updates
      //    - disadvantage: duplicating logic from backend
      queryClient.setQueryData(["recipes", recipeId], (cachedData: unknown) => {
        if (!cachedData) {
          return cachedData;
        }
        const cachedRecipe = GetRecipeResponse.safeParse(cachedData);
        if (!cachedRecipe.success) {
          console.log(
            "Unknown query data in cache for recipe",
            recipeId,
            cachedRecipe,
            cachedData,
          );
          return cachedData;
        }

        const newData = {
          ...cachedRecipe.data,
          recipe: {
            ...cachedRecipe.data.recipe,
            likes: patchLikesResult.newLikes,
          },
        } satisfies GetRecipeResponse;

        return newData;
      });
    },
  });
}
