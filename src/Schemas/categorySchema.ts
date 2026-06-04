import { z } from "zod"

export const categorySchema = z.object({
      name: z.string().min(3, "Name must be at least 3 characters long").max(25, "Name must be at most 25 characters long"),
      slug: z.string().min(5, "Slug must be at least 5 characters long").max(25, "Slug must be at most 25 characters long"),

})

export type CategorySchema = z.infer<typeof categorySchema>