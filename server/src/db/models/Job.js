import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    minExp: Number,
    location: String,
    company: String,

    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'intern'],
    },
  },
  { timestamps: true }
);

jobSchema.index({ employerId: 1 });

export const Job = mongoose.model('Job', jobSchema);
