import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Package, MapPin, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface StockTransferProps {
  onBack: () => void;
}

interface TransferItem {
  id: string;
  product: string;
  variant: string;
  availableStock: number;
  transferQuantity: number;
}

const warehouses = [
  { id: '1', name: 'Main Warehouse', location: 'Kampala Central' },
  { id: '2', name: 'Northern Distribution Center', location: 'Gulu' },
  { id: '3', name: 'Western Hub', location: 'Mbarara' },
  { id: '4', name: 'Eastern Branch', location: 'Jinja' }
];

const availableProducts = [
  { id: '1', product: 'Groundnuts', variant: 'TIRA', stock: 1250 },
  { id: '2', product: 'Groundnuts', variant: 'WHITE', stock: 180 },
  { id: '3', product: 'Groundnuts', variant: 'MIXED', stock: 800 },
  { id: '4', product: 'Rice', variant: 'Premium', stock: 2000 },
  { id: '5', product: 'Maize', variant: 'Yellow', stock: 3200 }
];

export function StockTransfer({ onBack }: StockTransferProps) {
  const [sourceWarehouse, setSourceWarehouse] = useState('');
  const [destinationWarehouse, setDestinationWarehouse] = useState('');
  const [transferItems, setTransferItems] = useState<TransferItem[]>([]);
  const [notes, setNotes] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const addProduct = () => {
    if (!selectedProduct) return;
    
    const product = availableProducts.find(p => p.id === selectedProduct);
    if (!product) return;

    const newItem: TransferItem = {
      id: Date.now().toString(),
      product: product.product,
      variant: product.variant,
      availableStock: product.stock,
      transferQuantity: 1
    };

    setTransferItems([...transferItems, newItem]);
    setSelectedProduct('');
  };

  const updateQuantity = (id: string, quantity: number) => {
    setTransferItems(items =>
      items.map(item =>
        item.id === id ? { ...item, transferQuantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setTransferItems(items => items.filter(item => item.id !== id));
  };

  const canSubmit = sourceWarehouse && destinationWarehouse && transferItems.length > 0 && sourceWarehouse !== destinationWarehouse;

  const handleSubmit = () => {
    if (!canSubmit) return;
    
    // Simulate transfer submission
    alert('Transfer request submitted successfully!');
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Warehouses
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Stock Transfer</h1>
          <p className="text-gray-600">Transfer inventory between warehouses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Warehouse Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Route</CardTitle>
              <CardDescription>Select source and destination warehouses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="source">Source Warehouse</Label>
                  <Select value={sourceWarehouse} onValueChange={setSourceWarehouse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem 
                          key={warehouse.id} 
                          value={warehouse.id}
                          disabled={warehouse.id === destinationWarehouse}
                        >
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <div>
                              <div className="font-medium">{warehouse.name}</div>
                              <div className="text-sm text-gray-500">{warehouse.location}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Warehouse</Label>
                  <Select value={destinationWarehouse} onValueChange={setDestinationWarehouse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem 
                          key={warehouse.id} 
                          value={warehouse.id}
                          disabled={warehouse.id === sourceWarehouse}
                        >
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <div>
                              <div className="font-medium">{warehouse.name}</div>
                              <div className="text-sm text-gray-500">{warehouse.location}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Visual Transfer Route */}
              {sourceWarehouse && destinationWarehouse && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-medium">
                        {warehouses.find(w => w.id === sourceWarehouse)?.name}
                      </p>
                      <p className="text-sm text-gray-600">Source</p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-blue-600" />
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-medium">
                        {warehouses.find(w => w.id === destinationWarehouse)?.name}
                      </p>
                      <p className="text-sm text-gray-600">Destination</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Products to Transfer</CardTitle>
              <CardDescription>Select products and quantities for transfer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Product */}
              <div className="flex gap-2">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select product to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts
                      .filter(product => !transferItems.some(item => 
                        item.product === product.product && item.variant === product.variant
                      ))
                      .map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        <div>
                          <div className="font-medium">{product.product} - {product.variant}</div>
                          <div className="text-sm text-gray-500">Available: {product.stock} units</div>
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

              {/* Transfer Items Table */}
              {transferItems.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transferItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.product}</div>
                            <div className="text-sm text-gray-500">{item.variant}</div>
                          </div>
                        </TableCell>
                        <TableCell>{item.availableStock.toLocaleString()} units</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.transferQuantity - 1)}
                              disabled={item.transferQuantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.transferQuantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-20 text-center"
                              min="1"
                              max={item.availableStock}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.transferQuantity + 1)}
                              disabled={item.transferQuantity >= item.availableStock}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
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

              {transferItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No products selected for transfer</p>
                  <p className="text-sm">Add products using the dropdown above</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Notes</CardTitle>
              <CardDescription>Add any additional information or instructions</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter transfer notes, special instructions, or reasons for transfer..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        {/* Transfer Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Summary</CardTitle>
              <CardDescription>Review your transfer details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">From</label>
                  <p className="font-medium">
                    {sourceWarehouse ? warehouses.find(w => w.id === sourceWarehouse)?.name : 'Not selected'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">To</label>
                  <p className="font-medium">
                    {destinationWarehouse ? warehouses.find(w => w.id === destinationWarehouse)?.name : 'Not selected'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Items</label>
                  <p className="font-medium">{transferItems.length} product(s)</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Quantity</label>
                  <p className="font-medium">
                    {transferItems.reduce((sum, item) => sum + item.transferQuantity, 0).toLocaleString()} units
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Submit Transfer Request
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className={`flex items-center ${sourceWarehouse ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${sourceWarehouse ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Source warehouse selected
                </div>
                <div className={`flex items-center ${destinationWarehouse ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${destinationWarehouse ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Destination warehouse selected
                </div>
                <div className={`flex items-center ${transferItems.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${transferItems.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Products selected
                </div>
                <div className={`flex items-center ${canSubmit ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full mr-2 ${canSubmit ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Ready to submit
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}