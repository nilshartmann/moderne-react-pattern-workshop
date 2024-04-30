import { z } from "zod";

export const RecipePageListParams = z.object({
  page: z.number().min(0).optional(),
  orderBy: z.enum(["time", "likes"]).optional(),
});

export type TRecipePageListParams = z.infer<typeof RecipePageListParams>;
