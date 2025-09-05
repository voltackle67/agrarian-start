import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sprout, Settings, LogOut, BarChart3, Users, Calendar } from 'lucide-react';

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

interface DashboardPlaceholderProps {
  user: User;
  farm: Farm;
  onLogout: () => void;
}

export const DashboardPlaceholder: React.FC<DashboardPlaceholderProps> = ({
  user,
  farm,
  onLogout
}) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-foreground">FarmManager</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.fullName}
              </span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Welcome to {farm.farmName}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your farm management dashboard is ready. This is where you'll manage all aspects of your farm operations.
            </p>
          </div>

          {/* Farm Info Card */}
          <Card className="farm-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Farm Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Farm Name</Label>
                  <p className="font-medium">{farm.farmName}</p>
                </div>
                <div>
                  <Label>Farm Type</Label>
                  <p className="font-medium capitalize">{farm.farmType.replace('_', ' ')}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="font-medium">{farm.farmLocation}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="font-medium">{farm.phoneNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="farm-card text-center">
              <CardContent className="p-6">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track farm performance and productivity metrics
                </p>
              </CardContent>
            </Card>

            <Card className="farm-card text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Livestock</h3>
                <p className="text-sm text-muted-foreground">
                  Manage animals, health records, and feeding schedules
                </p>
              </CardContent>
            </Card>

            <Card className="farm-card text-center">
              <CardContent className="p-6">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule tasks, crops, and seasonal activities
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center py-8">
            <div className="hero-gradient rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">More Features Coming Soon!</h3>
              <p className="text-white/90 max-w-2xl mx-auto">
                We're working on adding comprehensive farm management tools including 
                livestock tracking, crop planning, financial management, and detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper component for consistent labels
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-sm text-muted-foreground block mb-1">{children}</span>
);