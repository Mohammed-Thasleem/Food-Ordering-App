import React from 'react';
import { OrderStatus } from '../types';
import { Badge } from './ui/badge';
import { Clock, ChefHat, CheckCircle, Utensils } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Pending':
        return {
          icon: Clock,
          variant: 'secondary' as const,
          label: 'Pending',
        };
      case 'Preparing':
        return {
          icon: ChefHat,
          variant: 'default' as const,
          label: 'Preparing',
        };
      case 'Ready':
        return {
          icon: CheckCircle,
          variant: 'default' as const,
          label: 'Ready',
        };
      case 'Served':
        return {
          icon: Utensils,
          variant: 'default' as const,
          label: 'Served',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};
