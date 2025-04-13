import { Router } from 'express';
import { createUserHandler, getUserByIdHandler, listUsersHandler } from '../conrtollers/userController';

const router = Router();

router.post('/users', createUserHandler);
router.get('/users/:id', getUserByIdHandler);
router.get('/users', listUsersHandler);

export default router;
