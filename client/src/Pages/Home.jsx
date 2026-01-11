import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-zinc-900">Jobs</h1>
          {user && (
            <button className="text-sm text-blue-600 hover:underline cursor-pointer">
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Open positions
          </h2>
          <p className="text-sm text-zinc-600 mt-1">
            Showing latest opportunities
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 hover:shadow-sm transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  Frontend Developer
                </h3>
                <p className="text-sm text-zinc-600 mt-1">Acme Corp · Remote</p>
              </div>
              <span className="text-sm font-medium text-emerald-600">
                ₹8-12 LPA
              </span>
            </div>

            <p className="mt-4 text-sm text-zinc-700 line-clamp-2">
              Looking for a React developer with solid fundamentals and clean
              code habits.
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-zinc-500">Min exp: 2 years</span>
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold
                           text-white hover:bg-blue-700 transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
