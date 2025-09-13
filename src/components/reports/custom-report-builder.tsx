import React from 'react';
import { ArrowLeft, BarChart3, Settings, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface CustomReportBuilderProps {
  onBack: () => void;
}

export function CustomReportBuilder({ onBack }: CustomReportBuilderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Custom Report Builder</h1>
          <p className="text-gray-600">Create custom reports with drag-and-drop interface</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Report Builder
          </CardTitle>
          <CardDescription>Build custom reports with flexible data selection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Report Builder</h3>
            <p className="text-gray-600 mb-6">Advanced reporting features coming soon</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}