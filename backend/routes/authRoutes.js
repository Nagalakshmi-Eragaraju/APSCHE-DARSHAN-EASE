import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { protectRouter } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protectRouter, getUserProfile);

export default router;
