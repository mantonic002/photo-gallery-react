import { createContext, useContext, useEffect, useState } from "react";
import { loginApi } from "../api/api";

interface AuthContextType {
  loggedIn: boolean;
  login: (pw: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("token") !== null
  );

  const login = async (pw: string) => {
    try {
      const response = await loginApi(pw);
      localStorage.setItem("token", response.token);
      setLoggedIn(true);
    } catch (err) {
      console.error("Failed login:", err);
      localStorage.removeItem("token");
      setLoggedIn(false);
      throw err;
    }
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
