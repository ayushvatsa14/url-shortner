import { Routes, Route} from 'react-router-dom';
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import AuthPage from '../pages/AuthPage'
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes=() => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
      />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;