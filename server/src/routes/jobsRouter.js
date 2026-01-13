import { Router } from 'express';
import { createJob, getJobs } from '../controllers/jobController.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getJobs);
router.post('/', authenticate, createJob);

export default router;
