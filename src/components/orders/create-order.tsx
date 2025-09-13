import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Search, User, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Separator } from '../ui/separator';

interface CreateOrderProps {
  onBack: () => void;
}

interface OrderItem {
  id: string;
  product: string;
  variant: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

const customers = [
  { id: '1', name: 'Acme Trading Ltd', email: 'orders@acmetrading.com' },
  { id: '2', name: 'Fresh Foods Supermarket', email: 'procurement@freshfoods.com' },
  { id: '3', name: 'Local Market Vendors', email: 'info@localmarket.com' },
  { id: '4', name: 'Export Solutions Inc', email: 'orders@exportsolutions.com' }
];

const products = [
  { id: '1', name: 'Groundnuts TIRA', price: 850, stock: 1250 },
  { id: '2', name: 'Groundnuts WHITE', price: 900, stock: 180 },
  { id: '3', name: 'Groundnuts MIXED', price: 800, stock: 800 },
  { id: '4', name: 'Rice Premium', price: 1500, stock: 2000 },
  { id: '5', name: 'Maize Yellow', price: 650, stock: 3200 }
];

export function CreateOrder({ onBack }: CreateOrderProps) {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [discount, setDiscount] = useState(0);

  const addProduct = () => {
    if (!selectedProduct) return;
    
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const newItem: OrderItem = {
      id: Date.now().toString(),
      product: product.name,
      variant: '',
      unitPrice: product.price,
      quantity: 1,
      total: product.price
    };

    setOrderItems([...orderItems, newItem]);
    setSelectedProduct('');
  };

  const updateQuantity = (id: string, quantity: number) => {
    setOrderItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, quantity);
          return { ...item, quantity: newQuantity, total: newQuantity * item.unitPrice };
        }
        return item;
      })
    );
  };

  const updatePrice = (id: string, price: number) => {
    setOrderItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newPrice = Math.max(0, price);
          return { ...item, unitPrice: newPrice, total: item.quantity * newPrice };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.18; // 18% tax
  const shipping = subtotal > 0 ? 25000 : 0; // Fixed shipping fee
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + tax + shipping - discountAmount;

  const canSubmit = selectedCustomer && orderItems.length > 0 && dueDate;

  const handleSubmit = () => {
    if (!canSubmit) return;
    
    // Simulate order creation
    alert('Order created successfully!');
    onBack();
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
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create New Order</h1>
          <p className="text-gray-600">Create a new customer order</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Customer Information
              </CardTitle>
              <CardDescription>Select customer for this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order Items
              </CardTitle>
              <CardDescription>Add products to this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Product */}
              <div className="flex gap-2">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select product to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {products
                      .filter(product => !orderItems.some(item => item.product === product.name))
                      .map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {formatCurrency(product.price)} • {product.stock} in stock
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addProduct} disabled={!selectedProduct}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>

              {/* Order Items Table */}
              {orderItems.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updatePrice(item.id, parseFloat(e.target.value) || 0)}
                            className="w-24"
                            min="0"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-20 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(item.total)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {orderItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No products added to order</p>
                  <p className="text-sm">Add products using the dropdown above</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
              <CardDescription>Add any special instructions or notes</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter order notes, special instructions, or delivery requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Discount (%):</span>
                    <Input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                      className="w-16 text-right"
                      min="0"
                      max="100"
                    />
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount Amount:</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <span>Tax (18%):</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Order
              </Button>
            </CardContent>
          </Card>

          {/* Order Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Order Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className={`flex items-center ${selectedCustomer ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${selectedCustomer ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Customer selected
                </div>
                <div className={`flex items-center ${orderItems.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${orderItems.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Products added
                </div>
                <div className={`flex items-center ${dueDate ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${dueDate ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Due date set
                </div>
                <div className={`flex items-center ${canSubmit ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${canSubmit ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Ready to submit
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {orderItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Items:</span>
                  <span className="font-medium">{orderItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Quantity:</span>
                  <span className="font-medium">
                    {orderItems.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Unit Price:</span>
                  <span className="font-medium">
                    {formatCurrency(subtotal / orderItems.reduce((sum, item) => sum + item.quantity, 0) || 0)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}