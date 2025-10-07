import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, isAuthenticated, isAdmin } from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdminUser: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isAdminUser: false,
  setUser: () => {},
  setIsLoggedIn: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated());
  const [isAdminUser, setIsAdminUser] = useState<boolean>(isAdmin());

  useEffect(() => {
    setIsAdminUser(isAdmin());
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdminUser, setUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};