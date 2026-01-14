import API from './axios';

export const getJobs = () => {
  return API.get('/jobs');
};

export const createJob = (data) => {
  return API.post('/jobs', data);
};

export const getJobById = (id) => {
  return API.get(`/jobs/${id}`);
};
