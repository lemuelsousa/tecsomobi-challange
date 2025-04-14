import { Request, Response } from "express";
import {
  createUser,
  getUserById,
  listUsers,
  updateUser,
  deleteUser,
} from "../services/userService";
import { ServiceError } from "../services/userService";

function handleError(err: unknown, res: Response) {
  if (err instanceof ServiceError) {
    res.status(err.statusCode).json({
      error: {
        code: err.statusCode,
        message: err.message
      },
    });
  } else {
    res.status(500).json({
      error: {
        code: 500,
        message: "Internal server error"
      },
    });
  }
}

export async function createUserHandler(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = createUser({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    handleError(err, res);
  }
}

export async function getUserByIdHandler(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = getUserById(Number(id));
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    handleError(err, res);
  }
}

export async function listUsersHandler(req: Request, res: Response) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const { users, total } = listUsers(Number(page), Number(limit));
    res
      .status(200)
      .json({ users, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    handleError(err, res);
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = updateUser({ id: Number(id), name, email, password });
    res.status(200).json(user);
  } catch (err) {
    handleError(err, res);
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  const { id } = req.params;

  try {
    deleteUser(Number(id));
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    handleError(err, res);
  }
}
