import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from './ui/sheet';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { restaurantInfo } from '../data/mockData';
import { formatPriceShort } from '../utils/currency';

export const CartDrawer: React.FC = () => {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const tax = (cartTotal * restaurantInfo.taxRate) / 100;
  const total = cartTotal + tax;

  const handleCheckout = () => {
    setOpen(false);
    navigate('/order-summary');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart ({cartCount} items)</SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.menuItem.id} className="flex gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.menuItem.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatPriceShort(item.menuItem.price)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <Button
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => removeFromCart(item.menuItem.id)}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPriceShort(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax ({restaurantInfo.taxRate}%)</span>
                  <span>{formatPriceShort(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPriceShort(total)}</span>
                </div>
              </div>
              <Button onClick={handleCheckout} className="w-full" size="lg">
                Place Order
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};