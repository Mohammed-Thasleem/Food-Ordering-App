import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { QrCode, Utensils, Shield } from 'lucide-react';
import { restaurantInfo } from '../data/mockData';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleTableEntry = (tableNumber: number) => {
    navigate(`/table/${tableNumber}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">{restaurantInfo.logo}</div>
          <h1 className="text-3xl font-bold mb-2">{restaurantInfo.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {restaurantInfo.description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <QrCode className="h-4 w-4" />
              <span>Scan QR code or select your table</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  onClick={() => handleTableEntry(num)}
                  variant="outline"
                  className="h-16"
                >
                  <div>
                    <Utensils className="h-5 w-5 mx-auto mb-1" />
                    <span className="text-sm">Table {num}</span>
                  </div>
                </Button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-4">
              In production, customers would scan a QR code on their table
            </p>

            {/* Admin Access */}
            <div className="pt-4 border-t mt-6">
              <Button
                onClick={() => navigate('/admin')}
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <Shield className="h-3 w-3 mr-1" />
                Admin Dashboard
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};