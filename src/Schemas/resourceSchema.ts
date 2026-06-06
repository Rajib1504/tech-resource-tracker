import { z } from "zod";

export const resourceSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  type: z.enum(["LINK", "SNIPPET"]).default("LINK"),
  url: z.string().url("Invalid Url").optional().or(z.literal("")),
  snippet: z.string().optional(),
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(400, "Description must be at most 400 characters long")
    .optional(),
  categoryId: z.string().min(1, "Category is required"),
}).refine((data) => {
  if (data.type === "LINK") {
    return !!data.url && data.url.length > 0;
  }
  if (data.type === "SNIPPET") {
    return !!data.snippet && data.snippet.length > 0;
  }
  return false;
}, {
  message: "Either a valid URL or a Code Snippet must be provided based on the selected type.",
  path: ["url"],
});

export const UpdateResourceSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long")
    .optional(),
  type: z.enum(["LINK", "SNIPPET"]).optional(),
  url: z.string().url("Invalid Url").optional().or(z.literal("")),
  snippet: z.string().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(400, "Description must be at most 400 characters long")
    .optional(),
});

export type ResourceSchemaType = z.infer<typeof resourceSchema>;

export type UpdateResourceSchemaType = z.infer<typeof UpdateResourceSchema>;
