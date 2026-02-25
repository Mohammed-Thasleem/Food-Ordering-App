import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, OrderStatus } from '../types';

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  markOrderAsPaid: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
    setCurrentOrder(order);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    if (currentOrder?.id === orderId) {
      setCurrentOrder({ ...currentOrder, status });
    }
  };

  const markOrderAsPaid = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, isPaid: true } : order
      )
    );
    if (currentOrder?.id === orderId) {
      setCurrentOrder({ ...currentOrder, isPaid: true });
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        addOrder,
        updateOrderStatus,
        markOrderAsPaid,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
