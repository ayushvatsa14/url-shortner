import express from 'express';
import { get_current_user, logout_user, userLogin, userSignUp } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router=express.Router();

router.post('/register', userSignUp);
router.post('/login', userLogin);
router.post("/logout", logout_user);
router.get("/me", authMiddleware, get_current_user);

export default router;