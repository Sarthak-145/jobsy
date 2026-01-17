import { Router } from 'express';
import {
  createJob,
  getJobs,
  getJobWithId,
} from '../controllers/jobController.js';
import { authenticate, requireRole } from '../middlewares/authMiddleware.js';
import { applyJob, getJobsMe } from '../controllers/appliController.js';

const router = Router();

router.post('/', authenticate, requireRole('employer'), createJob);
router.get('/', getJobs);
router.get('/me', authenticate, requireRole('employer'), getJobsMe);
router.get('/:id', getJobWithId);
router.post('/:id/apply', authenticate, requireRole('candidate'), applyJob);

export default router;
