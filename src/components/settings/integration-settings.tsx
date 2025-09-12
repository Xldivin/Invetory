import React from 'react';
import { ArrowLeft, Globe, Plug } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface IntegrationSettingsProps {
  onBack: () => void;
}

export function IntegrationSettings({ onBack }: IntegrationSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Integration Settings</h1>
          <p className="text-gray-600">Manage API configurations and third-party connections</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            API & Integrations
          </CardTitle>
          <CardDescription>Configure external system integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plug className="w-4 h-4 mr-2" />
            Manage Integrations
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}