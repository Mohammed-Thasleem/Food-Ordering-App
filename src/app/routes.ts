import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { TablePage } from './pages/TablePage';
import { OrderSummaryPage } from './pages/OrderSummaryPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { BillPage } from './pages/BillPage';
import { PaymentPage } from './pages/PaymentPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { AdminDashboard } from './pages/AdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/table/:tableId',
    Component: TablePage,
  },
  {
    path: '/order-summary',
    Component: OrderSummaryPage,
  },
  {
    path: '/order-confirmation',
    Component: OrderConfirmationPage,
  },
  {
    path: '/bill',
    Component: BillPage,
  },
  {
    path: '/payment',
    Component: PaymentPage,
  },
  {
    path: '/payment-success',
    Component: PaymentSuccessPage,
  },
  {
    path: '/admin',
    Component: AdminDashboard,
  },
]);