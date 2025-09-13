import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Search, 
  MapPin, 
  Package, 
  Users, 
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface Warehouse {
  id: string;
  name: string;
  location: string;
  address: string;
  manager: string;
  totalItems: number;
  totalValue: number;
  capacity: number;
  utilization: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: string;
}

interface WarehousesListProps {
  onViewDetails: (id: string) => void;
}

const mockWarehouses: Warehouse[] = [
  {
    id: '1',
    name: 'Main Warehouse',
    location: 'Kampala Central',
    address: 'Plot 123, Industrial Area, Kampala',
    manager: 'John Doe',
    totalItems: 12500,
    totalValue: 2450000,
    capacity: 15000,
    utilization: 83,
    status: 'active',
    lastUpdate: '2025-09-11'
  },
  {
    id: '2',
    name: 'Northern Distribution Center',
    location: 'Gulu',
    address: 'Lacor Road, Gulu District',
    manager: 'Jane Smith',
    totalItems: 8300,
    totalValue: 1680000,
    capacity: 10000,
    utilization: 83,
    status: 'active',
    lastUpdate: '2025-09-11'
  },
  {
    id: '3',
    name: 'Western Hub',
    location: 'Mbarara',
    address: 'Mbarara-Masaka Highway, Mbarara',
    manager: 'Peter Kato',
    totalItems: 0,
    totalValue: 0,
    capacity: 8000,
    utilization: 0,
    status: 'maintenance',
    lastUpdate: '2025-09-10'
  }
];

export function WarehousesList({ onViewDetails }: WarehousesListProps) {
  const { t } = useTranslation();
  const [warehouses] = useState<Warehouse[]>(mockWarehouses);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalWarehouses = warehouses.length;
  const activeWarehouses = warehouses.filter(w => w.status === 'active').length;
  const totalCapacity = warehouses.reduce((sum, w) => sum + w.capacity, 0);
  const totalUtilization = warehouses.reduce((sum, w) => sum + w.totalItems, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', { 
      style: 'currency', 
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Warehouse Management</h1>
          <p className="text-gray-600">Manage your warehouse locations and inventory distribution</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Warehouse
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Warehouses</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWarehouses}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {activeWarehouses} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}</div>
            <p className="text-xs text-gray-600">units across all warehouses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUtilization.toLocaleString()}</div>
            <p className="text-xs text-gray-600">
              {Math.round((totalUtilization / totalCapacity) * 100)}% utilization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(warehouses.reduce((sum, w) => sum + w.totalValue, 0))}
            </div>
            <p className="text-xs text-green-600">across all locations</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search warehouses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWarehouses.map((warehouse) => (
          <Card key={warehouse.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {warehouse.location}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(warehouse.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(warehouse.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Warehouse
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>{warehouse.address}</p>
                <div className="flex items-center mt-1">
                  <Users className="w-4 h-4 mr-1" />
                  Manager: {warehouse.manager}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Items:</span>
                  <span className="font-medium">{warehouse.totalItems.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Capacity:</span>
                  <span className="font-medium">{warehouse.capacity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Utilization:</span>
                  <span className="font-medium">{warehouse.utilization}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Value:</span>
                  <span className="font-medium">{formatCurrency(warehouse.totalValue)}</span>
                </div>
              </div>

              {/* Utilization Bar */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Storage Utilization</span>
                  <span className="text-xs text-gray-500">{warehouse.utilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      warehouse.utilization > 90 ? 'bg-red-500' :
                      warehouse.utilization > 70 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${warehouse.utilization}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onViewDetails(warehouse.id)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  Transfer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredWarehouses.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No warehouses found</h3>
            <p className="text-gray-600 text-center mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Get started by adding your first warehouse'}
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Warehouse
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}