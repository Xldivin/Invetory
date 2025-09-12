import React, { useState } from 'react';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  Plus,
  Minus,
  Search,
  Filter,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface InventoryEntry {
  id: string;
  productName: string;
  variant: string;
  sku: string;
  beginningStock: number;
  purchasedStock: number;
  salesStock: number;
  adjustments: number;
  closingStock: number;
  minStock: number;
  maxStock: number;
  stockValue: number;
  lastUpdated: string;
  warehouse: string;
}

interface StockMovement {
  id: string;
  productName: string;
  variant: string;
  type: 'purchase' | 'sale' | 'adjustment' | 'transfer';
  quantity: number;
  date: string;
  reference: string;
  warehouse: string;
}

const mockInventoryData: InventoryEntry[] = [
  {
    id: '1',
    productName: 'Groundnuts',
    variant: 'TIRA',
    sku: 'GN-TIRA-001',
    beginningStock: 1000,
    purchasedStock: 500,
    salesStock: 250,
    adjustments: 0,
    closingStock: 1250,
    minStock: 500,
    maxStock: 2000,
    stockValue: 812500,
    lastUpdated: '2025-09-12',
    warehouse: 'Kigali Main'
  },
  {
    id: '2',
    productName: 'Groundnuts',
    variant: 'WHITE',
    sku: 'GN-WHITE-001',
    beginningStock: 800,
    purchasedStock: 200,
    salesStock: 820,
    adjustments: 0,
    closingStock: 180,
    minStock: 500,
    maxStock: 1500,
    stockValue: 126000,
    lastUpdated: '2025-09-12',
    warehouse: 'Nyabugogo'
  }
];

const mockStockMovements: StockMovement[] = [
  {
    id: '1',
    productName: 'Groundnuts',
    variant: 'TIRA',
    type: 'purchase',
    quantity: 500,
    date: '2025-09-12',
    reference: 'PO-2025-001',
    warehouse: 'Kigali Main'
  },
  {
    id: '2',
    productName: 'Groundnuts',
    variant: 'WHITE',
    type: 'sale',
    quantity: -50,
    date: '2025-09-12',
    reference: 'SO-2025-089',
    warehouse: 'Nyabugogo'
  }
];

interface InventoryTrackingProps {
  onNavigate: (section: string) => void;
}

export function InventoryTracking({ onNavigate }: InventoryTrackingProps) {
  const [inventoryData] = useState<InventoryEntry[]>(mockInventoryData);
  const [stockMovements] = useState<StockMovement[]>(mockStockMovements);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('today');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', { 
      style: 'currency', 
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const getStockStatus = (current: number, min: number, max: number) => {
    if (current === 0) return { status: 'out-of-stock', color: 'bg-red-500' };
    if (current <= min) return { status: 'low-stock', color: 'bg-yellow-500' };
    if (current >= max) return { status: 'overstock', color: 'bg-orange-500' };
    return { status: 'normal', color: 'bg-green-500' };
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'sale':
        return <Minus className="w-4 h-4 text-red-600" />;
      case 'adjustment':
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      case 'transfer':
        return <Package className="w-4 h-4 text-purple-600" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const totalStockValue = inventoryData.reduce((sum, item) => sum + item.stockValue, 0);
  const lowStockItems = inventoryData.filter(item => item.closingStock <= item.minStock && item.closingStock > 0);
  const outOfStockItems = inventoryData.filter(item => item.closingStock === 0);
  const overstockItems = inventoryData.filter(item => item.closingStock >= item.maxStock);

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
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Inventory Tracking</h1>
            <p className="text-gray-600 dark:text-gray-400">Real-time inventory monitoring and stock movements</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Value</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalStockValue)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems.length}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems.length}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Products unavailable</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overstock Items</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overstockItems.length}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Above maximum levels</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              <SelectItem value="kigali">Kigali Main</SelectItem>
              <SelectItem value="nyabugogo">Nyabugogo</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Stock Overview</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>Real-time stock levels and calculations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Beginning</TableHead>
                    <TableHead>Purchased</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Closing Stock</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => {
                    const stockStatus = getStockStatus(item.closingStock, item.minStock, item.maxStock);
                    const stockPercentage = getStockPercentage(item.closingStock, item.maxStock);
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.productName}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{item.variant} - {item.sku}</div>
                          </div>
                        </TableCell>
                        <TableCell>{item.beginningStock}</TableCell>
                        <TableCell className="text-green-600">+{item.purchasedStock}</TableCell>
                        <TableCell className="text-red-600">-{item.salesStock}</TableCell>
                        <TableCell>
                          <span className="font-medium">{item.closingStock}</span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress value={stockPercentage} className="h-2" />
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {item.closingStock} / {item.maxStock}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(item.stockValue)}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            stockStatus.status === 'out-of-stock' && "bg-red-100 text-red-800 hover:bg-red-100",
                            stockStatus.status === 'low-stock' && "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
                            stockStatus.status === 'overstock' && "bg-orange-100 text-orange-800 hover:bg-orange-100",
                            stockStatus.status === 'normal' && "bg-green-100 text-green-800 hover:bg-green-100"
                          )}>
                            {stockStatus.status === 'out-of-stock' && 'Out of Stock'}
                            {stockStatus.status === 'low-stock' && 'Low Stock'}
                            {stockStatus.status === 'overstock' && 'Overstock'}
                            {stockStatus.status === 'normal' && 'Normal'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Stock Movements</CardTitle>
              <CardDescription>Track all inventory changes and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Warehouse</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{movement.productName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{movement.variant}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getMovementIcon(movement.type)}
                          <span className="capitalize">{movement.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          movement.quantity > 0 ? "text-green-600" : "text-red-600"
                        )}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                        </span>
                      </TableCell>
                      <TableCell>{movement.date}</TableCell>
                      <TableCell className="font-mono text-sm">{movement.reference}</TableCell>
                      <TableCell>{movement.warehouse}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {/* Low Stock Alerts */}
            {lowStockItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Low Stock Alerts ({lowStockItems.length})
                  </CardTitle>
                  <CardDescription>Products that need restocking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lowStockItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div>
                          <div className="font-medium">{item.productName} - {item.variant}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Current: {item.closingStock} | Minimum: {item.minStock}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Reorder
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Out of Stock */}
            {outOfStockItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    Out of Stock ({outOfStockItems.length})
                  </CardTitle>
                  <CardDescription>Products currently unavailable</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {outOfStockItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div>
                          <div className="font-medium">{item.productName} - {item.variant}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Stock depleted - immediate action required
                          </div>
                        </div>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Urgent Reorder
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* No Alerts */}
            {lowStockItems.length === 0 && outOfStockItems.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">All Stock Levels Normal</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    No low stock or out of stock alerts at this time
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}