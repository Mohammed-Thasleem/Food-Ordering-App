import React from 'react';
import { MenuItem } from '../types';
import { Button } from './ui/button';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { formatPriceShort } from '../utils/currency';

interface MenuItemListItemProps {
  item: MenuItem;
}

export const MenuItemListItem: React.FC<MenuItemListItemProps> = ({ item }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((ci) => ci.menuItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(item);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="py-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            {/* Veg/Non-veg indicator */}
            <div className={`flex-shrink-0 w-4 h-4 border-2 flex items-center justify-center mt-0.5 ${
              item.isVeg 
                ? 'border-green-600 dark:border-green-500' 
                : 'border-red-600 dark:border-red-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                item.isVeg 
                  ? 'bg-green-600 dark:bg-green-500' 
                  : 'bg-red-600 dark:bg-red-500'
              }`} />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {item.name}
              </h3>
            </div>
          </div>

          <div className="ml-6">
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {formatPriceShort(item.price)}
            </p>
            {item.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-1">
                {item.description}
              </p>
            )}
            {/* Customizable badge */}
            {item.id.includes('main') && (
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Customizable
              </p>
            )}
          </div>
        </div>

        {/* Add button */}
        <div className="flex-shrink-0">
          {item.isAvailable ? (
            quantity === 0 ? (
              <Button
                onClick={handleAdd}
                variant="outline"
                size="sm"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950 dark:border-orange-500 font-semibold min-w-[70px]"
              >
                ADD
              </Button>
            ) : (
              <div className="flex items-center gap-2 border border-orange-500 rounded-md px-2 py-1">
                <button
                  onClick={handleDecrement}
                  className="text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-semibold text-orange-500 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )
          ) : (
            <span className="text-xs text-gray-400">Not Available</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};