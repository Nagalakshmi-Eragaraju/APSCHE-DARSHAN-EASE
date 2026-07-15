import express from 'express';
import { addTemple, getAllTemples, getTempleById } from '../controllers/templeController.js';
import { protectRouter } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.route('/')
    .get(getAllTemples)
    .post(protectRouter, addTemple); // Only logged in users can add a temple

router.route('/:id')
    .get(getTempleById);

export default router;
