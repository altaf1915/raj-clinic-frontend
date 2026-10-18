
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";

import AuthPage from "./pages/AuthPage";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Redirect authenticated users away from sign-in and sign-up.
function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="auth-loading">Loading...</div>;
  }

  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/dashboard"}
        replace
      />
    );
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public website routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:slug" element={<DoctorProfile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/book-appointment"
          element={<BookAppointment />}
        />
      </Route>

      {/* Guest-only authentication routes */}
      <Route
        path="/signin"
        element={
          <GuestRoute>
            <AuthPage mode="signin" />
          </GuestRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <GuestRoute>
            <AuthPage mode="signup" />
          </GuestRoute>
        }
      />

      {/* Client dashboard — requires authentication */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<ClientDashboard />}
        />
      </Route>

      {/* Admin dashboard — requires admin role */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
