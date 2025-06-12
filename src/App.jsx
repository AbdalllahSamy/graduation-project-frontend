import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import ChangePassword from './modules/authentication/components/ChangePassword/ChangePassword';
import ForgetPassword from './modules/authentication/components/ForgetPassword/ForgetPassword';
import Login from './modules/authentication/components/Login/Login';
import Register from './modules/authentication/components/Register/Register';
import ResetPassword from './modules/authentication/components/Resetpassword/ResetPassword';
import Verify from './modules/authentication/components/Verify/Verify';
import Dashboard from './modules/dashboard/components/Dashboard/Dashboard';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import NotFound from './modules/shared/components/NotFound/NotFound';
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute';
import Test from './modules/test/Test';
import Testt from './modules/test/Testt';
import WaterTracker from './modules/test/WaterTracker';
import Home from './modules/Landing/components/Home/Home';
import Weeks from './modules/test/Weeks';
import NearGyms from './modules/dashboard/components/Dashboard/NearGyms';
import 'leaflet/dist/leaflet.css';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />,
      index: true,
    },
    {
      path: '/home',
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: '/',
      element: <AuthLayout />,
      // errorElement: <NotFound />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'verify', element: <Verify /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'change-password', element: <ChangePassword /> },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'test', element: <Test /> },
        { path: 'water', element: <WaterTracker /> },
        { path: 'testt', element: <Testt /> },
        { path: 'weeks', element: <Weeks /> },
        { path: 'near-gyms', element: <NearGyms /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
