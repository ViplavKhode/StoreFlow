
import MainLayout from '../layout/MainLayout';
import DashboardDefault from '../pages/dashboard';
import Products from '../pages/products/Products';
import Customers from '../pages/components-overview/Customers';
import Orders from '../pages/components-overview/Orders';
import Settings from '../pages/components-overview/Settings';
import Inventory from '../pages/components-overview/Inventory';
import Support from '../pages/components-overview/Support';
import Analytics from '../pages/components-overview/Analytics';

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'customers',
      element: <Customers />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
  
    {
      path: 'orders',
      element: <Orders />
    },
    {
      path: 'products',
      element: <Products />
    },
    {
      path: 'ticket',
      element: <Settings />
    },
    {
      path: 'inventory',
      element: <Inventory />
    },
    {
      path: 'support',
      element: <Support />
    },
    {
      path: 'analytics',
      element: <Analytics />
    }
  ]
};

export default MainRoutes;
