import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../services/StorageService';
import { StorageService } from '../services/StorageService';

interface AuthContextType {
  user: User | null;
  login: (username: string, password?: string) => boolean;
  signup: (username: string, cafeName: string, password?: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('active_session_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Seed Admin on first load
  useEffect(() => {
    const users = StorageService.getUsers();
    if (!users.find(u => u.username === 'admin')) {
      StorageService.saveUser({
        id: 'admin-1',
        username: 'admin',
        password: 'admin123',
        name: 'Verma Admin',
        role: 'admin',
        purchasedThemes: []
      });
    }
  }, []);

  const login = (username: string, _password?: string) => {
    const existingUser = StorageService.getUserByUsername(username);
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('active_session_user', JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  const signup = (username: string, cafeName: string, _password?: string) => {
    const existingUser = StorageService.getUserByUsername(username);
    if (existingUser) return false;

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: username.toLowerCase(),
      name: cafeName,
      password: _password,
      role: 'user',
      purchasedThemes: []
    };

    StorageService.saveUser(newUser);
    StorageService.initDefaultMenu(newUser.username, cafeName);
    
    setUser(newUser);
    localStorage.setItem('active_session_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('active_session_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    StorageService.saveUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, signup, logout, updateUser,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
