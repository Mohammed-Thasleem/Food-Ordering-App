import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useOrder } from '../context/OrderContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPriceShort } from '../utils/currency';

export const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentOrder } = useOrder();

  useEffect(() => {
    if (!currentOrder) {
      navigate('/');
    }
  }, [currentOrder, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>

          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your payment
          </p>

          {currentOrder && (
            <Card className="p-4 mb-6 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Order ID
                  </span>
                  <span className="font-mono">{currentOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Amount Paid
                  </span>
                  <span className="font-bold text-lg">
                    {formatPriceShort(currentOrder.total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Payment Time
                  </span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            <Button className="w-full" size="lg" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button
              onClick={() => navigate('/bill')}
              className="w-full"
              size="lg"
            >
              View Bill
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="w-full"
            >
              Back to Home
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              ⭐ Enjoy your meal! Please rate your experience.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};