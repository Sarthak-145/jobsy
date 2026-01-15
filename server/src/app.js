import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import jobsRouter from './routes/jobsRouter.js';
import applicationRouter from './routes/applicationRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationRouter);

export default app;
