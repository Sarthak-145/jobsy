import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const isEmployer = user?.role === 'employer';
  const isCandidate = user?.role === 'candidate';

  return (
    <nav className="w-full border-b border-zinc-200 bg-accent">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-zinc-900">Jobsy</div>

        <div className="flex items-center gap-6 text-sm font-medium text-zinc-700">
          {isCandidate && (
            <>
              <a href="/home" className="hover:text-white transition">
                Jobs
              </a>
              <a
                href="/dashboard/candidate"
                className="hover:text-white transition"
              >
                Dashboard
              </a>
            </>
          )}

          {isEmployer && (
            <a
              href="/dashboard/employer"
              className="hover:text-white transition"
            >
              Dashboard
            </a>
          )}

          {!user && (
            <>
              {' '}
              <a href="/login" className="hover:text-white transition">
                Login
              </a>
              <a
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-1.5
                       text-white hover:bg-blue-700 transition"
              >
                Register
              </a>
            </>
          )}

          {user && (
            <button
              onClick={() => logout()}
              className="hover:text-white transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
