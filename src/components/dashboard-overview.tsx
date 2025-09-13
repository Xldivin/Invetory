import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  AlertTriangle,
  Users,
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 45000, orders: 120 },
  { month: 'Feb', revenue: 52000, orders: 140 },
  { month: 'Mar', revenue: 48000, orders: 110 },
  { month: 'Apr', revenue: 61000, orders: 180 },
  { month: 'May', revenue: 55000, orders: 165 },
  { month: 'Jun', revenue: 67000, orders: 190 },
  { month: 'Jul', revenue: 72000, orders: 210 },
  { month: 'Aug', revenue: 69000, orders: 195 },
  { month: 'Sep', revenue: 75000, orders: 220 }
];

const topProducts = [
  { name: 'products.groundnutsTira', sales: 340, revenue: 289000, trend: 'up' },
  { name: 'products.groundnutsWhite', sales: 220, revenue: 198000, trend: 'up' },
  { name: 'products.groundnutsMixed', sales: 180, revenue: 144000, trend: 'down' }
];

const recentActivity = [
  { id: 1, action: 'Stock updated', product: 'products.groundnutsTira', time: '2 minutes ago', type: 'stock' },
  { id: 2, action: 'New order received', product: 'Order #1234', time: '5 minutes ago', type: 'order' },
  { id: 3, action: 'Low stock alert', product: 'products.groundnutsWhite', time: '10 minutes ago', type: 'alert' },
  { id: 4, action: 'Product added', product: 'products.groundnutsPremium', time: '1 hour ago', type: 'product' }
];

interface DashboardOverviewProps {
  onNavigate?: (section: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps = {}) {
  const { t } = useTranslation();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('rw-RW', { 
      style: 'currency', 
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div className="px-2 sm:px-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{t('dashboard.title')}</h1>
        <p className="text-sm sm:text-base text-gray-600">{t('dashboard.welcome')} {t('dashboard.overview')}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('dashboard.totalProducts')}</CardTitle>
            <Package className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg sm:text-2xl font-bold">1,430</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
              +180 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('products.lowStock')}</CardTitle>
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg sm:text-2xl font-bold text-yellow-600">3</div>
            <p className="text-xs text-red-600 flex items-center">
              <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('dashboard.totalOrders')}</CardTitle>
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg sm:text-2xl font-bold">24</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('dashboard.totalRevenue')}</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrency(89500)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
              +8% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('sales.revenue')} {t('sales.salesTrends')}</CardTitle>
            <CardDescription>{t('sales.salesOverview')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  dot={{ fill: '#2563EB' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('orders.management')} {t('sales.salesTrends')}</CardTitle>
            <CardDescription>{t('orders.allOrders')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.topProducts')}</CardTitle>
            <CardDescription>{t('sales.topSellingProducts')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t(product.name)}</p>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(product.revenue)}</p>
                  <div className="flex items-center">
                    {product.trend === 'up' ? (
                      <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-red-600 mr-1" />
                    )}
                    <span className={`text-xs ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {product.trend === 'up' ? '+12%' : '-5%'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
            <CardDescription>{t('dashboard.inventoryAlerts')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'stock' ? 'bg-blue-100' :
                  activity.type === 'order' ? 'bg-green-100' :
                  activity.type === 'alert' ? 'bg-yellow-100' :
                  'bg-purple-100'
                }`}>
                  {activity.type === 'stock' && <Package className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'order' && <ShoppingCart className="w-4 h-4 text-green-600" />}
                  {activity.type === 'alert' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                  {activity.type === 'product' && <Package className="w-4 h-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.product.startsWith('products.') ? t(activity.product) : activity.product}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Button 
              onClick={() => onNavigate?.('add-product')}
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 sm:h-16 flex flex-col items-center justify-center text-xs sm:text-sm"
            >
              <Package className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
              <span className="leading-tight">Add Product</span>
            </Button>
            <Button 
              onClick={() => onNavigate?.('create-order')}
              variant="outline" 
              className="h-12 sm:h-16 flex flex-col items-center justify-center text-xs sm:text-sm"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
              <span className="leading-tight">Create Order</span>
            </Button>
            <Button 
              onClick={() => onNavigate?.('customers')}
              variant="outline" 
              className="h-12 sm:h-16 flex flex-col items-center justify-center text-xs sm:text-sm"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
              <span className="leading-tight">Add Customer</span>
            </Button>
            <Button 
              onClick={() => onNavigate?.('reports')}
              variant="outline" 
              className="h-12 sm:h-16 flex flex-col items-center justify-center text-xs sm:text-sm"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
              <span className="leading-tight">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}