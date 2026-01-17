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

export const jobApply = (id, data) => {
  console.log(id);
  console.log(data);
  return API.post(`/jobs/${id}/apply`, data);
};

export const myJobs = () => {
  return API.get('/jobs/me');
};
