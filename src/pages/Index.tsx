import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { FarmSetupForm } from '@/components/farm/FarmSetupForm';
import { DashboardPlaceholder } from '@/components/dashboard/DashboardPlaceholder';
import { toast } from '@/hooks/use-toast';

type AppState = 'login' | 'register' | 'farmSetup' | 'dashboard';

const Index = () => {
  const { user, farm, isAuthenticated, login, register, setupFarm, logout } = useAuth();
  const [currentState, setCurrentState] = useState<AppState>(() => {
    if (isAuthenticated) {
      return farm ? 'dashboard' : 'farmSetup';
    }
    return 'login';
  });
  const [error, setError] = useState<string>('');

  const handleLogin = async (credentials: { username: string; password: string }) => {
    const success = await login(credentials.username, credentials.password);
    if (success) {
      setError('');
      setCurrentState(farm ? 'dashboard' : 'farmSetup');
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = async (userData: any) => {
    const success = await register(userData);
    if (success) {
      setError('');
      setCurrentState('farmSetup');
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
    } else {
      setError('Username or email already exists');
    }
  };

  const handleFarmSetup = (farmData: any) => {
    setupFarm(farmData);
    setCurrentState('dashboard');
    toast({
      title: "Farm setup complete!",
      description: `Welcome to ${farmData.farmName}`,
    });
  };

  const handleLogout = () => {
    logout();
    setCurrentState('login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Update state when auth context changes
  React.useEffect(() => {
    if (isAuthenticated) {
      setCurrentState(farm ? 'dashboard' : 'farmSetup');
    } else {
      setCurrentState('login');
    }
  }, [isAuthenticated, farm]);

  switch (currentState) {
    case 'login':
      return (
        <LoginForm
          onLogin={handleLogin}
          onShowRegister={() => setCurrentState('register')}
          error={error}
        />
      );
    
    case 'register':
      return (
        <RegisterForm
          onRegister={handleRegister}
          onShowLogin={() => setCurrentState('login')}
          error={error}
        />
      );
    
    case 'farmSetup':
      return (
        <FarmSetupForm
          onSetupComplete={handleFarmSetup}
          error={error}
        />
      );
    
    case 'dashboard':
      return user && farm ? (
        <DashboardPlaceholder
          user={user}
          farm={farm}
          onLogout={handleLogout}
        />
      ) : null;
    
    default:
      return null;
  }
};

export default Index;
