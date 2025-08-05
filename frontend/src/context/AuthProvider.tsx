import { createContext, useContext, useEffect, useState } from "react";

import { User } from "../types";
import { useNavigate } from "react-router-dom";
import api from "../api";
import axios from "axios";
import React from "react";

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

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
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
            email: response?.data.email,
            role: response?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", response?.data.token);
          setToken(response?.data.token!);
          setUser(user);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
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
            email: response?.data.email,
            role: response?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", response?.data.token);
          setToken(response?.data.token!);
          setUser(user);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, isLoggedIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
