import { useContext, useEffect } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user]);
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <header className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900">Jobsy</h1>

          <button
            className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-zinc-900 leading-tight">
              Find jobs that <br /> don't suck.
            </h2>
            <p className="mt-4 text-zinc-600 max-w-md">
              Browse real opportunities posted by real employers. No spam. No
              fake listings. Just jobs.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold
                           text-white hover:bg-blue-700 transition cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Get started
              </button>
              <button
                className="rounded-lg border border-zinc-300 px-6 py-3 text-sm
                           text-zinc-700 hover:bg-zinc-50 transition cursor-pointer"
                onClick={() => navigate('/home')}
              >
                Browse jobs
              </button>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="h-4 w-1/2 bg-zinc-200 rounded mb-3" />
              <div className="h-3 w-full bg-zinc-200 rounded mb-2" />
              <div className="h-3 w-4/5 bg-zinc-200 rounded mb-6" />
              <div className="h-8 w-full bg-blue-100 rounded" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
