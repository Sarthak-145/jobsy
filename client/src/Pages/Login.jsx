import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await login({ email, password });
      navigate('/home');
    } catch (err) {
      setError(err.response.data.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-zinc-900">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-zinc-600">Sign in to continue</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="yourname@example.com"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm
                           text-zinc-900 placeholder-zinc-400
                           focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm
                           text-zinc-900 placeholder-zinc-400
                           focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="h-3">
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold
                         text-white hover:bg-blue-700 transition cursor-pointer"
              disabled={loading}
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Don't have an account?
          <button
            className="ml-2 font-medium text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
