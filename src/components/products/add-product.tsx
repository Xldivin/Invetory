import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft,
  Package,
  DollarSign,
  Warehouse,
  Image,
  Upload,
  Save,
  X,
  Plus,
  Minus,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';

interface AddProductProps {
  onBack: () => void;
  onProductAdded?: (product: any) => void;
}

interface ProductFormData {
  name: string;
  variant: string;
  sku: string;
  description: string;
  category: string;
  price: string;
  cost: string;
  currency: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  stock: string;
  minStock: string;
  maxStock: string;
  warehouse: string;
  supplier: string;
  barcode: string;
  images: File[];
  status: string;
  taxable: boolean;
  trackStock: boolean;
  allowBackorders: boolean;
  notes: string;
}

const productCategories = [
  'Groundnuts',
  'Nuts & Seeds',
  'Agricultural Products',
  'Processed Foods',
  'Raw Materials',
  'Organic Products'
];

const productVariants = [
  'TIRA',
  'WHITE',
  'MIXED',
  'PREMIUM',
  'STANDARD',
  'ORGANIC'
];

const warehouses = [
  'Main Warehouse - Kigali',
  'Dubai Storage Facility',
  'Kampala Distribution Center',
  'Nyabugogo Warehouse',
  'Kimisagara Storage'
];

const suppliers = [
  'Uganda Groundnut Processors Ltd',
  'East Africa Nuts Cooperative',
  'Rwanda Agricultural Supplies',
  'Select Supplier...'
];

const currencies = [
  { code: 'RWF', name: 'Rwandan Franc (RWF)' },
  { code: 'USD', name: 'US Dollar (USD)' },
  { code: 'EUR', name: 'Euro (EUR)' },
  { code: 'UGX', name: 'Ugandan Shilling (UGX)' }
];

