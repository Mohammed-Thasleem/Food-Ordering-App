import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { ChefHat, Home, Receipt, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Order, OrderStatus } from '../types';
import { formatPriceShort } from '../utils/currency';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrder();
  const [selectedTab, setSelectedTab] = useState('orders');

  const activeOrders = orders.filter((order) => !order.isPaid);
  const completedOrders = orders.filter((order) => order.isPaid);

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusOptions = (currentStatus: OrderStatus): OrderStatus[] => {
    const allStatuses: OrderStatus[] = ['Pending', 'Preparing', 'Ready', 'Served'];
    const currentIndex = allStatuses.indexOf(currentStatus);
    return allStatuses.slice(currentIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
              <ChefHat className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage orders and menu
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="h-4 w-4 mr-2" />
            Exit Admin
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Orders
                </p>
                <p className="text-3xl font-bold">{activeOrders.length}</p>
              </div>
              <Receipt className="h-10 w-10 text-blue-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Completed Today
                </p>
                <p className="text-3xl font-bold">{completedOrders.length}</p>
              </div>
              <Badge className="text-lg">✓</Badge>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold">
                  {formatPriceShort(orders.reduce((sum, o) => sum + o.total, 0))}
                </p>
              </div>
              <span className="text-2xl">💰</span>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="orders">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            {activeOrders.length === 0 ? (
              <Card className="p-12 text-center">
                <Receipt className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No active orders</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeOrders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Table {order.tableId}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.id}
                        </p>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.quantity}x {item.menuItem.name}
                          </span>
                          <span className="font-medium">
                            {formatPriceShort(item.menuItem.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 mb-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{formatPriceShort(order.total)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {getStatusOptions(order.status).map((status) => (
                        <Button
                          key={status}
                          onClick={() => handleStatusUpdate(order.id, status)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <RefreshCw className="h-3 w-3 mr-2" />
                          Mark as {status}
                        </Button>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      {new Date(order.timestamp).toLocaleTimeString()}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedOrders.length === 0 ? (
              <Card className="p-12 text-center">
                <Badge className="text-lg mb-4">✓</Badge>
                <p className="text-gray-500">No completed orders yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {completedOrders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold">Table {order.tableId}</h3>
                          <OrderStatusBadge status={order.status} />
                          <Badge variant="default" className="bg-green-500">
                            Paid
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items.length} items • {formatPriceShort(order.total)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(order.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};