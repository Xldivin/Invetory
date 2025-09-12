import React, { useState } from 'react';
import { 
  ArrowLeft,
  Plus,
  ArrowUpRight,
  DollarSign,
  CreditCard,
  Smartphone,
  Building2,
  TrendingUp,
  Calendar,
  Download,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface CashInflowProps {
  onNavigate: (section: string) => void;
}

interface InflowTransaction {
  id: string;
  amount: number;
  paymentMethod: 'cash' | 'momo' | 'bank';
  category: string;
  description: string;
  date: string;
  reference?: string;
  customer?: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockInflowTransactions: InflowTransaction[] = [
  {
    id: '1',
    amount: 850000,
    paymentMethod: 'cash',
    category: 'Sales Revenue',
    description: 'Groundnuts TIRA sales - Kigali Market',
    date: '2025-09-12',
    reference: 'TXN-001234',
    customer: 'Kigali Market Vendor',
    status: 'completed'
  },
  {
    id: '2',
    amount: 450000,
    paymentMethod: 'momo',
    category: 'Sales Revenue',
    description: 'Groundnuts WHITE sales - Online order',
    date: '2025-09-12',
    reference: 'MOMO-567890',
    customer: 'Jean Pierre Uwimana',
    status: 'completed'
  },
  {
    id: '3',
    amount: 1200000,
    paymentMethod: 'bank',
    category: 'Sales Revenue',
    description: 'Bulk order - Nyabugogo distributor',
    date: '2025-09-11',
    reference: 'BANK-123456',
    customer: 'Nyabugogo Distribution Ltd',
    status: 'completed'
  },
  {
    id: '4',
    amount: 75000,
    paymentMethod: 'cash',
    category: 'Other Income',
    description: 'Equipment rental income',
    date: '2025-09-10',
    reference: 'RENT-001',
    status: 'completed'
  },
  {
    id: '5',
    amount: 300000,
    paymentMethod: 'momo',
    category: 'Sales Revenue',
    description: 'Mobile sales - Kimisagara market',
    date: '2025-09-09',
    reference: 'MOMO-789012',
    customer: 'Kimisagara Traders',
    status: 'pending'
  }
];

export function CashInflow({ onNavigate }: CashInflowProps) {
  const [transactions] = useState<InflowTransaction[]>(mockInflowTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    paymentMethod: 'cash' as 'cash' | 'momo' | 'bank',
    category: 'Sales Revenue',
    description: '',
    customer: '',
    date: new Date().toISOString().split('T')[0]
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', { 
      style: 'currency', 
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = selectedMethod === 'all' || transaction.paymentMethod === selectedMethod;
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    return matchesSearch && matchesMethod && matchesCategory;
  });

  // Calculate totals
  const totalInflow = transactions.reduce((sum, t) => sum + t.amount, 0);
  const cashInflow = transactions.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.amount, 0);
  const momoInflow = transactions.filter(t => t.paymentMethod === 'momo').reduce((sum, t) => sum + t.amount, 0);
  const bankInflow = transactions.filter(t => t.paymentMethod === 'bank').reduce((sum, t) => sum + t.amount, 0);

  const getPaymentMethodBadge = (method: string) => {
    const config = {
      cash: { label: 'Cash', className: 'bg-green-100 text-green-800' },
      momo: { label: 'Mobile Money', className: 'bg-blue-100 text-blue-800' },
      bank: { label: 'Bank Transfer', className: 'bg-purple-100 text-purple-800' }
    };
    const { label, className } = config[method as keyof typeof config];
    return <Badge className={className}>{label}</Badge>;
  };

  const handleAddTransaction = () => {
    console.log('Adding inflow transaction:', newTransaction);
    setShowAddModal(false);
    setNewTransaction({
      amount: '',
      paymentMethod: 'cash',
      category: 'Sales Revenue',
      description: '',
      customer: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('cashflow')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cashflow
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Cash Inflow</h1>
            <p className="text-gray-600 dark:text-gray-400">Track all incoming cash across payment methods</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Inflow
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Cash Inflow</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Amount (RWF)</Label>
                  <Input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select 
                    value={newTransaction.paymentMethod} 
                    onValueChange={(value: 'cash' | 'momo' | 'bank') => 
                      setNewTransaction({...newTransaction, paymentMethod: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="momo">Mobile Money</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select 
                    value={newTransaction.category} 
                    onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales Revenue">Sales Revenue</SelectItem>
                      <SelectItem value="Other Income">Other Income</SelectItem>
                      <SelectItem value="Investment Income">Investment Income</SelectItem>
                      <SelectItem value="Refunds">Refunds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Customer/Source</Label>
                  <Input
                    value={newTransaction.customer}
                    onChange={(e) => setNewTransaction({...newTransaction, customer: e.target.value})}
                    placeholder="Customer name or income source"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    placeholder="Transaction description..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddTransaction} className="flex-1 bg-green-600 hover:bg-green-700">
                    Add Inflow
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cash Inflow</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalInflow)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +22% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Received</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(cashInflow)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Physical cash payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Money</CardTitle>
            <Smartphone className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(momoInflow)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">MTN/Airtel payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bank Transfers</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(bankInflow)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Bank account deposits</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search inflow transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Sales Revenue">Sales Revenue</SelectItem>
              <SelectItem value="Other Income">Other Income</SelectItem>
              <SelectItem value="Investment Income">Investment Income</SelectItem>
              <SelectItem value="Refunds">Refunds</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMethod} onValueChange={setSelectedMethod}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="momo">Mobile Money</SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Inflow Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>All incoming cash transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Customer/Source</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      {transaction.reference && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.reference}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.customer || '-'}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{getPaymentMethodBadge(transaction.paymentMethod)}</TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">
                      +{formatCurrency(transaction.amount)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        transaction.status === 'completed' && "bg-green-100 text-green-800",
                        transaction.status === 'pending' && "bg-yellow-100 text-yellow-800",
                        transaction.status === 'failed' && "bg-red-100 text-red-800"
                      )}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Transaction
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}