'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  jwt: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (jwt: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedJwt = localStorage.getItem('jwt');
    const storedUser = localStorage.getItem('user');

    if (storedJwt && storedUser) {
      try {
        setJwt(storedJwt);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Invalid stored data, clear it
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newJwt: string, newUser: User) => {
    localStorage.setItem('jwt', newJwt);
    localStorage.setItem('user', JSON.stringify(newUser));
    setJwt(newJwt);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setJwt(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        jwt,
        isLoading,
        isLoggedIn: !!jwt && !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
