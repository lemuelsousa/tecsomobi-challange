import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name must have at least 1 character"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name must have at least 1 character").optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .optional(),
});

export const userSchema = createUserSchema;

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserInput = z.infer<typeof userSchema>;
