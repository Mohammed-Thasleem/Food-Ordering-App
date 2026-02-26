// Core Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
}

export type MenuCategory = 'Starters' | 'Main Course' | 'Desserts' | 'Drinks';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  tableId: string;
  items: CartItem[];
  status: OrderStatus;
  timestamp: Date;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Served';

export interface Table {
  id: string;
  number: number;
  activeOrderId?: string;
}

export interface Restaurant {
  name: string;
  logo: string;
  description: string;
  taxRate: number; // percentage
}

export type Theme = 'light' | 'dark';
