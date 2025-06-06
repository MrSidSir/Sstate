import express from 'express';
import {deleteUser,
  test,
  updateUser,
  getUserProfile,
} from '../controllers/user.controller.js';

import { verifyToken } from '../utils/varifyUser.js';

const UserRouter = express.Router();

UserRouter.get('/test', test);
// Update user (with token)
UserRouter.get('/profile/:id', getUserProfile);
// Get user profile (with token)
UserRouter.put('/update/:id', verifyToken, updateUser);
// Delete user (with token)
UserRouter.delete('/delete/:id', verifyToken, deleteUser)

export default UserRouter;
