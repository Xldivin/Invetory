import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Package, 
  ArrowUpRight,
  ArrowDownLeft,
  Edit,
  Settings,
  BarChart3,
  History
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface WarehouseDetailsProps {
  onBack: () => void;
}

const warehouseInfo = {
  id: '1',
  name: 'Main Warehouse',
  location: 'Kampala Central',
  address: 'Plot 123, Industrial Area, Kampala',
  manager: 'John Doe',
  phone: '+256 700 123 456',
  email: 'john.doe@inventorypro.com',
  totalItems: 12500,
  totalValue: 2450000,
  capacity: 15000,
  utilization: 83,
  status: 'active',
  establishedDate: '2020-01-15'
};

const stockByProduct = [
  { product: 'Groundnuts TIRA', stock: 1250, value: 812500, percentage: 10 },
  { product: 'Groundnuts WHITE', stock: 180, value: 162000, percentage: 1.4 },
  { product: 'Groundnuts MIXED', stock: 800, value: 640000, percentage: 6.4 },
  { product: 'Rice Premium', stock: 2000, value: 300000, percentage: 16 },
  { product: 'Maize Yellow', stock: 3200, value: 256000, percentage: 25.6 },
  { product: 'Beans Red', stock: 1800, value: 144000, percentage: 14.4 },
];

const transferHistory = [
  { id: '1', date: '2025-09-11', type: 'incoming', product: 'Groundnuts TIRA', quantity: 200, from: 'Supplier A', status: 'completed' },
  { id: '2', date: '2025-09-10', type: 'outgoing', product: 'Groundnuts WHITE', quantity: 150, to: 'Northern Hub', status: 'completed' },
  { id: '3', date: '2025-09-10', type: 'incoming', product: 'Rice Premium', quantity: 500, from: 'Rice Mills Ltd', status: 'completed' },
  { id: '4', date: '2025-09-09', type: 'outgoing', product: 'Maize Yellow', quantity: 300, to: 'Western Hub', status: 'pending' },
];

const utilizationData = [
  { month: 'Jan', utilization: 65, capacity: 15000 },
  { month: 'Feb', utilization: 72, capacity: 15000 },
  { month: 'Mar', utilization: 68, capacity: 15000 },
  { month: 'Apr', utilization: 75, capacity: 15000 },
  { month: 'May', utilization: 80, capacity: 15000 },
  { month: 'Jun', utilization: 85, capacity: 15000 },
  { month: 'Jul', utilization: 83, capacity: 15000 },
];

export function WarehouseDetails({ onBack }: WarehouseDetailsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', { 
      style: 'currency', 
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTransferBadge = (type: string) => {
    switch (type) {
      case 'incoming':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Incoming</Badge>;
      case 'outgoing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Outgoing</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Warehouses
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{warehouseInfo.name}</h1>
          <p className="text-gray-600 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {warehouseInfo.location}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Details
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warehouseInfo.totalItems.toLocaleString()}</div>
            <p className="text-xs text-gray-600">out of {warehouseInfo.capacity.toLocaleString()} capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(warehouseInfo.totalValue)}</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
            <BarChart3 className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warehouseInfo.utilization}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="h-2 rounded-full bg-yellow-500"
                style={{ width: `${warehouseInfo.utilization}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manager</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="font-medium">{warehouseInfo.manager}</div>
            <p className="text-xs text-gray-600">{warehouseInfo.phone}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stock">Stock Details</TabsTrigger>
          <TabsTrigger value="transfers">Transfer History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Warehouse Information */}
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Information</CardTitle>
              <CardDescription>Basic details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="mt-1">{warehouseInfo.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Manager</label>
                  <p className="mt-1">{warehouseInfo.manager}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="mt-1">{warehouseInfo.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="mt-1">{warehouseInfo.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Established</label>
                  <p className="mt-1">{new Date(warehouseInfo.establishedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common warehouse operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-16 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white">
                  <ArrowDownLeft className="w-5 h-5 mb-1" />
                  Receive Stock
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 mb-1" />
                  Transfer Stock
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                  <Package className="w-5 h-5 mb-1" />
                  Stock Count
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                  <BarChart3 className="w-5 h-5 mb-1" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock by Product</CardTitle>
              <CardDescription>Current inventory levels for each product</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockByProduct.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.stock.toLocaleString()} units</TableCell>
                      <TableCell>{formatCurrency(item.value)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{item.percentage}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${item.percentage * 5}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
              <CardDescription>Stock movements in and out of the warehouse</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>From/To</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transferHistory.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell>{transfer.date}</TableCell>
                      <TableCell>{getTransferBadge(transfer.type)}</TableCell>
                      <TableCell className="font-medium">{transfer.product}</TableCell>
                      <TableCell>{transfer.quantity.toLocaleString()} units</TableCell>
                      <TableCell>
                        {transfer.type === 'incoming' ? transfer.from : transfer.to}
                      </TableCell>
                      <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Utilization Trend</CardTitle>
              <CardDescription>Warehouse capacity utilization over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                  <Line 
                    type="monotone" 
                    dataKey="utilization" 
                    stroke="#2563EB" 
                    strokeWidth={2}
                    dot={{ fill: '#2563EB' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}