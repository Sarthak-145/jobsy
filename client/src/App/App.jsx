import { AuthProvider } from '../Contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from '../Layouts/PublicLayout';
import PrivateLayout from '../Layouts/PrivateLayout';
import Register from '../Pages/Register';
import Landing from '../Pages/Landing';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import CreateJob from '../Pages/CreateJob';
import Job from '../Pages/Job';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/job/:id" element={<Job />} />
            </Route>

            <Route element={<PrivateLayout />}>
              <Route path="/job/new" element={<CreateJob />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
