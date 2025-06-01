// api/routes/auth.route.js
import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js'; // ✅ IMPORT signin

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin); // ✅ Will now work properly

export default router;

