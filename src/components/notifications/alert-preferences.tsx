import React from 'react';
import { ArrowLeft, Bell, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface AlertPreferencesProps {
  onBack: () => void;
}

export function AlertPreferences({ onBack }: AlertPreferencesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Alert Preferences</h1>
          <p className="text-gray-600">Configure notification settings and alert thresholds</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Customize how and when you receive alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Configure Alerts
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}