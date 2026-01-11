import API from './axios';

const login = (data) => {
  return API.post('/auth/login', data);
};

const register = (data) => {
  return API.post('/auth/register', data);
};

const me = () => {
  return API.get('/auth/me');
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export { login, register, logout, me };
