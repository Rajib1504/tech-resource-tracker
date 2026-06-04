import { z } from "zod";

export const resourceSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  url: z.string().url("Invalid Url"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(400, "Description must be at most 400 characters long")
    .optional(),
  categoryId: z.string().min(1, "Category is required"),
});

export type ResourceSchema = z.infer<typeof resourceSchema>;
