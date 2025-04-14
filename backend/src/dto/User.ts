import { z } from "zod";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  id: number;
  name?: string;
  email?: string;
  password?: string;
}

export const createUserSchema = z.object({
  name: z.string().min(1, "Name must have at least 1 character"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export const updateUserSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name must have at least 1 character").optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z.string().min(6, "Password must have at least 6 characters").optional(),
});
