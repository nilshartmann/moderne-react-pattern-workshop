import { z } from "zod";

export const RecipePageListParams = z.object({
  page: z.number().min(0).optional(),
  orderBy: z.enum(["time", "likes"]).optional(),
  bookmarkId: z.string().optional(),
});

export type TRecipePageListParams = z.infer<typeof RecipePageListParams>;
