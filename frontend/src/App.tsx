import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { NotificationsProvider } from "./context/NotificationsContext";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Dashboard from "./routes/Dashboard";
import AdminEvents from "./routes/EventManagement";
import UserEvents from "./routes/EventView";
import VolunteerMatching from "./routes/VolunteerMatching";
import NotificationsPage from "./routes/NotificationsPage";
import History from "./routes/History";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import LandingPage from "./routes/LandingPage";

export default function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer theme="dark" />
        <NotificationsProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <UserEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <AdminRoute>
                  <AdminEvents />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/matching"
              element={
                <AdminRoute>
                  <VolunteerMatching />
                </AdminRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
          </Routes>
        </NotificationsProvider>
      </AuthProvider>
    </>
  );
}
