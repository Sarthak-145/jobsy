import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById } from '../services/jobs.services';

const Job = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobById(id)
      .then((res) => {
        setJob(res.data.job);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!job) {
    return <div className="p-6">Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-zinc-900">Job Details</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">{job.title}</h2>
            <p className="text-sm text-zinc-600 mt-1">{job.location}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-zinc-500">Job type</p>
              <p className="text-sm font-medium text-zinc-800">{job.jobType}</p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Experience</p>
              <p className="text-sm font-medium text-zinc-800">
                {job.minExp} years
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Salary</p>
              <p className="text-sm font-medium text-zinc-800">
                {job.salary} LPA
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Location</p>
              <p className="text-sm font-medium text-zinc-800">
                {job.location}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Job Description
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex justify-end">
            <button
              className="rounded-lg bg-blue-600 px-6 py-2.5
                         text-sm font-semibold text-white
                         hover:bg-blue-700 transition cursor-pointer"
              onClick={() => navigate('apply')}
            >
              Apply for this job
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Job;
