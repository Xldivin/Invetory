import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Minus, 
  Upload, 
  X,
  Package,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  cost: number;
  price: number;
  initialStock: number;
  minStock: number;
  maxStock: number;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: any) => void;
}

export function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Basic product information
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productUnit, setProductUnit] = useState('');
  const [productWarehouse, setProductWarehouse] = useState('');

  // Product variants
  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      id: '1',
      name: '',
      sku: '',
      cost: 0,
      price: 0,
      initialStock: 0,
      minStock: 0,
      maxStock: 0
    }
  ]);

  const [images, setImages] = useState<string[]>([]);

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!productName.trim()) newErrors.productName = 'Product name is required';
      if (!productCategory) newErrors.productCategory = 'Category is required';
      if (!productUnit) newErrors.productUnit = 'Unit is required';
      if (!productWarehouse) newErrors.productWarehouse = 'Warehouse is required';
    }

    if (stepNumber === 2) {
      variants.forEach((variant, index) => {
        if (!variant.name.trim()) newErrors[`variant_${index}_name`] = 'Variant name is required';
        if (!variant.sku.trim()) newErrors[`variant_${index}_sku`] = 'SKU is required';
        if (variant.cost <= 0) newErrors[`variant_${index}_cost`] = 'Cost must be greater than 0';
        if (variant.price <= 0) newErrors[`variant_${index}_price`] = 'Price must be greater than 0';
        if (variant.price <= variant.cost) newErrors[`variant_${index}_price`] = 'Price must be higher than cost';
        if (variant.minStock < 0) newErrors[`variant_${index}_minStock`] = 'Minimum stock cannot be negative';
        if (variant.maxStock <= 0) newErrors[`variant_${index}_maxStock`] = 'Maximum stock must be greater than 0';
        if (variant.maxStock <= variant.minStock) newErrors[`variant_${index}_maxStock`] = 'Maximum stock must be higher than minimum';
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      name: '',
      sku: '',
      cost: 0,
      price: 0,
      initialStock: 0,
      minStock: 0,
      maxStock: 0
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  const updateVariant = (id: string, field: keyof ProductVariant, value: string | number) => {
    setVariants(variants.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const generateSKU = (variantName: string) => {
    const productCode = productName.substring(0, 2).toUpperCase();
    const variantCode = variantName.substring(0, 4).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${productCode}-${variantCode}-${randomNum}`;
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newProduct = {
        id: Date.now().toString(),
        name: productName,
        description: productDescription,
        category: productCategory,
        unit: productUnit,
        warehouse: productWarehouse,
        variants: variants,
        images: images,
        createdAt: new Date().toISOString()
      };

      onProductAdded(newProduct);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setProductName('');
    setProductDescription('');
    setProductCategory('');
    setProductUnit('');
    setProductWarehouse('');
    setVariants([{
      id: '1',
      name: '',
      sku: '',
      cost: 0,
      price: 0,
      initialStock: 0,
      minStock: 0,
      maxStock: 0
    }]);
    setImages([]);
    setErrors({});
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name *</Label>
          <Input
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Groundnuts"
            className={errors.productName ? 'border-red-500' : ''}
          />
          {errors.productName && (
            <p className="text-sm text-red-600">{errors.productName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="productCategory">Category *</Label>
          <Select value={productCategory} onValueChange={setProductCategory}>
            <SelectTrigger className={errors.productCategory ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nuts">Nuts & Seeds</SelectItem>
              <SelectItem value="grains">Grains & Cereals</SelectItem>
              <SelectItem value="legumes">Legumes</SelectItem>
              <SelectItem value="spices">Spices</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.productCategory && (
            <p className="text-sm text-red-600">{errors.productCategory}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productUnit">Unit of Measurement *</Label>
          <Select value={productUnit} onValueChange={setProductUnit}>
            <SelectTrigger className={errors.productUnit ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilogram (kg)</SelectItem>
              <SelectItem value="g">Gram (g)</SelectItem>
              <SelectItem value="bags">Bags</SelectItem>
              <SelectItem value="pieces">Pieces</SelectItem>
              <SelectItem value="liters">Liters</SelectItem>
            </SelectContent>
          </Select>
          {errors.productUnit && (
            <p className="text-sm text-red-600">{errors.productUnit}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="productWarehouse">Primary Warehouse *</Label>
          <Select value={productWarehouse} onValueChange={setProductWarehouse}>
            <SelectTrigger className={errors.productWarehouse ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kigali-main">Kigali Main Warehouse</SelectItem>
              <SelectItem value="nyabugogo">Nyabugogo Branch</SelectItem>
              <SelectItem value="kimisagara">Kimisagara Storage</SelectItem>
            </SelectContent>
          </Select>
          {errors.productWarehouse && (
            <p className="text-sm text-red-600">{errors.productWarehouse}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="productDescription">Product Description</Label>
        <Textarea
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Detailed description of the product..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Product Variants</h3>
        <Button type="button" onClick={addVariant} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Variant
        </Button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {variants.map((variant, index) => (
          <Card key={variant.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Variant {index + 1}</CardTitle>
                {variants.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVariant(variant.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Variant Name *</Label>
                  <Input
                    value={variant.name}
                    onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                    placeholder="e.g., TIRA, WHITE"
                    className={errors[`variant_${index}_name`] ? 'border-red-500' : ''}
                  />
                  {errors[`variant_${index}_name`] && (
                    <p className="text-xs text-red-600">{errors[`variant_${index}_name`]}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>SKU *</Label>
                  <div className="flex gap-2">
                    <Input
                      value={variant.sku}
                      onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                      placeholder="Product SKU"
                      className={errors[`variant_${index}_sku`] ? 'border-red-500' : ''}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateVariant(variant.id, 'sku', generateSKU(variant.name))}
                    >
                      Generate
                    </Button>
                  </div>
                  {errors[`variant_${index}_sku`] && (
                    <p className="text-xs text-red-600">{errors[`variant_${index}_sku`]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Cost Price (RWF) *</Label>
                  <Input
                    type="number"
                    value={variant.cost || ''}
                    onChange={(e) => updateVariant(variant.id, 'cost', Number(e.target.value))}
                    placeholder="0"
                    className={errors[`variant_${index}_cost`] ? 'border-red-500' : ''}
                  />
                  {errors[`variant_${index}_cost`] && (
                    <p className="text-xs text-red-600">{errors[`variant_${index}_cost`]}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Selling Price (RWF) *</Label>
                  <Input
                    type="number"
                    value={variant.price || ''}
                    onChange={(e) => updateVariant(variant.id, 'price', Number(e.target.value))}
                    placeholder="0"
                    className={errors[`variant_${index}_price`] ? 'border-red-500' : ''}
                  />
                  {errors[`variant_${index}_price`] && (
                    <p className="text-xs text-red-600">{errors[`variant_${index}_price`]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label>Initial Stock</Label>
                  <Input
                    type="number"
                    value={variant.initialStock || ''}
                    onChange={(e) => updateVariant(variant.id, 'initialStock', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Min Stock *</Label>
                  <Input
                    type="number"
                    value={variant.minStock || ''}
                    onChange={(e) => updateVariant(variant.id, 'minStock', Number(e.target.value))}
                    placeholder="0"
                    className={errors[`variant_${index}_minStock`] ? 'border-red-500' : ''}
                  />
                  {errors[`variant_${index}_minStock`] && (
                    <p className="text-xs text-red-600">{errors[`variant_${index}_minStock`]}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Max Stock *</Label>
                  <Input
                    type="number"
                    value={variant.maxStock || ''}
                    onChange={(e) => updateVariant(variant.id, 'maxStock', Number(e.target.value))}
                    placeholder="0"
                    className={errors[`variant_${index}_maxStock`] ? 'border-red-500' : ''}
                  />
                  {errors[`variant_${index}_maxStock`] && (
                    <p className="text-xs text-red-600">{errors[`variant_${index}_maxStock`]}</p>
                  )}
                </div>
              </div>

              {variant.price > 0 && variant.cost > 0 && (
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary">
                    Profit Margin: {(((variant.price - variant.cost) / variant.price) * 100).toFixed(1)}%
                  </Badge>
                  <Badge variant="outline">
                    Profit: {new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(variant.price - variant.cost)}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Product Images</Label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            PNG, JPG, GIF up to 10MB each
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            Choose Files
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                onClick={() => removeImage(index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Review all information before submitting. You can edit these details later in the product management section.
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Add New Product
          </DialogTitle>
          <DialogDescription>
            Step {step} of 3: {step === 1 ? 'Basic Information' : step === 2 ? 'Product Variants' : 'Images & Review'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-6">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNumber === step
                    ? 'bg-blue-600 text-white'
                    : stepNumber < step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNumber < step ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    stepNumber < step ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <div>
              {step > 1 && (
                <Button variant="outline" onClick={prevStep} disabled={loading}>
                  Previous
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              {step < 3 ? (
                <Button onClick={nextStep} disabled={loading}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                  {loading ? 'Creating Product...' : 'Create Product'}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}