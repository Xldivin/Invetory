import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  MapPin,
  Edit,
  Trash2,
  Eye,
  Star,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
  totalOrders: number;
  totalValue: number;
  lastOrderDate: string;
  products: string[];
  paymentTerms: string;
  leadTime: number;
  reliability: number;
}

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Uganda Groundnut Processors Ltd',
    contactPerson: 'John Mukasa',
    email: 'john@ugprocessors.com',
    phone: '+256-700-123456',
    address: 'Plot 45, Industrial Area',
    city: 'Kampala',
    country: 'Uganda',
    rating: 4.8,
    status: 'active',
    totalOrders: 156,
    totalValue: 2500000,
    lastOrderDate: '2025-09-10',
    products: ['Groundnuts TIRA', 'Groundnuts WHITE'],
    paymentTerms: '30 days',
    leadTime: 7,
    reliability: 95
  },
  {
    id: '2',
    name: 'East Africa Nuts Cooperative',
    contactPerson: 'Mary Nakato',
    email: 'mary@eanuts.coop',
    phone: '+256-701-234567',
    address: 'Masaka Road, Km 15',
    city: 'Masaka',
    country: 'Uganda',
    rating: 4.5,
    status: 'active',
    totalOrders: 89,
    totalValue: 1800000,
    lastOrderDate: '2025-09-08',
    products: ['Groundnuts MIXED', 'Groundnuts PREMIUM'],
    paymentTerms: '15 days',
    leadTime: 5,
    reliability: 92
  },
  {
    id: '3',
    name: 'Rwanda Agricultural Supplies',
    contactPerson: 'Jean Claude Nzeyimana',
    email: 'jc@ragsupplies.rw',
    phone: '+250-788-123456',
    address: 'KG 15 Ave, Kimisagara',
    city: 'Kigali',
    country: 'Rwanda',
    rating: 4.2,
    status: 'pending',
    totalOrders: 23,
    totalValue: 450000,
    lastOrderDate: '2025-09-05',
    products: ['Groundnuts WHITE'],
    paymentTerms: '45 days',
    leadTime: 10,
    reliability: 88
  }
];

interface SuppliersListProps {
  onViewDetails?: (supplierId: string) => void;
  onCreateSupplier?: () => void;
}

export function SuppliersList({ onViewDetails, onCreateSupplier }: SuppliersListProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('rw-RW', { 
      style: 'currency', 
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || supplier.country === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const totalSuppliers = mockSuppliers.length;
  const activeSuppliers = mockSuppliers.filter(s => s.status === 'active').length;
  const totalValue = mockSuppliers.reduce((sum, supplier) => sum + supplier.totalValue, 0);
  const avgRating = mockSuppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / mockSuppliers.length;

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{t('suppliers.title')}</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t('suppliers.description')}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm">
            <Package className="w-4 h-4 mr-2" />
            {t('suppliers.importSuppliers')}
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onCreateSupplier}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('suppliers.addSupplier')}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('suppliers.totalSuppliers')}</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-gray-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +3 {t('common.thisMonth')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('suppliers.activeSuppliers')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{activeSuppliers}</div>
            <p className="text-xs text-gray-600">
              {Math.round((activeSuppliers / totalSuppliers) * 100)}% {t('suppliers.activationRate')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('suppliers.totalValue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-gray-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +15% {t('common.thisMonth')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">{t('suppliers.averageRating')}</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{avgRating.toFixed(1)}</div>
            <div className="flex items-center space-x-1">
              {getRatingStars(Math.round(avgRating))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t('suppliers.searchSuppliers')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder={t('common.status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.all')} {t('common.status')}</SelectItem>
              <SelectItem value="active">{t('suppliers.active')}</SelectItem>
              <SelectItem value="inactive">{t('suppliers.inactive')}</SelectItem>
              <SelectItem value="pending">{t('suppliers.pending')}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder={t('suppliers.country')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.all')} {t('suppliers.countries')}</SelectItem>
              <SelectItem value="Uganda">Uganda</SelectItem>
              <SelectItem value="Rwanda">Rwanda</SelectItem>
              <SelectItem value="Kenya">Kenya</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Suppliers Table */}
      <Card className="px-2 sm:px-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            {t('suppliers.suppliersList')}
          </CardTitle>
          <CardDescription>
            {filteredSuppliers.length} {t('suppliers.suppliersFound')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('suppliers.supplier')}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t('suppliers.contact')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('suppliers.location')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('suppliers.rating')}</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                  <TableHead className="hidden xl:table-cell">{t('suppliers.orders')}</TableHead>
                  <TableHead className="hidden xl:table-cell">{t('suppliers.value')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://avatar.vercel.sh/${supplier.name}`} />
                          <AvatarFallback>{supplier.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{supplier.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{supplier.contactPerson}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1 text-gray-400" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          {supplier.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                        {supplier.city}, {supplier.country}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center space-x-1">
                        {getRatingStars(Math.round(supplier.rating))}
                        <span className="text-sm text-gray-600 ml-1">{supplier.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(supplier.status)}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="text-sm">
                        <div className="font-medium">{supplier.totalOrders}</div>
                        <div className="text-gray-500">{t('suppliers.orders')}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="text-sm">
                        <div className="font-medium">{formatCurrency(supplier.totalValue)}</div>
                        <div className="text-gray-500">{t('suppliers.lifetime')}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewDetails?.(supplier.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            {t('common.view')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t('common.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('common.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
