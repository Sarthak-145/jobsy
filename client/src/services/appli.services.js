import API from './axios';

export const getMyApplications = () => {
  return API.get('/applications');
};