export function AddProduct({ onBack, onProductAdded }: AddProductProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    variant: '',
    sku: '',
    description: '',
    category: '',
    price: '',
    cost: '',
    currency: 'RWF',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    stock: '',
    minStock: '',
    maxStock: '',
    warehouse: '',
    supplier: '',
    barcode: '',
    images: [],
    status: 'active',
    taxable: true,
    trackStock: true,
    allowBackorders: false,
    notes: ''
  });

  const handleInputChange = (field: keyof ProductFormData, value: string | boolean) => {
    if (field === 'dimensions') return; // Handle dimensions separately
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDimensionChange = (dimension: keyof ProductFormData['dimensions'], value: string) => {
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: value
      }
    }));
  };

  const generateSKU = () => {
    const category = formData.category ? formData.category.substring(0, 3).toUpperCase() : 'PRD';
    const variant = formData.variant ? formData.variant.substring(0, 3).toUpperCase() : '';
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const sku = `${category}${variant ? '-' + variant : ''}-${random}`;
    handleInputChange('sku', sku);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5) // Limit to 5 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create product object
      const newProduct = {
        id: `PRD-${Date.now()}`,
        ...formData,
        dateAdded: new Date().toISOString(),
        sales: 0,
        revenue: 0,
        lastUpdated: new Date().toISOString()
      };

      console.log('New product added:', newProduct);
      onProductAdded?.(newProduct);
      
      // Show success message
      alert('Product added successfully!');
      onBack();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.category && formData.price && formData.warehouse;

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{t('products.addProduct')}</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t('products.addProductDescription')}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              {t('products.basicInformation')}
            </CardTitle>
            <CardDescription>
              {t('products.basicInformationDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('products.productName')} *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Premium Groundnuts"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variant">{t('products.variant')}</Label>
                <Select value={formData.variant} onValueChange={(value: string | boolean) => handleInputChange('variant', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('products.selectVariant')} />
                  </SelectTrigger>
                  <SelectContent>
                    {productVariants.map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{t('products.category')} *</Label>
                <Select value={formData.category} onValueChange={(value: string | boolean) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('products.selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">{t('products.sku')}</Label>
                <div className="flex gap-2">
                  <Input
                    id="sku"
                    placeholder="GRN-TIRA-0001"
                    value={formData.sku}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                  />
                  <Button type="button" variant="outline" onClick={generateSKU}>
                    {t('products.generate')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('products.description')}</Label>
              <Textarea
                id="description"
                placeholder="Describe your product..."
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Cost */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              {t('products.pricingCost')}
            </CardTitle>
            <CardDescription>
              {t('products.pricingCostDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">{t('products.sellingPrice')} *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">{t('products.costPrice')}</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">{t('products.currency')}</Label>
                <Select value={formData.currency} onValueChange={(value: string | boolean) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="taxable"
                checked={formData.taxable}
                onCheckedChange={(checked: string | boolean) => handleInputChange('taxable', checked)}
              />
              <Label htmlFor="taxable">{t('products.taxableProduct')}</Label>
            </div>
          </CardContent>
        </Card>

        {/* Physical Properties */}
        <Card>
          <CardHeader>
            <CardTitle>{t('products.physicalProperties')}</CardTitle>
            <CardDescription>
              {t('products.physicalPropertiesDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">{t('products.weight')} (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">{t('products.length')} (cm)</Label>
                <Input
                  id="length"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.dimensions.length}
                  onChange={(e) => handleDimensionChange('length', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">{t('products.width')} (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.dimensions.width}
                  onChange={(e) => handleDimensionChange('width', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">{t('products.height')} (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.dimensions.height}
                  onChange={(e) => handleDimensionChange('height', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="barcode">{t('products.barcode')}</Label>
              <Input
                id="barcode"
                placeholder="123456789012"
                value={formData.barcode}
                onChange={(e) => handleInputChange('barcode', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Inventory Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Warehouse className="w-5 h-5 mr-2" />
              {t('products.inventoryManagement')}
            </CardTitle>
            <CardDescription>
              {t('products.inventoryManagementDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="warehouse">{t('products.warehouse')} *</Label>
                <Select value={formData.warehouse} onValueChange={(value: string | boolean) => handleInputChange('warehouse', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('products.selectWarehouse')} />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse} value={warehouse}>
                        {warehouse}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">{t('products.supplier')}</Label>
                <Select value={formData.supplier} onValueChange={(value: string | boolean) => handleInputChange('supplier', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('products.selectSupplier')} />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">{t('products.initialStock')}</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">{t('products.minimumStock')}</Label>
                <Input
                  id="minStock"
                  type="number"
                  placeholder="0"
                  value={formData.minStock}
                  onChange={(e) => handleInputChange('minStock', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStock">{t('products.maximumStock')}</Label>
                <Input
                  id="maxStock"
                  type="number"
                  placeholder="0"
                  value={formData.maxStock}
                  onChange={(e) => handleInputChange('maxStock', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="trackStock"
                  checked={formData.trackStock}
                  onCheckedChange={(checked: string | boolean) => handleInputChange('trackStock', checked)}
                />
                <Label htmlFor="trackStock">{t('products.trackStock')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowBackorders"
                  checked={formData.allowBackorders}
                  onCheckedChange={(checked: string | boolean) => handleInputChange('allowBackorders', checked)}
                />
                <Label htmlFor="allowBackorders">{t('products.allowBackorders')}</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image className="w-5 h-5 mr-2" />
              {t('products.productImages')}
            </CardTitle>
            <CardDescription>
              {t('products.productImagesDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <Label htmlFor="images" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">
                      {t('products.uploadImages')}
                    </span>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('products.imageFormats')} (Max 5 {t('products.images')})
                  </p>
                </div>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>{t('products.additionalNotes')}</CardTitle>
            <CardDescription>
              {t('products.additionalNotesDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">{t('products.notes')}</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about the product..."
                rows={4}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end px-2 sm:px-0">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="order-2 sm:order-1"
          >
            <X className="w-4 h-4 mr-2" />
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="order-1 sm:order-2"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? t('common.saving') : t('products.addProduct')}
          </Button>
        </div>
      </form>
    </div>
  );
}
