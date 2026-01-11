import { createContext, useEffect, useState } from 'react';
import * as authServices from '../services/auth.services';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //ping backend and verify token
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await authServices.me();
        setUser(res.data.user);
      } catch (err) {
        authServices.logout();
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = async (data) => {
    const res = await authServices.login(data);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res;
  };

  const register = async (data) => {
    const res = await authServices.register(data);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res;
  };

  const logout = () => {
    const sure = window.confirm('Are you sure, you want to logout?');
    if (!sure) return;
    authServices.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
