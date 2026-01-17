import { useState, useEffect } from 'react';
import { myJobs } from '../services/jobs.services';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await myJobs();
        setJobs(result.data.jobs);
      } catch (err) {
        setError(err?.response?.data?.message || 'Error fetching applications');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-zinc-900">
            Employer Dashboard
          </h1>
        </div>
      </header>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {jobs.map((job) => (
          <div
            className="bg-white border border-zinc-200 rounded-xl p-6"
            key={job._id}
          >
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">
              {job.title}
            </h2>

            <p className="text-sm text-zinc-600 mb-6">
              {job.location} · {job.jobType} · {job.minExp}+ years
            </p>
            <div className="space-y-4">
              {job.applications.map((application) => (
                <div
                  className="border border-zinc-200 rounded-lg p-4
                            flex justify-between items-start"
                  key={application._id}
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900">
                      {application.name}
                    </p>
                    <p className="text-xs text-zinc-600">
                      Resume: {application.resumeUrl}
                    </p>
                    <p className="text-sm text-zinc-700 mt-2">
                      {application.personalSection}
                    </p>
                  </div>

                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full
                               bg-blue-100 text-blue-700"
                  >
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default EmployerDashboard;
