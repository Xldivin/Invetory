import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  ChevronDown,
  ChevronRight,
  Bell,
  Banknote,
  Building2
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { cn } from './ui/utils';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: string | null;
  subItems?: Array<{ id: string; label: string }>;
}

export function Navigation({ currentSection, onSectionChange, collapsed, onToggleCollapsed }: NavigationProps) {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['products']);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: t('navigation.dashboard'), icon: Home, badge: null },
    { 
      id: 'products', 
      label: t('navigation.productManagement'), 
      icon: Package, 
      badge: t('common.new'),
      subItems: [
        { id: 'product-list', label: t('navigation.productsList') },
        { id: 'add-product', label: t('navigation.addProduct') },
        { id: 'inventory-tracking', label: t('navigation.inventoryTracking') },
        { id: 'analytics', label: t('navigation.salesAnalytics') }
      ]
    },
    { 
      id: 'warehouses', 
      label: t('navigation.warehouses'), 
      icon: Warehouse, 
      badge: null,
      subItems: [
        { id: 'warehouses', label: t('navigation.allWarehouses') }
      ]
    },
    { 
      id: 'orders', 
      label: t('navigation.orders'), 
      icon: ShoppingCart, 
      badge: '12',
      subItems: [
        { id: 'orders', label: t('navigation.allOrders') },
        { id: 'create-order', label: t('navigation.createOrder') }
      ]
    },
    { id: 'customers', label: t('navigation.customers'), icon: Users, badge: null },
    { 
      id: 'suppliers', 
      label: t('navigation.suppliers'), 
      icon: Building2, 
      badge: null,
      subItems: [
        { id: 'suppliers', label: t('navigation.allSuppliers') },
        { id: 'add-supplier', label: t('navigation.addSupplier') }
      ]
    },
    { 
      id: 'reports', 
      label: t('navigation.reports'), 
      icon: BarChart3, 
      badge: null,
      subItems: [
        { id: 'reports', label: t('navigation.reportsDashboard') },
        { id: 'inventory-reports', label: t('navigation.inventoryReports') },
        { id: 'sales-reports', label: t('navigation.salesReports') },
        { id: 'custom-report-builder', label: t('navigation.customReports') }
      ]
    },
    { 
      id: 'settings', 
      label: t('navigation.settings'), 
      icon: Settings, 
      badge: null,
      subItems: [
        { id: 'settings', label: t('header.settings') },
        { id: 'user-management', label: t('navigation.userManagement') },
        { id: 'inventory-settings', label: t('navigation.inventorySettings') },
        { id: 'integration-settings', label: t('navigation.integrationSettings') }
      ]
    },
    { 
      id: 'notifications', 
      label: t('navigation.notifications'), 
      icon: Bell, 
      badge: '3',
      subItems: [
        { id: 'notifications', label: t('navigation.notificationsCenter') },
        { id: 'alert-preferences', label: t('navigation.alertPreferences') }
      ]
    },
    { 
      id: 'cashflow', 
      label: t('navigation.cashflowManagement'), 
      icon: Banknote, 
      badge: null,
      subItems: [
        { id: 'cashflow', label: t('navigation.cashflowOverview') },
        { id: 'cash-inflow', label: t('navigation.cashInflow') },
        { id: 'cash-outflow', label: t('navigation.cashOutflow') }
      ]
    }
  ];

  const toggleExpandedItem = (itemId: string) => {
    if (collapsed) return;
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

  return (
    <aside className={cn(
      "hidden lg:flex bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex-col h-screen",
      collapsed ? "w-16" : "w-80"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">InventoryPro</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapsed}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronRight className={cn(
              "w-4 h-4 transition-transform",
              collapsed ? "rotate-0" : "rotate-180"
            )} />
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className={cn("p-2 space-y-1", collapsed ? "pb-4" : "pb-6")}>
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
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    collapsed && "px-2"
                  )}
                  onClick={() => {
                    if (item.subItems && !collapsed) {
                      toggleExpandedItem(item.id);
                    } else {
                      onSectionChange(item.id);
                    }
                  }}
                >
                  <item.icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
                  {!collapsed && (
                    <>
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
                    </>
                  )}
                </Button>
                
                {/* Sub Items */}
                {!collapsed && item.subItems && isExpanded && (
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
                        onClick={() => onSectionChange(subItem.id)}
                      >
                        {subItem.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
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
      )}
    </aside>
  );
}