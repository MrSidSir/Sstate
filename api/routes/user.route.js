// api/routes/user.route.js
import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/varifyUser.js'; // ✅ Correct path

const UserRouter = express.Router();

UserRouter.get('/test', test);
UserRouter.post('/update/:id', verifyToken, updateUser);

export default UserRouter;

