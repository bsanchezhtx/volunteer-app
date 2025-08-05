import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

type Props = { children: React.ReactNode; role: string };

const ProtectedRoute = ({ children, role }: Props) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuthContext();

  return isLoggedIn() && user?.role === role ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};

export default ProtectedRoute;
