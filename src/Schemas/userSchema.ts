import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

export const registerUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
  imageUrl: z.string().optional(),
});
export const updateProfileSchema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password must be at most 50 characters long"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password must be at most 50 characters long"),
  imageUrl: z.string().optional(),
})


export type LoginUserSchema = z.infer<typeof loginUserSchema>;
export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
export type updateProfileSchema = z.infer<typeof updateProfileSchema>
