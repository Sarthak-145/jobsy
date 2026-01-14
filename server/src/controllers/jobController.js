import { Job } from '../db/models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const result = await Job.find();
    res.status(200).json({ success: true, count: result.length, jobs: result });
  } catch (err) {
    res.status(500).json({ message: 'Error getting jobs' });
  }
};

export const getJobWithId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Job.findById(id);
    res.json({ success: true, job: result });
  } catch (err) {
    res.status(404).json({
      success: false,
      msg: "Can't find the Job you are looking for",
    });
  }
};

export const getJobsMe = async (req, res) => {
  // from middleware
  const userId = req.user.userId;

  try {
    const result = await Job.findOne({ userId: emplyerId });
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({
      message: "can't get you jobs, internal server error",
    });
  }
};

export const createJob = async (req, res) => {
  const { title, description, salary, minExp, location, company, jobType } =
    req.body;
  //userId from middleware
  const userId = req.user.userId;

  try {
    await Job.create({
      title,
      description,
      salary,
      minExp,
      location,
      company,
      jobType,
      employerId: userId,
    });

    res.status(201).json({ message: 'Job is uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating Job' });
  }
};
