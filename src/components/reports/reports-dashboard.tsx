import React from 'react';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign,
  Calendar,
  Download,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ReportsDashboardProps {
  onNavigateToReport: (reportType: string) => void;
}

const reportCategories = [
  {
    id: 'inventory-reports',
    title: 'Inventory Reports',
    description: 'Stock levels, valuations, and movement analysis',
    icon: Package,
    color: 'blue',
    reports: [
      { name: 'Stock Levels Report', lastGenerated: '2025-09-11', size: '2.5 MB' },
      { name: 'Stock Valuation Report', lastGenerated: '2025-09-10', size: '1.8 MB' },
      { name: 'Movement Analysis', lastGenerated: '2025-09-09', size: '3.2 MB' }
    ]
  },
  {
    id: 'sales-reports',
    title: 'Sales Reports',
    description: 'Sales performance, trends, and customer analysis',
    icon: TrendingUp,
    color: 'green',
    reports: [
      { name: 'Sales Performance Report', lastGenerated: '2025-09-11', size: '4.1 MB' },
      { name: 'Customer Analysis', lastGenerated: '2025-09-10', size: '2.9 MB' },
      { name: 'Product Performance', lastGenerated: '2025-09-09', size: '3.5 MB' }
    ]
  },
  {
    id: 'financial-reports',
    title: 'Financial Reports',
    description: 'Revenue, profit margins, and financial summaries',
    icon: DollarSign,
    color: 'purple',
    reports: [
      { name: 'Profit & Loss Report', lastGenerated: '2025-09-11', size: '1.2 MB' },
      { name: 'Revenue Analysis', lastGenerated: '2025-09-10', size: '2.1 MB' },
      { name: 'Cost Analysis', lastGenerated: '2025-09-08', size: '1.9 MB' }
    ]
  },
  {
    id: 'operational-reports',
    title: 'Operational Reports',
    description: 'Warehouse operations, transfers, and efficiency',
    icon: BarChart3,
    color: 'orange',
    reports: [
      { name: 'Warehouse Efficiency', lastGenerated: '2025-09-11', size: '2.8 MB' },
      { name: 'Transfer Log Report', lastGenerated: '2025-09-10', size: '1.5 MB' },
      { name: 'Order Fulfillment', lastGenerated: '2025-09-09', size: '3.0 MB' }
    ]
  }
];

const quickStats = [
  { label: 'Reports Generated', value: '127', change: '+12%', icon: FileText, color: 'blue' },
  { label: 'Data Points', value: '45.2K', change: '+8%', icon: BarChart3, color: 'green' },
  { label: 'Download Size', value: '89.3 MB', change: '+15%', icon: Download, color: 'purple' },
  { label: 'Active Users', value: '24', change: '+3%', icon: Users, color: 'orange' }
];

export function ReportsDashboard({ onNavigateToReport }: ReportsDashboardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-600' };
      case 'green':
        return { bg: 'bg-green-100', text: 'text-green-600', icon: 'text-green-600' };
      case 'purple':
        return { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'text-purple-600' };
      case 'orange':
        return { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'text-orange-600' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', icon: 'text-gray-600' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate insights and track performance across your inventory</p>
        </div>
        <Button onClick={() => onNavigateToReport('custom-report-builder')} className="bg-blue-600 hover:bg-blue-700 text-white">
          <BarChart3 className="w-4 h-4 mr-2" />
          Custom Report Builder
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${colors.icon}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${colors.text}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCategories.map((category) => {
          const colors = getColorClasses(category.color);
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                      <category.icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigateToReport(category.id)}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">{report.name}</p>
                        <p className="text-xs text-gray-500">
                          Generated: {new Date(report.lastGenerated).toLocaleDateString()} • {report.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => onNavigateToReport(category.id)}
                >
                  View All {category.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Report Activity</CardTitle>
          <CardDescription>Latest reports generated and downloaded</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Generated Stock Levels Report', user: 'John Doe', time: '2 hours ago', type: 'generate' },
              { action: 'Downloaded Sales Performance Report', user: 'Jane Smith', time: '4 hours ago', type: 'download' },
              { action: 'Created Custom Inventory Analysis', user: 'Admin', time: '6 hours ago', type: 'custom' },
              { action: 'Scheduled Monthly Summary Report', user: 'System', time: '1 day ago', type: 'schedule' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'generate' ? 'bg-blue-100' :
                  activity.type === 'download' ? 'bg-green-100' :
                  activity.type === 'custom' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  {activity.type === 'generate' && <FileText className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'download' && <Download className="w-4 h-4 text-green-600" />}
                  {activity.type === 'custom' && <BarChart3 className="w-4 h-4 text-purple-600" />}
                  {activity.type === 'schedule' && <Calendar className="w-4 h-4 text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Generate common reports or create custom analyses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
              onClick={() => onNavigateToReport('inventory-reports')}
            >
              <Package className="w-5 h-5 mb-1" />
              Stock Report
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
              onClick={() => onNavigateToReport('sales-reports')}
            >
              <TrendingUp className="w-5 h-5 mb-1" />
              Sales Report
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
            >
              <DollarSign className="w-5 h-5 mb-1" />
              Financial Report
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center"
              onClick={() => onNavigateToReport('custom-report-builder')}
            >
              <BarChart3 className="w-5 h-5 mb-1" />
              Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}