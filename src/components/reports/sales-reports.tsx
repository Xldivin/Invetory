import React from 'react';
import { ArrowLeft, TrendingUp, BarChart3, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface SalesReportsProps {
  onBack: () => void;
}

export function SalesReports({ onBack }: SalesReportsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sales Reports</h1>
          <p className="text-gray-600">Sales performance and customer analytics</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Sales Reports
          </CardTitle>
          <CardDescription>Generate sales performance reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <TrendingUp className="w-6 h-6 mb-2" />
              Sales Performance
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Users className="w-6 h-6 mb-2" />
              Customer Analysis
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <BarChart3 className="w-6 h-6 mb-2" />
              Product Performance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}