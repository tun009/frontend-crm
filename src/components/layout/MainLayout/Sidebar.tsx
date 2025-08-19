import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  RocketOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  KeyOutlined,
  ToolOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { ROUTES } from '@/utils/constants';

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  category?: string;
}

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const { t } = useTranslation('menu');
  const location = useLocation();
  const navigate = useNavigate();

  const menuData: MenuItem[] = [
    // Navigation
    {
      key: 'dashboard',
      label: t('dashboard'),
      icon: <DashboardOutlined />,
      path: ROUTES.DASHBOARD,
      category: 'Navigation'
    },

    // Resources
    {
      key: 'license-management',
      label: t('licenseManagement'),
      icon: <SafetyCertificateOutlined />,
      path: ROUTES.RESOURCES.LICENSE_MANAGEMENT,
      category: 'Resources'
    },
    {
      key: 'products',
      label: t('products'),
      icon: <ShoppingOutlined />,
      path: ROUTES.RESOURCES.PRODUCTS,
      category: 'Resources'
    },

    // Business
    {
      key: 'orders',
      label: t('orders'),
      icon: <ShoppingCartOutlined />,
      path: ROUTES.BUSINESS.ORDERS,
      category: 'Business'
    },
    {
      key: 'revenue',
      label: t('revenue'),
      icon: <DollarOutlined />,
      path: ROUTES.BUSINESS.REVENUE,
      category: 'Business'
    },
    {
      key: 'customers',
      label: t('customers'),
      icon: <UserOutlined />,
      path: ROUTES.BUSINESS.CUSTOMERS,
      category: 'Business'
    },

    // Marketing
    {
      key: 'affiliate',
      label: t('affiliate'),
      icon: <TeamOutlined />,
      path: ROUTES.MARKETING.AFFILIATE,
      category: 'Marketing'
    },
    {
      key: 'campaigns',
      label: t('campaigns'),
      icon: <RocketOutlined />,
      path: ROUTES.MARKETING.EMAIL_MARKETING.CAMPAIGNS,
      category: 'Marketing'
    },
    {
      key: 'templates',
      label: t('templates'),
      icon: <SettingOutlined />,
      path: ROUTES.MARKETING.EMAIL_MARKETING.TEMPLATES,
      category: 'Marketing'
    },

    // Admin Tools
    {
      key: 'users',
      label: t('users'),
      icon: <UsergroupAddOutlined />,
      path: ROUTES.ADMIN_TOOLS.USERS,
      category: 'Admin Tools'
    },
    {
      key: 'permissions',
      label: t('permissions'),
      icon: <KeyOutlined />,
      path: ROUTES.ADMIN_TOOLS.CATEGORIES.PERMISSIONS,
      category: 'Admin Tools'
    },
    {
      key: 'settings',
      label: t('settings'),
      icon: <SettingOutlined />,
      path: ROUTES.ADMIN_TOOLS.SETTINGS,
      category: 'Admin Tools'
    },
    {
      key: 'tools',
      label: t('tools'),
      icon: <ToolOutlined />,
      path: ROUTES.ADMIN_TOOLS.TOOLS,
      category: 'Admin Tools'
    },
    {
      key: 'api-docs',
      label: t('apiDocs'),
      icon: <FileTextOutlined />,
      path: ROUTES.ADMIN_TOOLS.API_DOCS,
      category: 'Admin Tools'
    }
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (path?: string) => {
    return path && location.pathname === path;
  };

  const groupedMenuData = menuData.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const renderMenuItem = (item: MenuItem) => {
    const active = isActive(item.path);

    return (
      <button
        key={item.key}
        onClick={() => handleMenuClick(item)}
        className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors mb-1 ${
          active
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        {item.icon && <span>{item.icon}</span>}
        {!collapsed && <span>{item.label}</span>}
      </button>
    );
  };

  return (
    <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } h-full overflow-y-auto`}>
      <div className="p-4">
        <nav className="space-y-6">
          {Object.entries(groupedMenuData).map(([category, items]) => (
            <div key={category}>
              {!collapsed && (
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {category}
                </h3>
              )}
              <div className="space-y-1">
                {items.map(item => renderMenuItem(item))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
