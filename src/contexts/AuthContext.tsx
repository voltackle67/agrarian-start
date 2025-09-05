import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  fullName: string;
  username: string;
  email: string;
}

interface Farm {
  farmName: string;
  farmLocation: string;
  phoneNumber: string;
  farmType: string;
}

interface AuthContextType {
  user: User | null;
  farm: Farm | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: User & { password: string }) => Promise<boolean>;
  setupFarm: (farmData: Farm) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [farm, setFarm] = useState<Farm | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('farmapp_user');
    const savedFarm = localStorage.getItem('farmapp_farm');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    if (savedFarm) {
      setFarm(JSON.parse(savedFarm));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    // For now, we'll simulate checking against registered users
    const savedUsers = JSON.parse(localStorage.getItem('farmapp_registered_users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.username === username && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('farmapp_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const register = async (userData: User & { password: string }): Promise<boolean> => {
    // In a real app, this would make an API call to create the user
    // For now, we'll save to localStorage
    try {
      const existingUsers = JSON.parse(localStorage.getItem('farmapp_registered_users') || '[]');
      
      // Check if username or email already exists
      const userExists = existingUsers.some((u: any) => 
        u.username === userData.username || u.email === userData.email
      );
      
      if (userExists) {
        return false;
      }
      
      existingUsers.push(userData);
      localStorage.setItem('farmapp_registered_users', JSON.stringify(existingUsers));
      
      const { password: _, ...userWithoutPassword } = userData;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('farmapp_user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const setupFarm = (farmData: Farm) => {
    setFarm(farmData);
    localStorage.setItem('farmapp_farm', JSON.stringify(farmData));
  };

  const logout = () => {
    setUser(null);
    setFarm(null);
    setIsAuthenticated(false);
    localStorage.removeItem('farmapp_user');
    localStorage.removeItem('farmapp_farm');
  };

  return (
    <AuthContext.Provider value={{
      user,
      farm,
      isAuthenticated,
      login,
      register,
      setupFarm,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};