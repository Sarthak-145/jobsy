import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { getJobs } from '../services/jobs.services';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs()
      .then((res) => {
        setJobs(res.data.jobs);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error while fetching: ', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900">Jobsy</h1>
          {user && (
            <button
              className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Open positions
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Showing latest opportunities
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Link key={job._id} to={`/job/${job._id}`}>
              <div className="rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="max-w-prose">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600">{job.jobType}</p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-emerald-600">
                    {`${job.salary} LPA`}
                  </span>
                </div>

                <p className="mt-4 text-sm text-zinc-700 line-clamp-2">
                  {job.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{`Min exp: ${job.minExp} years`}</span>
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
                    See more...
                  </button>
                </div>
              </div>{' '}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
