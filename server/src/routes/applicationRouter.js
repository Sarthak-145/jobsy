import { Router } from 'express';
import authenticate from '../middlewares/authMiddleware.js';
import { getMyApplications } from '../controllers/appliController.js';

const router = Router();

router.get('/', authenticate, getMyApplications);

export default router;
