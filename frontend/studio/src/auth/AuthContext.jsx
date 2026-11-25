import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentJwtToken,
  putCurrentJwtToken,
  resetCurrentJwtToken,
} from "../script/LocalStorageUtils";
import { setUnauthorizedHandler } from "../api/client";
import { authApi } from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getCurrentJwtToken);

  const login = useCallback(async (email, password) => {
    const { jwt } = await authApi.login(email, password);
    putCurrentJwtToken(jwt);
    setToken(jwt);
  }, []);

  const logout = useCallback(() => {
    resetCurrentJwtToken();
    setToken(null);
  }, []);

  useEffect(() => setUnauthorizedHandler(logout), [logout]);

  const value = useMemo(
    () => ({ isAuthenticated: Boolean(token), login, logout }),
    [token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};
