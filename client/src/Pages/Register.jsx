import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const Register = () => {
  const [error, seterror] = useState(null);
  const [loading, setLoading] = useState(false);
  //email, username, password
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      seterror("Passwords don't match");
      return;
    }
    setLoading(true);
    seterror(null);

    try {
      await register({ email, name, password, role });
      navigate('/home');
    } catch (err) {
      seterror(err.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Create account</h1>
          <p className="text-sm text-zinc-600 mt-1">
            Get started in less than a minute
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="youremail@email.com"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Role
            </label>
            <select
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm
                         bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="candidate">User</option>
              <option value="employer">Recruiter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full mt-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold
                       text-white hover:bg-blue-700 transition cursor-pointer"
            disabled={loading}
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?
          <button
            className="ml-1 text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
