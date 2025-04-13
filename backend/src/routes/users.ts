
import { Router } from 'express';
import { createUserHandler } from '../conrtollers/userController';

const router = Router();

router.post('/users', createUserHandler);

export default router;
