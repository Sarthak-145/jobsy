import { useEffect } from 'react';
import { getMyApplications } from '../services/appli.services';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function CandidateDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const result = await getMyApplications();
        setApplications(result.data.applications);
      } catch (err) {
        setError(err?.response?.data?.message || 'Error fetching applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-100">
        <header className="bg-white border-b border-zinc-200">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <h1 className="text-xl font-semibold text-zinc-900">
              My Applications
            </h1>
          </div>
        </header>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <main className="max-w-5xl mx-auto px-6 py-10">
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white border border-zinc-200 rounded-xl p-5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900">
                      {application.jobId.title}
                    </h2>
                    <p className="text-sm text-zinc-600">
                      {application.jobId.company} · {application.jobId.location}
                    </p>
                  </div>

                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full
                  bg-blue-100 text-blue-700"
                  >
                    {application.status}
                  </span>
                </div>

                <p className="mt-3 text-sm text-zinc-700">
                  Min Experience: {application.jobId.minExp} years · Salary:{' '}
                  {application.jobId.salary} LPA
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
