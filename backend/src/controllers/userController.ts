import { Request, Response, NextFunction } from "express";
import {
  createUser,
  getUserById,
  listUsers,
  updateUser,
  deleteUser,
  ServiceError,
} from "../services/userService";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

export async function createUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parse = createUserSchema.parse(req.body);
    await createUser(parse);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
}

export async function updateUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const parsed = updateUserSchema.parse(req.body);
    await updateUser(Number(id), parsed);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getUserByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const user = await getUserById(Number(id));
    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado." });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
}

export async function listUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export async function deleteUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    await deleteUser(Number(id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
