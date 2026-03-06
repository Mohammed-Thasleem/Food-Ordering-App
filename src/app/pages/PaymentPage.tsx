import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useOrder } from '../context/OrderContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ChevronLeft, CreditCard, Loader2 } from 'lucide-react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { formatPriceShort } from '../utils/currency';
import { motion } from 'motion/react';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentOrder, markOrderAsPaid } = useOrder();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    if (currentOrder) {
      markOrderAsPaid(currentOrder.id);
    }
    
    setProcessing(false);
    navigate('/payment-success');
  };

  if (!currentOrder) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/bill')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Payment</h1>
        </div>

        {/* Amount Card */}
        <Card className="p-6 mb-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Total Amount
          </p>
          <p className="text-4xl font-bold">
            {formatPriceShort(currentOrder.total)}
          </p>
        </Card>

        {/* Payment Method */}
        <Card className="p-6 mb-6">
          <h2 className="font-semibold mb-4">Select Payment Method</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <Label
                htmlFor="card"
                className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-5 w-5" />
                <div className="flex-1">
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pay with your card
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </Card>

        {/* Card Details (if card selected) */}
        {paymentMethod === 'card' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 mb-6">
              <h2 className="font-semibold mb-4">Card Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" maxLength={3} type="password" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={processing}
          className="w-full"
          size="lg"
        >
          {processing ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Processing...
            </>
          ) : (
            `Pay ${formatPriceShort(currentOrder.total)}`
          )}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          🔒 Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
};