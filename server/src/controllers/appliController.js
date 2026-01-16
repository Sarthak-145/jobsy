import { Application } from '../db/models/Application.js';
import { Job } from '../db/models/Job.js';

export const applyJob = async (req, res) => {
  const jobId = req.params.id;
  const { resumeUrl, personalSection } = req.body;
  const candidateId = req.user.userId;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: 'The job you are applying for, does not exist',
      });
    }

    const alreadyApplied = await Application.findOne({
      jobId,
      candidateId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: 'You have already applied for this job',
      });
    }

    await Application.create({
      resumeUrl,
      personalSection,
      jobId,
      employerId: job.employerId,
      candidateId,
    });

    res.status(201).json({
      success: true,
      message: 'Application sent successfully',
    });
  } catch (err) {
    console.error('Error in posting application:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMyApplications = async (req, res) => {
  //from middleware
  const candidateId = req.user.userId;

  try {
    const result = await Application.find({ candidateId }).populate('jobId');
    if (result.length === 0) {
      return res.status(200).json({ sucess: true, applications: [] });
    }
    res.status(200).json({ success: true, applications: result });
  } catch (err) {
    console.log('Error while fetching applications: ', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
