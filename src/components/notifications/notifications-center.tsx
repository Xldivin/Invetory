import React from 'react';
import { Bell, AlertTriangle, Package, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function NotificationsCenter() {
  const notifications = [
    { id: 1, type: 'alert', title: 'Low Stock Alert', message: 'Groundnuts WHITE is running low (180 units)', time: '2 hours ago' },
    { id: 2, type: 'info', title: 'Order Received', message: 'New order ORD-2025-001 from Acme Trading', time: '4 hours ago' },
    { id: 3, type: 'warning', title: 'Warehouse Capacity', message: 'Main Warehouse is 85% full', time: '6 hours ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Notifications Center</h1>
          <p className="text-gray-600">Stay updated with system alerts and notifications</p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Alert Preferences
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Recent Notifications
          </CardTitle>
          <CardDescription>Latest system alerts and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  notification.type === 'alert' ? 'bg-red-100' :
                  notification.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {notification.type === 'alert' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                  {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                  {notification.type === 'info' && <Package className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}