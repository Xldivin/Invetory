import React from 'react';
import { ArrowLeft, Package, Download, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface InventoryReportsProps {
  onBack: () => void;
}

export function InventoryReports({ onBack }: InventoryReportsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Reports</h1>
          <p className="text-gray-600">Detailed inventory analysis and stock reports</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Inventory Reports
          </CardTitle>
          <CardDescription>Generate and download inventory reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Package className="w-6 h-6 mb-2" />
              Stock Levels Report
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Filter className="w-6 h-6 mb-2" />
              Stock Valuation
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Download className="w-6 h-6 mb-2" />
              Movement Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}