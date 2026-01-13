import { useState } from 'react';
import { createJob } from '../services/jobs.services';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    minExp: '',
    location: '',
    salary: '',
    description: '',
    jobType: '',
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createJob({ ...formData });
      alert('Job is created successfully!');
      navigate('/home');
    } catch (err) {
      setError(err.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-4">
      <form
        className="w-full max-w-2xl bg-white border border-zinc-200
                   rounded-xl p-6 space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-zinc-900 text-center">
          Create Job
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Job title"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2
                     text-sm text-zinc-800 outline-none
                     focus:border-blue-500"
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company name"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2
                     text-sm text-zinc-800 outline-none
                     focus:border-blue-500"
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location (Remote / City)"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2
                     text-sm text-zinc-800 outline-none
                     focus:border-blue-500"
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            name="jobType"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2
                       text-sm text-zinc-800 bg-white outline-none
                       focus:border-blue-500"
            onChange={handleChange}
          >
            <option value="">Job type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="intern">Internship</option>
          </select>

          <input
            type="number"
            name="minExp"
            placeholder="Min experience (years)"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2
                       text-sm text-zinc-800 outline-none
                       focus:border-blue-500"
            onChange={handleChange}
          />
        </div>

        <input
          type="number"
          name="salary"
          placeholder="Salary in LPA (number only)"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2
                     text-sm text-zinc-800 outline-none
                     focus:border-blue-500"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job description"
          rows="4"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2
                     text-sm text-zinc-800 outline-none resize-none
                     focus:border-blue-500"
          onChange={handleChange}
        />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2.5
                     text-sm font-semibold text-white
                     hover:bg-blue-700 transition"
          disabled={loading}
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
