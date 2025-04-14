import { Router } from "express";
import {
  createUserHandler,
  getUserByIdHandler,
  listUsersHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/userController";

const router = Router();

router.post("/users", createUserHandler);
router.get("/users/:id", getUserByIdHandler);
router.get("/users", listUsersHandler);
router.put("/users/:id", updateUserHandler);
router.delete("/users/:id", deleteUserHandler);

export default router;
