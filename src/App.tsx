import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from './components/navigation';
import { Header } from './components/header';
import { DashboardOverview } from './components/dashboard-overview';
import { ProductManagement } from './components/product-management';
import { LoginPage } from './components/auth/login-page';
import { ForgotPasswordPage } from './components/auth/forgot-password-page';
import { ResetPasswordPage } from './components/auth/reset-password-page';
import { WarehousesList } from './components/warehouses/warehouses-list';
import { WarehouseDetails } from './components/warehouses/warehouse-details';
import { OrdersList } from './components/orders/orders-list';
import { OrderDetails } from './components/orders/order-details';
import { CreateOrder } from './components/orders/create-order';
import { ReportsDashboard } from './components/reports/reports-dashboard';
import { InventoryReports } from './components/reports/inventory-reports';
import { SalesReports } from './components/reports/sales-reports';
import { CustomReportBuilder } from './components/reports/custom-report-builder';
import { GeneralSettings } from './components/settings/general-settings';
import { UserManagement } from './components/settings/user-management';
import { InventorySettings } from './components/settings/inventory-settings';
import { IntegrationSettings } from './components/settings/integration-settings';
import { NotificationsCenter } from './components/notifications/notifications-center';
import { AlertPreferences } from './components/notifications/alert-preferences';
import { CustomersList } from './components/customers/customers-list';
import { InventoryTracking } from './components/inventory-tracking';
import { SalesAnalytics } from './components/sales-analytics';
import { CashflowManagement } from './components/cashflow-management';
import { CashInflow } from './components/cash-inflow';
import { CashOutflow } from './components/cash-outflow';

export default function App() {
  const { i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  // Initialize dark mode and language from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedLanguage = localStorage.getItem('i18nextLng') || localStorage.getItem('language') || 'en';
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const handleDarkModeToggle = () => {
    setDarkMode(prev => !prev);
  };

  const handleLanguageChange = (newLanguage: string) => {
    console.log('Changing language to:', newLanguage);
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage).then(() => {
      console.log('Language changed successfully to:', newLanguage);
    }).catch((error) => {
      console.error('Error changing language:', error);
    });
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    // Auto-collapse sidebar on mobile when navigating
    if (window.innerWidth < 1024) {
      setSidebarCollapsed(true);
    }
  };

  // Authentication pages
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        {currentPage === 'login' && (
          <LoginPage 
            onLogin={() => {
              setIsAuthenticated(true);
              setCurrentSection('dashboard');
            }}
            onForgotPassword={() => setCurrentPage('forgot-password')}
          />
        )}
        {currentPage === 'forgot-password' && (
          <ForgotPasswordPage 
            onBackToLogin={() => setCurrentPage('login')}
            onResetSent={() => setCurrentPage('reset-password')}
          />
        )}
        {currentPage === 'reset-password' && (
          <ResetPasswordPage 
            onPasswordReset={() => setCurrentPage('login')}
          />
        )}
      </div>
    );
  }

  // Main application layout
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <Header
        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSectionChange={handleSectionChange}
        currentSection={currentSection}
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <Navigation
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6">
            {/* Dashboard */}
            {currentSection === 'dashboard' && <DashboardOverview onNavigate={handleSectionChange} />}
            
            {/* Product Management */}
            {currentSection === 'products' && <ProductManagement onNavigate={handleSectionChange} />}
            {currentSection === 'product-list' && <ProductManagement onNavigate={handleSectionChange} />}
            {currentSection === 'add-product' && <ProductManagement onNavigate={handleSectionChange} />}
            {currentSection === 'inventory-tracking' && <InventoryTracking onNavigate={handleSectionChange} />}
            {currentSection === 'analytics' && <SalesAnalytics onNavigate={handleSectionChange} />}
            
            {/* Warehouses */}
            {currentSection === 'warehouses' && <WarehousesList onViewDetails={(id) => setCurrentSection('warehouse-details')} />}
            {currentSection === 'warehouse-details' && <WarehouseDetails onBack={() => setCurrentSection('warehouses')} />}
            
            {/* Cashflow Management */}
            {currentSection === 'cashflow' && <CashflowManagement onNavigate={handleSectionChange} />}
            {currentSection === 'cash-inflow' && <CashInflow onNavigate={handleSectionChange} />}
            {currentSection === 'cash-outflow' && <CashOutflow onNavigate={handleSectionChange} />}
            
            {/* Orders */}
            {currentSection === 'orders' && <OrdersList onViewDetails={(id) => setCurrentSection('order-details')} onCreateOrder={() => setCurrentSection('create-order')} />}
            {currentSection === 'order-details' && <OrderDetails onBack={() => setCurrentSection('orders')} />}
            {currentSection === 'create-order' && <CreateOrder onBack={() => setCurrentSection('orders')} />}
            
            {/* Customers */}
            {currentSection === 'customers' && <CustomersList onViewDetails={(id) => setCurrentSection('customer-details')} onCreateCustomer={() => setCurrentSection('create-customer')} />}
            
            {/* Reports */}
            {currentSection === 'reports' && <ReportsDashboard onNavigateToReport={(report) => setCurrentSection(report)} />}
            {currentSection === 'inventory-reports' && <InventoryReports onBack={() => setCurrentSection('reports')} />}
            {currentSection === 'sales-reports' && <SalesReports onBack={() => setCurrentSection('reports')} />}
            {currentSection === 'custom-report-builder' && <CustomReportBuilder onBack={() => setCurrentSection('reports')} />}
            
            {/* Settings */}
            {currentSection === 'settings' && <GeneralSettings />}
            {currentSection === 'user-management' && <UserManagement onBack={() => setCurrentSection('settings')} />}
            {currentSection === 'inventory-settings' && <InventorySettings onBack={() => setCurrentSection('settings')} />}
            {currentSection === 'integration-settings' && <IntegrationSettings onBack={() => setCurrentSection('settings')} />}
            
            {/* Notifications */}
            {currentSection === 'notifications' && <NotificationsCenter />}
            {currentSection === 'alert-preferences' && <AlertPreferences onBack={() => setCurrentSection('notifications')} />}
          </div>
        </main>
      </div>
    </div>
  );
}