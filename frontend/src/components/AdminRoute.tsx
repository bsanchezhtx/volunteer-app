import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuthContext();

  return isLoggedIn() && user?.role === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
  );
};

export default ProtectedRoute;
