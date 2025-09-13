import React, { useState } from 'react';
import { 
  ArrowLeft,
  Plus,
  ArrowDownLeft,
  DollarSign,
  CreditCard,
  Smartphone,
  Building2,
  TrendingDown,
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

interface CashOutflowProps {
  onNavigate: (section: string) => void;
}

interface OutflowTransaction {
  id: string;
  amount: number;
  paymentMethod: 'cash' | 'momo' | 'bank';
  category: string;
  description: string;
  date: string;
  reference?: string;
  vendor?: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockOutflowTransactions: OutflowTransaction[] = [
  {
    id: '1',
    amount: 320000,
    paymentMethod: 'cash',
    category: 'Inventory Purchase',
    description: 'Purchase raw groundnuts from farmers',
    date: '2025-09-11',
    reference: 'PUR-001',
    vendor: 'Muhanga Farmers Cooperative',
    status: 'completed'
  },
  {
    id: '2',
    amount: 85000,
    paymentMethod: 'bank',
    category: 'Operating Expenses',
    description: 'Warehouse rent payment',
    date: '2025-09-10',
    reference: 'RENT-SEP',
    vendor: 'Kigali Properties Ltd',
    status: 'completed'
  },
  {
    id: '3',
    amount: 120000,
    paymentMethod: 'momo',
    category: 'Transportation',
    description: 'Transportation and logistics',
    date: '2025-09-10',
    reference: 'TRANS-045',
    vendor: 'Swift Transport Services',
    status: 'completed'
  },
  {
    id: '4',
    amount: 45000,
    paymentMethod: 'cash',
    category: 'Marketing',
    description: 'Market stall fees and promotion',
    date: '2025-09-09',
    reference: 'MKT-001',
    vendor: 'Kigali Market Authority',
    status: 'completed'
  },
  {
    id: '5',
    amount: 35000,
    paymentMethod: 'momo',
    category: 'Utilities',
    description: 'Electricity bill payment',
    date: '2025-09-08',
    reference: 'ELEC-SEP',
    vendor: 'EUCL',
    status: 'completed'
  },
  {
    id: '6',
    amount: 150000,
    paymentMethod: 'bank',
    category: 'Equipment',
    description: 'Purchase of weighing scales',
    date: '2025-09-07',
    reference: 'EQP-001',
    vendor: 'Modern Equipment Ltd',
    status: 'pending'
  },
  {
    id: '7',
    amount: 25000,
    paymentMethod: 'cash',
    category: 'Operating Expenses',
    description: 'Office supplies and stationery',
    date: '2025-09-06',
    reference: 'OFF-001',
    vendor: 'City Supplies',
    status: 'completed'
  }
];

export function CashOutflow({ onNavigate }: CashOutflowProps) {
  const [transactions] = useState<OutflowTransaction[]>(mockOutflowTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    paymentMethod: 'cash' as 'cash' | 'momo' | 'bank',
    category: 'Operating Expenses',
    description: '',
    vendor: '',
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
                         transaction.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = selectedMethod === 'all' || transaction.paymentMethod === selectedMethod;
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    return matchesSearch && matchesMethod && matchesCategory;
  });

  // Calculate totals
  const totalOutflow = transactions.reduce((sum, t) => sum + t.amount, 0);
  const cashOutflow = transactions.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.amount, 0);
  const momoOutflow = transactions.filter(t => t.paymentMethod === 'momo').reduce((sum, t) => sum + t.amount, 0);
  const bankOutflow = transactions.filter(t => t.paymentMethod === 'bank').reduce((sum, t) => sum + t.amount, 0);

  // Calculate by category
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

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
    console.log('Adding outflow transaction:', newTransaction);
    setShowAddModal(false);
    setNewTransaction({
      amount: '',
      paymentMethod: 'cash',
      category: 'Operating Expenses',
      description: '',
      vendor: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Cash Outflow</h1>
            <p className="text-gray-600 dark:text-gray-400">Track all business expenses and cash outflows</p>
          </div>
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
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Cash Outflow</DialogTitle>
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
                  <Label>Expense Category</Label>
                  <Select 
                    value={newTransaction.category} 
                    onValueChange={(value: any) => setNewTransaction({...newTransaction, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inventory Purchase">Inventory Purchase</SelectItem>
                      <SelectItem value="Operating Expenses">Operating Expenses</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Salaries">Salaries</SelectItem>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Other Expenses">Other Expenses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Vendor/Payee</Label>
                  <Input
                    value={newTransaction.vendor}
                    onChange={(e) => setNewTransaction({...newTransaction, vendor: e.target.value})}
                    placeholder="Vendor or payee name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    placeholder="Expense description..."
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
                  <Button onClick={handleAddTransaction} className="flex-1 bg-red-600 hover:bg-red-700">
                    Add Expense
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
            <CardTitle className="text-sm font-medium">Total Cash Outflow</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalOutflow)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
              <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(cashOutflow)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Physical cash payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Money</CardTitle>
            <Smartphone className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(momoOutflow)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">MTN/Airtel payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bank Transfers</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(bankOutflow)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Bank payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
          <CardDescription>Breakdown of expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categoryTotals).map(([category, amount]:any) => (
              <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm font-medium">{category}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Inventory Purchase">Inventory Purchase</SelectItem>
              <SelectItem value="Operating Expenses">Operating Expenses</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
              <SelectItem value="Salaries">Salaries</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
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
          <CardTitle>Expense Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>All business expenses and outflows</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Vendor/Payee</TableHead>
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
                  <TableCell>{transaction.vendor || '-'}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{getPaymentMethodBadge(transaction.paymentMethod)}</TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900 dark:text-white">
                      -{formatCurrency(transaction.amount)}
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