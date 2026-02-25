import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { TableProvider } from './context/TableContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

export default function App() {
  return (
    <ThemeProvider>
      <TableProvider>
        <CartProvider>
          <OrderProvider>
            <RouterProvider router={router} />
          </OrderProvider>
        </CartProvider>
      </TableProvider>
    </ThemeProvider>
  );
}
