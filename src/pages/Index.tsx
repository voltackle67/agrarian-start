import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type AppState = 'login' | 'register';

const Index = () => {
  const { login, register, isAuthenticated, farm } = useAuth();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [error, setError] = useState<string>('');

  // Redirect authenticated users to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(farm ? '/dashboard' : '/farm-setup');
    }
  }, [isAuthenticated, farm, navigate]);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    const success = await login(credentials.username, credentials.password);
    if (success) {
      setError('');
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      // Navigation will be handled by useEffect
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = async (userData: any) => {
    const success = await register(userData);
    if (success) {
      setError('');
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
      // Navigation will be handled by useEffect
    } else {
      setError('Username or email already exists');
    }
  };

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
    
    default:
      return null;
  }
};

export default Index;
