import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Moon, 
  Sun, 
  Globe,
  ChevronDown,
  Home,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  BarChart3
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from './ui/utils';

interface HeaderProps {
  onMenuClick: () => void;
  onSectionChange: (section: string) => void;
  currentSection: string;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: string | null;
  subItems?: Array<{ id: string; label: string }>;
}

export function Header({ 
  onMenuClick, 
  onSectionChange, 
  currentSection, 
  darkMode, 
  onDarkModeToggle,
  language,
  onLanguageChange 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['products']);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { 
      id: 'products', 
      label: 'Product Management', 
      icon: Package, 
      badge: 'New',
      subItems: [
        { id: 'product-list', label: 'Products List' },
        { id: 'add-product', label: 'Add Product' },
        { id: 'inventory-tracking', label: 'Inventory Tracking' },
        { id: 'analytics', label: 'Sales Analytics' }
      ]
    },
    { 
      id: 'warehouses', 
      label: 'Warehouses', 
      icon: Warehouse,
      subItems: [
        { id: 'warehouses', label: 'All Warehouses' },
        { id: 'stock-transfer', label: 'Stock Transfer' }
      ]
    },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: ShoppingCart, 
      badge: '12',
      subItems: [
        { id: 'orders', label: 'All Orders' },
        { id: 'create-order', label: 'Create Order' }
      ]
    },
    { id: 'customers', label: 'Customers', icon: Users },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: BarChart3,
      subItems: [
        { id: 'reports', label: 'Reports Dashboard' },
        { id: 'inventory-reports', label: 'Inventory Reports' },
        { id: 'sales-reports', label: 'Sales Reports' },
        { id: 'custom-report-builder', label: 'Custom Reports' }
      ]
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      subItems: [
        { id: 'settings', label: 'General Settings' },
        { id: 'user-management', label: 'User Management' },
        { id: 'inventory-settings', label: 'Inventory Settings' },
        { id: 'integration-settings', label: 'Integrations' }
      ]
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell, 
      badge: '3',
      subItems: [
        { id: 'notifications', label: 'Notifications Center' },
        { id: 'alert-preferences', label: 'Alert Preferences' }
      ]
    }
  ];

  const toggleExpandedItem = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isParentActive = (item: NavItem) => {
    if (item.subItems) {
      return item.subItems.some(subItem => subItem.id === currentSection) || item.id === currentSection;
    }
    return item.id === currentSection;
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <>
      <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 lg:px-6">
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">InventoryPro</span>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {navItems.map((item) => {
                    const isActive = isParentActive(item);
                    const isExpanded = expandedItems.includes(item.id);
                    
                    return (
                      <div key={item.id}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start h-10",
                            isActive
                              ? "bg-blue-600 text-white hover:bg-blue-700" 
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                          onClick={() => {
                            if (item.subItems) {
                              toggleExpandedItem(item.id);
                            } else {
                              onSectionChange(item.id);
                              setMobileMenuOpen(false);
                            }
                          }}
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <Badge 
                              variant={item.badge === 'New' ? 'default' : 'secondary'}
                              className="ml-2 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                          {item.subItems && (
                            <ChevronDown className={cn(
                              "w-4 h-4 ml-2 transition-transform",
                              isExpanded ? "rotate-180" : "rotate-0"
                            )} />
                          )}
                        </Button>
                        
                        {/* Sub Items */}
                        {item.subItems && isExpanded && (
                          <div className="ml-6 mt-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Button
                                key={subItem.id}
                                variant={currentSection === subItem.id ? "secondary" : "ghost"}
                                size="sm"
                                className={cn(
                                  "w-full justify-start text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 h-8",
                                  currentSection === subItem.id && "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                                )}
                                onClick={() => {
                                  onSectionChange(subItem.id);
                                  setMobileMenuOpen(false);
                                }}
                              >
                                {subItem.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Admin</p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop menu toggle */}
          <Button variant="ghost" size="sm" className="hidden lg:flex" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo - Desktop only */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">InventoryPro</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products, orders, customers..."
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden md:inline text-sm">{currentLanguage.name}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className="flex items-center space-x-2"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {language === lang.code && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="sm" onClick={onDarkModeToggle}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative"
            onClick={() => onSectionChange('notifications')}
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0">
              3
            </Badge>
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm">John Doe</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSectionChange('settings')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSectionChange('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}