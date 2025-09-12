import React, { useState } from 'react';
import { 
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Smartphone,
  Building2,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Filter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface CashTransaction {
  id: string;
  type: 'inflow' | 'outflow';
  amount: number;
  paymentMethod: 'cash' | 'momo' | 'bank';
  category: string;
  description: string;
  date: string;
  reference?: string;
  status: 'completed' | 'pending' | 'failed';
}

interface CashflowManagementProps {
  onNavigate: (section: string) => void;
}

const mockTransactions: CashTransaction[] = [
  {
    id: '1',
    type: 'inflow',
    amount: 850000,
    paymentMethod: 'cash',
    category: 'Sales Revenue',
    description: 'Groundnuts TIRA sales - Kigali Market',
    date: '2025-09-12',
    reference: 'TXN-001234',
    status: 'completed'
  },
  {
    id: '2',
    type: 'inflow',
    amount: 450000,
    paymentMethod: 'momo',
    category: 'Sales Revenue',
    description: 'Groundnuts WHITE sales - Online order',
    date: '2025-09-12',
    reference: 'MOMO-567890',
    status: 'completed'
  },
  {
    id: '3',
    type: 'inflow',
    amount: 1200000,
    paymentMethod: 'bank',
    category: 'Sales Revenue',
    description: 'Bulk order - Nyabugogo distributor',
    date: '2025-09-11',
    reference: 'BANK-123456',
    status: 'completed'
  },
  {
    id: '4',
    type: 'outflow',
    amount: 320000,
    paymentMethod: 'cash',
    category: 'Inventory Purchase',
    description: 'Purchase raw groundnuts from farmers',
    date: '2025-09-11',
    reference: 'PUR-001',
    status: 'completed'
  },
  {
    id: '5',
    type: 'outflow',
    amount: 85000,
    paymentMethod: 'bank',
    category: 'Operating Expenses',
    description: 'Warehouse rent payment',
    date: '2025-09-10',
    reference: 'RENT-SEP',
    status: 'completed'
  },
  {
    id: '6',
    type: 'outflow',
    amount: 120000,
    paymentMethod: 'momo',
    category: 'Operating Expenses',
    description: 'Transportation and logistics',
    date: '2025-09-10',
    reference: 'TRANS-045',
    status: 'completed'
  },
  {
    id: '7',
    type: 'outflow',
    amount: 45000,
    paymentMethod: 'cash',
    category: 'Marketing',
    description: 'Market stall fees and promotion',
    date: '2025-09-09',
    reference: 'MKT-001',
    status: 'completed'
  }
];

export function CashflowManagement({ onNavigate }: CashflowManagementProps) {
  const [transactions] = useState<CashTransaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'inflow' as 'inflow' | 'outflow',
    amount: '',
    paymentMethod: 'cash' as 'cash' | 'momo' | 'bank',
    category: '',
    description: '',
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
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = selectedMethod === 'all' || transaction.paymentMethod === selectedMethod;
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    return matchesSearch && matchesMethod && matchesType;
  });

  // Calculate totals
  const totalInflow = transactions
    .filter(t => t.type === 'inflow')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalOutflow = transactions
    .filter(t => t.type === 'outflow')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netCashflow = totalInflow - totalOutflow;

  // Calculate by payment method
  const cashTotal = transactions
    .filter(t => t.paymentMethod === 'cash')
    .reduce((sum, t) => sum + (t.type === 'inflow' ? t.amount : -t.amount), 0);
  
  const momoTotal = transactions
    .filter(t => t.paymentMethod === 'momo')
    .reduce((sum, t) => sum + (t.type === 'inflow' ? t.amount : -t.amount), 0);
  
  const bankTotal = transactions
    .filter(t => t.paymentMethod === 'bank')
    .reduce((sum, t) => sum + (t.type === 'inflow' ? t.amount : -t.amount), 0);

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return <DollarSign className="w-4 h-4" />;
      case 'momo':
        return <Smartphone className="w-4 h-4" />;
      case 'bank':
        return <Building2 className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

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
    // Here you would typically save to your backend
    console.log('Adding transaction:', newTransaction);
    setShowAddModal(false);
    setNewTransaction({
      type: 'inflow',
      amount: '',
      paymentMethod: 'cash',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Cashflow Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track cash inflows and outflows across all payment methods</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select 
                      value={newTransaction.type} 
                      onValueChange={(value: 'inflow' | 'outflow') => 
                        setNewTransaction({...newTransaction, type: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inflow">Cash Inflow</SelectItem>
                        <SelectItem value="outflow">Cash Outflow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (RWF)</Label>
                    <Input
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      placeholder="0"
                    />
                  </div>
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
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {newTransaction.type === 'inflow' ? (
                        <>
                          <SelectItem value="Sales Revenue">Sales Revenue</SelectItem>
                          <SelectItem value="Other Income">Other Income</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="Inventory Purchase">Inventory Purchase</SelectItem>
                          <SelectItem value="Operating Expenses">Operating Expenses</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Transportation">Transportation</SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Other Expenses">Other Expenses</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
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
                  <Button onClick={handleAddTransaction} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Add Transaction
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
            <CardTitle className="text-sm font-medium">Total Cash Outflow</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalOutflow)}</div>
            <p className="text-xs text-red-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Cashflow</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(netCashflow)}
            </div>
            <p className={`text-xs flex items-center ${netCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netCashflow >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {netCashflow >= 0 ? 'Positive' : 'Negative'} cashflow
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash on Hand</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(cashTotal)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Physical cash available</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(cashTotal)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Physical cash transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Money</CardTitle>
            <Smartphone className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(momoTotal)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">MTN/Airtel Money balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bank Balance</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(bankTotal)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Bank account balance</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="inflow">Cash Inflow</SelectItem>
              <SelectItem value="outflow">Cash Outflow</SelectItem>
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
          <CardTitle>Recent Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>All cashflow transactions across payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
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
                    <div className="flex items-center gap-2">
                      {transaction.type === 'inflow' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-red-600" />
                      )}
                      <span className={transaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'inflow' ? 'Inflow' : 'Outflow'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      {transaction.reference && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.reference}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{getPaymentMethodBadge(transaction.paymentMethod)}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${transaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'inflow' ? '+' : '-'}{formatCurrency(transaction.amount)}
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