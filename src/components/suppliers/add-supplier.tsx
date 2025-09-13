import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Calendar,
  Star,
  Package,
  Save,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

interface AddSupplierProps {
  onBack: () => void;
  onSupplierAdded?: (supplier: any) => void;
}

interface SupplierFormData {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  website: string;
  taxId: string;
  paymentTerms: string;
  currency: string;
  leadTime: string;
  minimumOrder: string;
  products: string[];
  notes: string;
  status: string;
}

const countries = [
  { code: 'UG', name: 'Uganda' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'KE', name: 'Kenya' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'BI', name: 'Burundi' }
];

const currencies = [
  { code: 'RWF', name: 'Rwandan Franc (RWF)' },
  { code: 'UGX', name: 'Ugandan Shilling (UGX)' },
  { code: 'KES', name: 'Kenyan Shilling (KES)' },
  { code: 'USD', name: 'US Dollar (USD)' },
  { code: 'EUR', name: 'Euro (EUR)' }
];

const paymentTerms = [
  '15 days',
  '30 days',
  '45 days',
  '60 days',
  '90 days',
  'Net 30',
  'Net 60',
  'COD',
  'Prepayment'
];

const productTypes = [
  'Groundnuts TIRA',
  'Groundnuts WHITE',
  'Groundnuts MIXED',
  'Groundnuts PREMIUM',
  'Raw Groundnuts',
  'Processed Groundnuts',
  'Groundnut Oil',
  'Groundnut Paste'
];

export function AddSupplier({ onBack, onSupplierAdded }: AddSupplierProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SupplierFormData>({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    website: '',
    taxId: '',
    paymentTerms: '30 days',
    currency: 'RWF',
    leadTime: '7',
    minimumOrder: '',
    products: [],
    notes: '',
    status: 'pending'
  });

  const handleInputChange = (field: keyof SupplierFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(p => p !== product)
        : [...prev.products, product]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create supplier object
      const newSupplier = {
        id: `SUP-${Date.now()}`,
        ...formData,
        dateAdded: new Date().toISOString(),
        totalOrders: 0,
        totalValue: 0,
        rating: 0,
        reliability: 0
      };

      console.log('New supplier added:', newSupplier);
      onSupplierAdded?.(newSupplier);
      
      // Show success message (you can replace with toast notification)
      alert('Supplier added successfully!');
      onBack();
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('Error adding supplier. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{t('suppliers.addSupplier')}</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t('suppliers.addSupplierDescription')}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              {t('suppliers.basicInformation')}
            </CardTitle>
            <CardDescription>
              {t('suppliers.basicInformationDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('suppliers.supplierName')} *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Uganda Groundnut Processors Ltd"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">{t('suppliers.contactPerson')} *</Label>
                <Input
                  id="contactPerson"
                  placeholder="e.g., John Mukasa"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('suppliers.email')} *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="supplier@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('suppliers.phone')} *</Label>
                <Input
                  id="phone"
                  placeholder="+256-700-123456"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">{t('suppliers.website')}</Label>
              <Input
                id="website"
                placeholder="https://www.supplier.com"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {t('suppliers.addressInformation')}
            </CardTitle>
            <CardDescription>
              {t('suppliers.addressInformationDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">{t('suppliers.address')} *</Label>
              <Textarea
                id="address"
                placeholder="Plot 45, Industrial Area"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{t('suppliers.city')} *</Label>
                <Input
                  id="city"
                  placeholder="Kampala"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">{t('suppliers.state')}</Label>
                <Input
                  id="state"
                  placeholder="Central Region"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">{t('suppliers.postalCode')}</Label>
                <Input
                  id="postalCode"
                  placeholder="P.O. Box 12345"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">{t('suppliers.country')} *</Label>
              <Select value={formData.country} onValueChange={(value: string) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('suppliers.selectCountry')} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Business Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              {t('suppliers.businessTerms')}
            </CardTitle>
            <CardDescription>
              {t('suppliers.businessTermsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">{t('suppliers.paymentTerms')} *</Label>
                <Select value={formData.paymentTerms} onValueChange={(value: string) => handleInputChange('paymentTerms', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentTerms.map((term) => (
                      <SelectItem key={term} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">{t('suppliers.currency')} *</Label>
                <Select value={formData.currency} onValueChange={(value: string) => handleInputChange('currency', value)}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leadTime">{t('suppliers.leadTime')} ({t('common.days')})</Label>
                <Input
                  id="leadTime"
                  type="number"
                  placeholder="7"
                  value={formData.leadTime}
                  onChange={(e) => handleInputChange('leadTime', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumOrder">{t('suppliers.minimumOrder')}</Label>
                <Input
                  id="minimumOrder"
                  placeholder="1000 kg"
                  value={formData.minimumOrder}
                  onChange={(e) => handleInputChange('minimumOrder', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">{t('suppliers.taxId')}</Label>
              <Input
                id="taxId"
                placeholder="VAT Number or Tax ID"
                value={formData.taxId}
                onChange={(e) => handleInputChange('taxId', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Products & Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              {t('suppliers.productsServices')}
            </CardTitle>
            <CardDescription>
              {t('suppliers.productsServicesDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {productTypes.map((product) => (
                <div key={product} className="flex items-center space-x-2">
                  <Checkbox
                    id={`product-${product}`}
                    checked={formData.products.includes(product)}
                    onCheckedChange={() => handleProductToggle(product)}
                  />
                  <Label htmlFor={`product-${product}`} className="text-sm">
                    {product}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>{t('suppliers.additionalNotes')}</CardTitle>
            <CardDescription>
              {t('suppliers.additionalNotesDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">{t('suppliers.notes')}</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about the supplier..."
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
            disabled={isSubmitting || !formData.name || !formData.contactPerson || !formData.email}
            className="order-1 sm:order-2"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? t('common.saving') : t('suppliers.addSupplier')}
          </Button>
        </div>
      </form>
    </div>
  );
}
