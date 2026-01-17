import { Router } from 'express';
import {
  createJob,
  getJobs,
  getJobWithId,
} from '../controllers/jobController.js';
import authenticate from '../middlewares/authMiddleware.js';
import { applyJob, getJobsMe } from '../controllers/appliController.js';

const router = Router();

router.post('/', authenticate, createJob);
router.get('/', getJobs);
router.get('/me', authenticate, getJobsMe);
router.get('/:id', getJobWithId);
router.post('/:id/apply', authenticate, applyJob);

export default router;
