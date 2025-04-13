import { Request, Response } from 'express';
import { createUser } from '../services/userService';

export async function createUserHandler(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = createUser({ name, email, password });
    res.status(201).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
