import { Request, Response, NextFunction } from "express";
import {
  createUser,
  getUserById,
  listUsers,
  updateUser,
  deleteUser,
} from "../services/userService";
import { createUserSchema, updateUserSchema } from "../dto/User";

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const user = await createUser(validatedData);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function getUserByIdHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const user = await getUserById(Number(id));
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
}

export async function listUsersHandler(req: Request, res: Response, next: NextFunction) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const { users, total } = await listUsers(Number(page), Number(limit));
    res
      .status(200)
      .json({ users, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
}

export async function updateUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = updateUserSchema.parse({
      ...req.body,
      id: Number(req.params.id),
    });
    const user = await updateUser(validatedData);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUserHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    await deleteUser(Number(id));
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    next(err);
  }
}
