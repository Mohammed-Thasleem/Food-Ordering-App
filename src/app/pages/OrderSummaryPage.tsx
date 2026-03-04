import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useTable } from '../context/TableContext';
import { useOrder } from '../context/OrderContext';
import { restaurantInfo } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { formatPriceShort } from '../utils/currency';
import { Order } from '../types';

export const OrderSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { table } = useTable();
  const { addOrder } = useOrder();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate(`/table/${table?.id || '1'}`);
    }
  }, [cartItems, navigate, table]);

  const tax = (cartTotal * restaurantInfo.taxRate) / 100;
  const total = cartTotal + tax;

  const handlePlaceOrder = () => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      tableId: table?.id || '1',
      items: cartItems,
      status: 'Pending',
      timestamp: new Date(),
      subtotal: cartTotal,
      tax: tax,
      total: total,
      isPaid: false,
    };

    addOrder(newOrder);
    clearCart();
    navigate('/order-confirmation');
  };

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
          <h1 className="text-2xl font-bold">Order Summary</h1>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
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
                    <span className="font-medium">{item.menuItem.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
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
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPriceShort(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax ({restaurantInfo.taxRate}%)</span>
              <span>{formatPriceShort(tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>{formatPriceShort(total)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="font-semibold mb-4">Table Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Restaurant</span>
              <span className="font-medium">{restaurantInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Table Number</span>
              <span className="font-medium">Table {table?.number}</span>
            </div>
          </div>
        </Card>

        <Button onClick={handlePlaceOrder} className="w-full" size="lg">
          Confirm & Place Order
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Your order will be sent to the kitchen immediately
        </p>
      </div>
    </div>
  );
};