import { AuthProvider } from '../Contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from '../Layouts/PublicLayout';
import PrivateLayout from '../Layouts/PrivateLayout';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}></Route>

            <Route element={<PrivateLayout />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
