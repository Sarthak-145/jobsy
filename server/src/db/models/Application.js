import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    personalSection: {
      type: String,
    },

    status: {
      type: String,
      enum: ['applied', 'reviewed', 'rejected'],
      default: 'applied',
    },
  },
  { timestamps: true }
);

applicationSchema.index({ jobId: 1 });
applicationSchema.index({ candidateId: 1 });
applicationSchema.index({ employerId: 1 });

export const Application = mongoose.model('Application', applicationSchema);
