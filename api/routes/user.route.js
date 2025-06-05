import express from 'express';
import {
  test,
  updateUser,
  getUserProfile,
} from '../controllers/user.controller.js';

import { verifyToken } from '../utils/varifyUser.js';

const UserRouter = express.Router();

UserRouter.get('/test', test);
UserRouter.get('/profile/:id', getUserProfile);
UserRouter.post('/update/:id', verifyToken, updateUser);

export default UserRouter;
