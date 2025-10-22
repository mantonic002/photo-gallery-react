import { createContext, useContext, useEffect, useState } from "react";
import { loginApi } from "../api/api";

interface AuthContextType {
  loggedIn: boolean;
  login: (pw: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const login = async (pw: string) => {
    try {
      await loginApi(pw);
      setLoggedIn(true);
    } catch (err) {
      console.error("Failed login:", err);
      setLoggedIn(false);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login,
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
