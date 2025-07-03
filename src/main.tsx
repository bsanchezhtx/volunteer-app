import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Root from "./routes/Root";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Profile from "./routes/Profile";
import Dashboard from "./routes/Dashboard";
import EventManagement from "./routes/EventManagement";
import VolunteerMatching from "./routes/VolunteerMatching";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile/" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/events" element={<EventManagement />} />
      <Route path="/volunteers" element={<VolunteerMatching />} />
    </Routes>
  </BrowserRouter>
);
