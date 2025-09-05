import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FarmSetupForm } from '@/components/farm/FarmSetupForm';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const FarmSetup: React.FC = () => {
  const { setupFarm } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleFarmSetup = (farmData: any) => {
    try {
      setupFarm(farmData);
      toast({
        title: "Farm setup complete!",
        description: `Welcome to ${farmData.farmName}`,
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to setup farm. Please try again.');
    }
  };

  return (
    <FarmSetupForm
      onSetupComplete={handleFarmSetup}
      error={error}
    />
  );
};