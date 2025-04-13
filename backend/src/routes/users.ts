import { Router } from 'express';
import { createUserHandler, getUserByIdHandler, listUsersHandler, updateUserHandler } from '../conrtollers/userController';

const router = Router();

router.post('/users', createUserHandler);
router.get('/users/:id', getUserByIdHandler);
router.get('/users', listUsersHandler);
router.put('/users/:id', updateUserHandler);

export default router;
