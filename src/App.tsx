import { Routes, Route } from "react-router-dom";
import { NotificationsProvider } from "./context/NotificationsContext";
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
    <NotificationsProvider>
      <Routes>
        <Route path="/" element={<h1>Volunteer App</h1>} />
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
  );
}
