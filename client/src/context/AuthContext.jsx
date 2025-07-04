import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const API = axios.create({ baseURL: API_URL, timeout: 10000 });
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken"));

  // set axios auth header and interceptor
  useEffect(() => {
    if (accessToken) {
      API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }

    const interceptor = API.interceptors.response.use(
      res => res,
      async err => {
        const originalReq = err.config;
        // if 401 on access and not already retried
        if (err.response?.status === 401 && refreshToken && !originalReq._retry) {
          originalReq._retry = true;
          try {
            const { data } = await API.post("/auth/refresh", null, {
              headers: { Authorization: `Bearer ${refreshToken}` }
            });
            setAccessToken(data.access_token);
            localStorage.setItem("accessToken", data.access_token);
            API.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
            originalReq.headers["Authorization"] = `Bearer ${data.access_token}`;
            return API(originalReq);
          } catch (_e) {
            // refresh failed: log out
            logout();
          }
        }
        return Promise.reject(err);
      }
    );

    return () => API.interceptors.response.eject(interceptor);
  }, [accessToken, refreshToken]);

  const login = async (username, password) => {
    const { data } = await API.post("/auth/login", { username, password });
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
    setUser(data.user);
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;