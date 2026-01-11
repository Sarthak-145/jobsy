import { AuthProvider } from '../Contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from '../Layouts/PublicLayout';
import PrivateLayout from '../Layouts/PrivateLayout';
import Register from '../Pages/Register';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<PrivateLayout />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
