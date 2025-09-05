import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sprout, MapPin, Phone, Building } from 'lucide-react';

interface FarmData {
  farmName: string;
  farmLocation: string;
  phoneNumber: string;
  farmType: string;
}

interface FarmSetupFormProps {
  onSetupComplete: (farmData: FarmData) => void;
  error?: string;
}

const farmTypes = [
  { value: 'dairy', label: 'Dairy Farm' },
  { value: 'poultry', label: 'Poultry Farm' },
  { value: 'crops', label: 'Crop Farm' },
  { value: 'mixed', label: 'Mixed Farm' },
  { value: 'other', label: 'Other' }
];

export const FarmSetupForm: React.FC<FarmSetupFormProps> = ({ 
  onSetupComplete, 
  error 
}) => {
  const [formData, setFormData] = useState<FarmData>({
    farmName: '',
    farmLocation: '',
    phoneNumber: '',
    farmType: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.farmName.trim()) {
      newErrors.farmName = 'Farm name is required';
    }
    
    if (!formData.farmLocation.trim()) {
      newErrors.farmLocation = 'Farm location is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.farmType) {
      newErrors.farmType = 'Please select a farm type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSetupComplete(formData);
    }
  };

  const handleInputChange = (field: keyof FarmData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-primary">
              <Sprout size={32} />
              <h1 className="text-2xl font-bold">FarmManager</h1>
            </div>
          </div>
          <p className="text-muted-foreground">Set up your farm information</p>
        </div>

        {/* Farm Setup Form */}
        <Card className="farm-card">
          <CardHeader>
            <CardTitle className="text-center">Farm Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="farmName"
                    type="text"
                    placeholder="Enter your farm name"
                    value={formData.farmName}
                    onChange={(e) => handleInputChange('farmName', e.target.value)}
                    className="pl-9"
                  />
                </div>
                {errors.farmName && (
                  <p className="text-sm text-destructive">{errors.farmName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmLocation">Farm Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="farmLocation"
                    type="text"
                    placeholder="Enter your farm address"
                    value={formData.farmLocation}
                    onChange={(e) => handleInputChange('farmLocation', e.target.value)}
                    className="pl-9"
                  />
                </div>
                {errors.farmLocation && (
                  <p className="text-sm text-destructive">{errors.farmLocation}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="pl-9"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmType">Farm Type</Label>
                <Select onValueChange={(value) => handleInputChange('farmType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your farm type" />
                  </SelectTrigger>
                  <SelectContent>
                    {farmTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.farmType && (
                  <p className="text-sm text-destructive">{errors.farmType}</p>
                )}
              </div>

              <Button type="submit" className="w-full farm-gradient">
                Save Farm Information
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};