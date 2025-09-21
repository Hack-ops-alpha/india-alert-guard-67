import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'admin';
  location?: string;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'student' | 'admin') => Promise<boolean>;
  register: (userData: any, type: 'student' | 'admin') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('beacon_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('beacon_user');
      }
    }
  }, []);

  const login = async (email: string, password: string, type: 'student' | 'admin'): Promise<boolean> => {
    // Simulate API call - replace with actual authentication
    const storedUsers = JSON.parse(localStorage.getItem('beacon_users') || '[]');
    const foundUser = storedUsers.find((u: any) => 
      u.email === email && u.password === password && u.type === type
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('beacon_user', JSON.stringify(userWithoutPassword));
      return true;
    }

    // Demo users for testing
    if (email === 'student@demo.com' && password === 'demo123' && type === 'student') {
      const demoUser = {
        id: 'demo_student',
        name: 'Demo Student',
        email: 'student@demo.com',
        type: 'student' as const,
        location: 'Mumbai, Maharashtra'
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('beacon_user', JSON.stringify(demoUser));
      return true;
    }

    if (email === 'admin@demo.com' && password === 'admin123' && type === 'admin') {
      const demoUser = {
        id: 'demo_admin',
        name: 'Demo Admin',
        email: 'admin@demo.com',
        type: 'admin' as const,
        organization: 'Disaster Management Authority'
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('beacon_user', JSON.stringify(demoUser));
      return true;
    }

    return false;
  };

  const register = async (userData: any, type: 'student' | 'admin'): Promise<boolean> => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('beacon_users') || '[]');
      
      // Check if user already exists
      const existingUser = storedUsers.find((u: any) => u.email === userData.email);
      if (existingUser) {
        return false; // User already exists
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        type,
        createdAt: new Date().toISOString()
      };

      storedUsers.push(newUser);
      localStorage.setItem('beacon_users', JSON.stringify(storedUsers));

      // Auto login after registration
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('beacon_user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('beacon_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};