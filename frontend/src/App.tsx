import { Routes, Route } from "react-router-dom";
import { NotificationsProvider } from "./context/NotificationsContext";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Dashboard from "./routes/Dashboard";
import AdminEvents from "./routes/EventManagement";
import VolunteerMatching from "./routes/VolunteerMatching";
import NotificationsPage from "./routes/NotificationsPage";
import History from "./routes/History";

export default function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Volunteer App</h1>
                <a href="/login">Login</a>
                <a href="/signup">Sign Up</a>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/matching" element={<VolunteerMatching />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </NotificationsProvider>
    </AuthProvider>
  );
}
