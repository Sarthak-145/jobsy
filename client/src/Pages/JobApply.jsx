import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById, jobApply } from '../services/jobs.services';
import Navbar from '../components/Navbar';

const JobApply = () => {
  const { id } = useParams();
  const [resumeUrl, setResumeUrl] = useState('');
  const [personalSection, setPersonalSection] = useState('');

  const [job, setJob] = useState();
  const [loadingJob, setLoadingJob] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getJobById(id)
      .then((res) => {
        setJob(res.data.job);
        setLoadingJob(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingJob(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await jobApply(id, { resumeUrl, personalSection });
      alert('Application has been sent :)');
      navigate('/home');
    } catch (err) {
      setError(err.response.data.message || 'Error sending application');
    } finally {
      setLoading(false);
    }
  };

  if (loadingJob) {
    return <div className="p-6">Loading...</div>;
  }

  if (!job) {
    return <div className="p-6">Job not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-100">
        <header className="border-b border-zinc-200 bg-white">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <h1 className="text-xl font-semibold text-zinc-900">
              Apply for Job
            </h1>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-10">
          <form
            className="bg-white border border-zinc-200 rounded-xl p-6 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                {job.title}
              </h2>
              <p className="text-sm text-zinc-600">{job.company}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Resume URL
              </label>
              <input
                required
                type="text"
                name="resumeUrl"
                placeholder="https://drive.google.com/..."
                className="w-full rounded-lg border border-zinc-300 px-3 py-2
                         text-sm text-zinc-800 outline-none
                         focus:border-blue-500"
                onChange={(e) => setResumeUrl(e.target.value)}
              />
              <p className="text-xs text-zinc-500 mt-1">
                Upload your resume and paste the link here
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Personal note (optional)
              </label>
              <textarea
                name="personalSection"
                rows="4"
                placeholder="Why are you a good fit for this role?"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2
                         text-sm text-zinc-800 outline-none resize-none
                         focus:border-blue-500"
                onChange={(e) => setPersonalSection(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <div className="pt-4 border-t border-zinc-200 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5
                         text-sm font-semibold text-white
                         hover:bg-blue-700 transition"
                disabled={loading}
              >
                Submit Application
              </button>
            </div>
          </form>
        </main>
      </div>{' '}
    </>
  );
};

export default JobApply;
