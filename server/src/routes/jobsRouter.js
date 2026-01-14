import { Router } from 'express';
import {
  createJob,
  getJobs,
  getJobWithId,
} from '../controllers/jobController.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authenticate, createJob);
router.get('/', getJobs);
router.get('/:id', getJobWithId);

export default router;
