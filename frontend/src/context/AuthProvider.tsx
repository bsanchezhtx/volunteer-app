import { createContext, useEffect, useState } from "react";

import { User } from "../types";
import { useNavigate } from "react-router-dom";
import api from "../api";
import React from "react";
import { toast } from "react-toastify";

type UserContextType = {
  user: User | null;
  token: string | null;
  registerUser: (email: string, password: string, role: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type AuthProps = { children: React.ReactNode };

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: AuthProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setReady(true);
  }, []);

  const registerUser = async (
    email: string,
    password: string,
    role: string
  ) => {
    await api({
      method: "post",
      url: "/auth/register",
      data: { email, password, role },
    })
      .then((response) => {
        if (response) {
          const user = {
            id: response?.data.id,
            role: response?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", response?.data.token);
          setToken(response?.data.token);
          setUser(user);
          toast.success("Registration Successful.");
          navigate("/profile");
        }
      })
      .catch((error) => {
        if (error.status == 409) {
          toast.warning("This email is already in use.");
        } else {
          toast.warning(`A server error occured during registration.`);
        }
      });
  };

  const loginUser = async (email: string, password: string) => {
    await api({
      method: "post",
      url: "/auth/login",
      data: { email, password },
    })
      .then((response) => {
        if (response) {
          const user = {
            id: response?.data.id,
            role: response?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", response?.data.token);
          setToken(response?.data.token!);
          setUser(user);
          toast.success("Login Successful.");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.status == 401) {
          toast.warning("Invalid email and password.");
        } else {
          toast.warning(`A server error occured during login.`);
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/w");
  };

  const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return !!(user && token);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, isLoggedIn, logout }}
    >
      {ready ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
