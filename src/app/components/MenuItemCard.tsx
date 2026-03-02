import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getMenuItemImage } from '../utils/images';
import { formatPriceShort } from '../utils/currency';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((ci) => ci.menuItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const imageUrl = getMenuItemImage(item);

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <ImageWithFallback
            src={imageUrl}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2">
            <div
              className={`px-2 py-1 rounded text-xs font-medium ${
                item.isVeg
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {item.isVeg ? '🟢 VEG' : '🔴 NON-VEG'}
            </div>
          </div>
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold">Not Available</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{formatPriceShort(item.price)}</span>
            {item.isAvailable && (
              <div>
                {quantity === 0 ? (
                  <Button onClick={handleAdd} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleDecrement}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      onClick={handleIncrement}
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};