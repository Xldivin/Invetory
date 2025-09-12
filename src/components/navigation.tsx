import React, { useState } from 'react';
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
  Banknote
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
  const [expandedItems, setExpandedItems] = useState<string[]>(['products']);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
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
      badge: null,
      subItems: [
        { id: 'warehouses', label: 'All Warehouses' }
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
    { id: 'customers', label: 'Customers', icon: Users, badge: null },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: BarChart3, 
      badge: null,
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
      badge: null,
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
    },
    { 
      id: 'cashflow', 
      label: 'Cashflow Management', 
      icon: Banknote, 
      badge: null,
      subItems: [
        { id: 'cashflow', label: 'Cashflow Overview' },
        { id: 'cash-inflow', label: 'Cash Inflow' },
        { id: 'cash-outflow', label: 'Cash Outflow' }
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