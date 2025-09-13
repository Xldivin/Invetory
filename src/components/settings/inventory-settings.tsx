import React from 'react';
import { ArrowLeft, Package, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface InventorySettingsProps {
  onBack: () => void;
}

export function InventorySettings({ onBack }: InventorySettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Settings</h1>
          <p className="text-gray-600">Configure inventory tracking and thresholds</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Inventory Configuration
          </CardTitle>
          <CardDescription>Set up inventory tracking methods and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Configure Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}