import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, DollarSign, Package, TrendingUp, Users, AlertTriangle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, farm } = useAuth();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,500',
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Active Livestock',
      value: '247',
      icon: Users,
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Inventory Items',
      value: '89',
      icon: Package,
      trend: '-2.1%',
      trendUp: false
    },
    {
      title: 'Alerts',
      value: '3',
      icon: AlertTriangle,
      trend: 'Active',
      trendUp: false
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening at {farm?.farmName} today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="farm-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`h-3 w-3 ${
                      stat.trendUp ? 'text-green-600' : 'text-red-600'
                    }`} />
                    <span className={`text-xs ${
                      stat.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="farm-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Feed inventory updated', time: '2 hours ago', type: 'inventory' },
                { action: 'New livestock health check', time: '4 hours ago', type: 'health' },
                { action: 'Sale recorded: $1,200', time: '1 day ago', type: 'sale' },
                { action: 'Equipment maintenance scheduled', time: '2 days ago', type: 'maintenance' }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'sale' ? 'bg-green-500' :
                    activity.type === 'health' ? 'bg-blue-500' :
                    activity.type === 'inventory' ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="farm-card">
          <CardHeader>
            <CardTitle>Farm Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Farm Type</p>
                <p className="font-medium capitalize">{farm?.farmType?.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{farm?.farmLocation}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Established</p>
                <p className="font-medium">January 2020</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Size</p>
                <p className="font-medium">245 acres</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};