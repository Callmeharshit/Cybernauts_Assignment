import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/user/:userId', updateUser);
router.delete('/user/:userId', deleteUser);

export default router;
