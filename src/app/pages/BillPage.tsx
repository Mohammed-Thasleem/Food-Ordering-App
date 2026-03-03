import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useOrder } from '../context/OrderContext';
import { useTable } from '../context/TableContext';
import { restaurantInfo } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ChevronLeft, Receipt } from 'lucide-react';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { formatPriceShort } from '../utils/currency';

export const BillPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentOrder, updateOrderStatus } = useOrder();
  const { table } = useTable();

  // Simulate order status progression
  useEffect(() => {
    if (!currentOrder || currentOrder.isPaid) return;

    const statusProgression = ['Pending', 'Preparing', 'Ready', 'Served'] as const;
    const currentIndex = statusProgression.indexOf(currentOrder.status);

    if (currentIndex < statusProgression.length - 1) {
      const timer = setTimeout(() => {
        updateOrderStatus(currentOrder.id, statusProgression[currentIndex + 1]);
      }, 5000); // Update status every 5 seconds for demo

      return () => clearTimeout(timer);
    }
  }, [currentOrder, updateOrderStatus]);

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md w-full">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No active order</p>
          <Button onClick={() => navigate(`/table/${table?.id || '1'}`)}>
            Browse Menu
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/table/${table?.id || '1'}`)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Bill</h1>
        </div>

        {/* Order Status */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold mb-1">Order Status</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Order ID: {currentOrder.id}
              </p>
            </div>
            <OrderStatusBadge status={currentOrder.status} />
          </div>

          {!currentOrder.isPaid && currentOrder.status !== 'Served' && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Receipt className="h-4 w-4 animate-pulse" />
              <span>Your order is being prepared...</span>
            </div>
          )}
        </Card>

        {/* Bill Details */}
        <Card className="p-6 mb-6">
          <h2 className="font-semibold mb-4">Bill Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Restaurant</span>
              <span className="font-medium">{restaurantInfo.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Table</span>
              <span className="font-medium">Table {table?.number}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Time</span>
              <span className="font-medium">
                {new Date(currentOrder.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <h3 className="font-medium text-sm">Items Ordered</h3>
            {currentOrder.items.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${
                        item.menuItem.isVeg ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {item.menuItem.isVeg ? '🟢' : '🔴'}
                    </span>
                    <span>{item.menuItem.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-5">
                    {formatPriceShort(item.menuItem.price)} × {item.quantity}
                  </p>
                </div>
                <span className="font-semibold">
                  {formatPriceShort(item.menuItem.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPriceShort(currentOrder.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({restaurantInfo.taxRate}%)</span>
              <span>{formatPriceShort(currentOrder.tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>{formatPriceShort(currentOrder.total)}</span>
            </div>
          </div>

          {currentOrder.isPaid && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
              <span className="text-green-700 dark:text-green-400 font-semibold">
                ✓ Payment Complete
              </span>
            </div>
          )}
        </Card>

        {!currentOrder.isPaid && (
          <Button
            onClick={() => navigate('/payment')}
            className="w-full"
            size="lg"
          >
            Pay {formatPriceShort(currentOrder.total)}
          </Button>
        )}

        {currentOrder.isPaid && (
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Back to Home
          </Button>
        )}
      </div>
    </div>
  );
};