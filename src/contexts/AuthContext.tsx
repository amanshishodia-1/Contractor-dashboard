import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored auth token on app load
    const storedToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    
    if (storedToken && storedUsername) {
      setUser({ username: storedUsername, token: storedToken });
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - accept any username, password must be 'test123'
    if (password === 'test123') {
      const mockToken = `mock-jwt-token-${Date.now()}`;
      const userData = { username, token: mockToken };
      
      setUser(userData);
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('username', username);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
