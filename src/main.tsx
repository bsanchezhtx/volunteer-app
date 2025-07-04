import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationsProvider } from './context/NotificationsContext';

import Login from './pages/Login';
import Register from './pages/Register';
import ProfileWizard from './pages/ProfileWizard';
import AdminEvents from './pages/AdminEvents';
import Dashboard from './routes/Dashboard';
import VolunteerMatching from './routes/VolunteerMatching';
import NotificationsPage from './routes/NotificationsPage';
import History from './routes/History';

function Root() {
  return <h1>Welcome to Volunteer App</h1>;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationsProvider>
        <Routes>
          <Route path="/" element={<Root />} />

          {/* public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* protected (demo-guard always passes) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileWizard />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/matching" element={<VolunteerMatching />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </NotificationsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
