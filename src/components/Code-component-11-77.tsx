import React, { useState } from 'react';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesData {
  product: string;
  variant: string;
  totalSales: number;
  revenue: number;
  profit: number;
  quantity: number;
  growth: number;
}

interface TimeSeriesData {
  date: string;
  sales: number;
  revenue: number;
  orders: number;
}

interface TopProduct {
  name: string;
  variant: string;
  sales: number;
  revenue: number;
  percentage: number;
}

const mockSalesData: SalesData[] = [
  {
    product: 'Groundnuts',
    variant: 'TIRA',
    totalSales: 340,
    revenue: 289000,
    profit: 68000,
    quantity: 340,
    growth: 12.5
  },
  {
    product: 'Groundnuts',
    variant: 'WHITE',
    totalSales: 220,
    revenue: 198000,
    profit: 44000,
    quantity: 220,
    growth: -5.2
  },
  {
    product: 'Groundnuts',
    variant: 'MIXED',
    totalSales: 0,
    revenue: 0,
    profit: 0,
    quantity: 0,
    growth: 0
  }
];

const mockTimeSeriesData: TimeSeriesData[] = [
  { date: 'Sep 1', sales: 45, revenue: 38250, orders: 12 },
  { date: 'Sep 2', sales: 52, revenue: 44200, orders: 14 },
  { date: 'Sep 3', sales: 38, revenue: 32300, orders: 10 },
  { date: 'Sep 4', sales: 61, revenue: 51850, orders: 16 },
  { date: 'Sep 5', sales: 48, revenue: 40800, orders: 13 },
  { date: 'Sep 6', sales: 67, revenue: 56950, orders: 18 },
  { date: 'Sep 7', sales: 43, revenue: 36550, orders: 11 },
  { date: 'Sep 8', sales: 59, revenue: 50150, orders: 15 },
  { date: 'Sep 9', sales: 71, revenue: 60350, orders: 19 },
  { date: 'Sep 10', sales: 55, revenue: 46750, orders: 14 },
  { date: 'Sep 11', sales: 49, revenue: 41650, orders: 13 },
  { date: 'Sep 12', sales: 63, revenue: 53550, orders: 17 }
];

const mockTopProducts: TopProduct[] = [
  { name: 'Groundnuts TIRA', variant: 'TIRA', sales: 340, revenue: 289000, percentage: 59.3 },
  { name: 'Groundnuts WHITE', variant: 'WHITE', sales: 220, revenue: 198000, percentage: 40.7 },
  { name: 'Groundnuts MIXED', variant: 'MIXED', sales: 0, revenue: 0, percentage: 0 }
];

const pieChartData = [
  { name: 'TIRA', value: 59.3, color: '#3B82F6' },
  { name: 'WHITE', value: 40.7, color: '#10B981' },
  { name: 'MIXED', value: 0, color: '#F59E0B' }
];

interface SalesAnalyticsProps {
  onNavigate: (section: string) => void;
}

export function SalesAnalytics({ onNavigate }: SalesAnalyticsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('month');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', { 
      style: 'currency', 
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalRevenue = mockSalesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalQuantity = mockSalesData.reduce((sum, item) => sum + item.quantity, 0);
  const totalProfit = mockSalesData.reduce((sum, item) => sum + item.profit, 0);
  const avgOrderValue = totalQuantity > 0 ? totalRevenue / totalQuantity : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('products')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Sales Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive sales performance analysis</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="tira">Groundnuts TIRA</SelectItem>
            <SelectItem value="white">Groundnuts WHITE</SelectItem>
            <SelectItem value="mixed">Groundnuts MIXED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +18.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalProfit)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15.8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgOrderValue)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="trends">Sales Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Daily sales performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockTimeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? formatCurrency(Number(value)) : value,
                        name === 'revenue' ? 'Revenue' : 'Sales'
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Product Mix */}
            <Card>
              <CardHeader>
                <CardTitle>Product Mix</CardTitle>
                <CardDescription>Sales distribution by product variant</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Daily revenue and order volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockTimeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(Number(value)) : value,
                      name === 'revenue' ? 'Revenue' : 'Orders'
                    ]}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#10B981" name="Revenue" />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#F59E0B" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Detailed breakdown by product variant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSalesData.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{product.product} - {product.variant}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {product.quantity} units sold
                        </p>
                      </div>
                      <Badge 
                        className={cn(
                          product.growth > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        )}
                      >
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                        <p className="text-lg font-semibold">{formatCurrency(product.revenue)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Profit</p>
                        <p className="text-lg font-semibold text-green-600">{formatCurrency(product.profit)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Profit Margin</p>
                        <p className="text-lg font-semibold">
                          {product.revenue > 0 ? ((product.profit / product.revenue) * 100).toFixed(1) : 0}%
                        </p>
                      </div>
                    </div>

                    {/* Performance Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Performance vs Target</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Comparison</CardTitle>
                <CardDescription>Month-over-month comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { month: 'Jul', current: 450, previous: 380 },
                    { month: 'Aug', current: 520, previous: 420 },
                    { month: 'Sep', current: 560, previous: 480 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="previous" fill="#9CA3AF" name="Previous Year" />
                    <Bar dataKey="current" fill="#3B82F6" name="Current Year" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Growth Rate */}
            <Card>
              <CardHeader>
                <CardTitle>Growth Rate</CardTitle>
                <CardDescription>Monthly growth percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: 'Jan', growth: 5.2 },
                    { month: 'Feb', growth: 8.1 },
                    { month: 'Mar', growth: 12.4 },
                    { month: 'Apr', growth: 15.2 },
                    { month: 'May', growth: 18.7 },
                    { month: 'Jun', growth: 22.1 },
                    { month: 'Jul', growth: 18.9 },
                    { month: 'Aug', growth: 16.3 },
                    { month: 'Sep', growth: 20.5 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Growth Rate']} />
                    <Line 
                      type="monotone" 
                      dataKey="growth" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>AI-powered analysis of your sales data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-green-800 dark:text-green-400">Top Performer</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Groundnuts TIRA is your best-selling product, contributing 59.3% of total sales.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Opportunity</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Groundnuts WHITE shows declining sales (-5.2%). Consider promotional campaigns.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-400">Trend</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Overall sales show strong upward trend with 18.2% growth this month.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-medium text-red-800 dark:text-red-400">Action Required</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Groundnuts MIXED has zero sales. Review product positioning or consider discontinuation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Strategic suggestions to boost sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Increase TIRA Production</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        With high demand and strong growth, consider increasing production capacity for TIRA variant.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Package className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Promote WHITE Variant</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Launch targeted marketing campaigns to boost WHITE variant sales and reverse the declining trend.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Users className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Customer Segmentation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Analyze customer preferences to understand why TIRA performs better and apply insights to other variants.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}