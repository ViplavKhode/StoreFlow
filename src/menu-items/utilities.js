
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  UsergroupAddOutlined,
  GoldOutlined,
  LoadingOutlined,
  DashboardOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const icons = {
  GoldOutlined,
  UsergroupAddOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  DashboardOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  InfoCircleOutlined
};


const utilities = {
  id: 'utilities',
  type: 'group',
  children: [
    {
      id: 'dashboardPage',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'productsPage',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.GoldOutlined
    },
    {
      id: 'customersPage',
      title: 'Customers',
      type: 'item',
      url: '/customers',
      icon: icons.UsergroupAddOutlined
    },
    {
      id: 'ordersPage',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'inventoryPage',
      title: 'Inventory',
      type: 'item',
      url: '/inventory',
      icon: icons.AntDesignOutlined,
    },
    {
      id: 'settingPage',
      title: 'Ticket',
      type: 'item',
      url: '/ticket',
      icon: icons.InfoCircleOutlined,
    },
    {
      id: 'SupportPage',
      title: 'Support',
      type: 'item',
      url: '/support',
      icon: icons.CustomerServiceOutlined,

    }
  ]
};

export default utilities;