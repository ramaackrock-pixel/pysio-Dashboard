import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '@/pages/Dashboard';
import { Login } from '@/pages/Login';
import { Patients } from '@/pages/Patients';
import { Appointments } from '@/pages/Appointments';
import { MedicalRecords } from '@/pages/MedicalRecords';
import { Billing } from '@/pages/Billing';
import { Staff } from '@/pages/Staff';
import { Branches } from '@/pages/Branches';
import { Reports } from '@/pages/Reports';
import { NotFound } from '@/pages/NotFound';
import Settings from '@/pages/Settings'

// Fake auth check
const isAuthenticated = () => {
  return localStorage.getItem('physio_auth') === 'true';
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/records"
          element={
            <PrivateRoute>
              <MedicalRecords />
            </PrivateRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <PrivateRoute>
              <Billing />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <PrivateRoute>
              <Staff />
            </PrivateRoute>
          }
        />
        <Route
          path="/branches"
          element={
            <PrivateRoute>
              <Branches />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route path='/settings'
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
