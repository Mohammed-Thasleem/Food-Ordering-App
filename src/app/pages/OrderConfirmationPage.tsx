import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useOrder } from '../context/OrderContext';
import { useTable } from '../context/TableContext';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle, Receipt } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPriceShort } from '../utils/currency';

export const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentOrder } = useOrder();
  const { table } = useTable();

  useEffect(() => {
    if (!currentOrder) {
      navigate('/table/1');
    }
  }, [currentOrder, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
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
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>

          <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your order has been sent to the kitchen
          </p>

          {currentOrder && (
            <Card className="p-4 mb-6 text-left">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Order ID
                  </span>
                  <span className="font-mono text-sm">{currentOrder.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Table
                  </span>
                  <span className="font-medium">Table {table?.number || currentOrder.tableId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Status
                  </span>
                  <OrderStatusBadge status={currentOrder.status} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Amount
                  </span>
                  <span className="font-bold text-lg">
                    {formatPriceShort(currentOrder.total)}
                  </span>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/bill')}
              className="w-full"
              size="lg"
            >
              View Bill
            </Button>
            <Button
              onClick={() => navigate(`/table/${currentOrder?.tableId || '1'}`)}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Add More Items
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Track your order status from the bill page
          </p>
        </Card>
      </motion.div>
    </div>
  );
};