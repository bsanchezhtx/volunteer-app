import { createContext, useContext, useEffect, useState } from "react";

import { User } from "../types";
import { useNavigate } from "react-router-dom";
import api from "../api";
import axios from "axios";

type UserContextType = {
  user: User | null;
  token: string | null;
  registerUser: (email: string, password: string) => void;
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
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (email && token) {
      setUser(JSON.parse(email));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }, []);

  const registerUser = async (email: string, password: string) => {
    await api({
      method: "post",
      url: "/register",
      data: { email, password },
    }).then((response) => {
      if (response) {
        const user = {
          email: response?.data.email,
          role: response?.data.role,
        };
        localStorage.setItem("token", response?.data.token);
        setToken(response?.data.token!);
        localStorage.setItem("email", user.email);
        setUser(user);
        navigate("/dashboard");
      }
    });
  };

  const loginUser = async (email: string, password: string) => {
    await api({
      method: "post",
      url: "/login",
      data: { email, password },
    }).then((response) => {
      if (response) {
        const user = {
          email: response?.data.email,
          role: response?.data.role,
        };
        localStorage.setItem("token", response?.data.token);
        setToken(response?.data.token!);
        localStorage.setItem("email", user.email);
        setUser(user);
        navigate("/dashboard");
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
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

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw Error("Must be used within context");
  }
}

export default AuthContext;
