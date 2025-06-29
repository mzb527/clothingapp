import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { loginService } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    let interceptor;
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // intercept 401/403
      interceptor = axios.interceptors.response.use(
        r => r,
        err => {
          if ([401, 403].includes(err.response?.status)) {
            logout();
          }
          return Promise.reject(err);
        }
      );
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    return () => {
      if (interceptor) axios.interceptors.response.eject(interceptor);
    };
    // eslint-disable-next-line
  }, [token]);

  const login = async (username, password) => {
    const { access_token, user } = await loginService({ username, password });
    setToken(access_token);
    setUser(user);
    localStorage.setItem("token", access_token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;