import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const stored = localStorage.getItem("travelease_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const signup = (name: string, email: string, password: string): boolean => {
    const existing = localStorage.getItem(`travelease_acc_${email}`);
    if (existing) return false; // email already used

    // Save account
    localStorage.setItem(`travelease_acc_${email}`, JSON.stringify({ name, email, password }));
    const userData = { name, email };
    localStorage.setItem("travelease_user", JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const stored = localStorage.getItem(`travelease_acc_${email}`);
    if (!stored) return false;
    const acc = JSON.parse(stored);
    if (acc.password !== password) return false;

    const userData = { name: acc.name, email: acc.email };
    localStorage.setItem("travelease_user", JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("travelease_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};