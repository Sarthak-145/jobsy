import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const PrivateLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h3>Loading...</h3>;

  if (!user) return <Navigate to={'/login'} replace />;

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateLayout;
