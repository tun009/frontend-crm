import { useState } from 'react';
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
  children?: MenuItem[];
  level: 1 | 2 | 3;
  path?: string;
}

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const { t } = useTranslation('menu');
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>(['dashboard-group']);

  const menuData: MenuItem[] = [
    {
      key: 'dashboard-group',
      label: t('dashboard'),
      level: 1,
      children: [
        {
          key: 'dashboard',
          label: t('dashboard'),
          level: 2,
          icon: <DashboardOutlined />,
          path: ROUTES.DASHBOARD
        }
      ]
    },
    {
      key: 'resources',
      label: t('resources'),
      level: 1,
      children: [
        {
          key: 'license-management',
          label: t('licenseManagement'),
          level: 2,
          icon: <SafetyCertificateOutlined />,
          path: ROUTES.RESOURCES.LICENSE_MANAGEMENT
        },
        {
          key: 'products',
          label: t('products'),
          level: 2,
          icon: <ShoppingOutlined />,
          path: ROUTES.RESOURCES.PRODUCTS
        }
      ]
    },
    {
      key: 'business',
      label: t('business'),
      level: 1,
      children: [
        {
          key: 'orders',
          label: t('orders'),
          level: 2,
          icon: <ShoppingCartOutlined />,
          path: ROUTES.BUSINESS.ORDERS
        },
        {
          key: 'revenue',
          label: t('revenue'),
          level: 2,
          icon: <DollarOutlined />,
          path: ROUTES.BUSINESS.REVENUE
        },
        {
          key: 'customers',
          label: t('customers'),
          level: 2,
          icon: <UserOutlined />,
          path: ROUTES.BUSINESS.CUSTOMERS
        }
      ]
    },
    {
      key: 'marketing',
      label: t('marketing'),
      level: 1,
      children: [
        {
          key: 'affiliate',
          label: t('affiliate'),
          level: 2,
          icon: <TeamOutlined />,
          path: ROUTES.MARKETING.AFFILIATE
        },
        {
          key: 'email-marketing',
          label: t('emailMarketing'),
          level: 2,
          children: [
            {
              key: 'campaigns',
              label: t('campaigns'),
              level: 3,
              icon: <RocketOutlined />,
              path: ROUTES.MARKETING.EMAIL_MARKETING.CAMPAIGNS
            },
            {
              key: 'templates',
              label: t('templates'),
              level: 3,
              icon: <SettingOutlined />,
              path: ROUTES.MARKETING.EMAIL_MARKETING.TEMPLATES
            }
          ]
        }
      ]
    },
    {
      key: 'admin-tools',
      label: t('adminTools'),
      level: 1,
      children: [
        {
          key: 'users',
          label: t('users'),
          level: 2,
          icon: <UsergroupAddOutlined />,
          path: ROUTES.ADMIN_TOOLS.USERS
        },
        {
          key: 'categories',
          label: t('categories'),
          level: 2,
          children: [
            {
              key: 'permissions',
              label: t('permissions'),
              level: 3,
              icon: <KeyOutlined />,
              path: ROUTES.ADMIN_TOOLS.CATEGORIES.PERMISSIONS
            }
          ]
        },
        {
          key: 'settings',
          label: t('settings'),
          level: 2,
          icon: <SettingOutlined />,
          path: ROUTES.ADMIN_TOOLS.SETTINGS
        },
        {
          key: 'tools',
          label: t('tools'),
          level: 2,
          icon: <ToolOutlined />,
          path: ROUTES.ADMIN_TOOLS.TOOLS
        },
        {
          key: 'api-docs',
          label: t('apiDocs'),
          level: 2,
          icon: <FileTextOutlined />,
          path: ROUTES.ADMIN_TOOLS.API_DOCS
        }
      ]
    }
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleSubMenuToggle = (key: string) => {
    setOpenKeys(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const isActive = (path?: string) => {
    return path && location.pathname === path;
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openKeys.includes(item.key);
    const active = isActive(item.path);

    if (hasChildren) {
      return (
        <div key={item.key} className="mb-1">
          <button
            onClick={() => handleSubMenuToggle(item.key)}
            className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors ${
              item.level === 1 
                ? 'text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              {item.icon && <span className="text-lg">{item.icon}</span>}
              {!collapsed && <span>{item.label}</span>}
            </div>
            {!collapsed && hasChildren && (
              <span className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                ▶
              </span>
            )}
          </button>
          
          {!collapsed && isOpen && (
            <div className={`ml-${item.level === 1 ? '0' : '6'} space-y-1`}>
              {item.children?.map(child => renderMenuItem(child))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.key}
        onClick={() => handleMenuClick(item)}
        className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors mb-1 ${
          active
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        } ${item.level === 3 ? 'ml-6' : ''}`}
      >
        {item.icon && <span className="text-lg">{item.icon}</span>}
        {!collapsed && <span>{item.label}</span>}
      </button>
    );
  };

  return (
    <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } h-full overflow-y-auto`}>
      <div className="p-4">
        <nav className="space-y-2">
          {menuData.map(item => renderMenuItem(item))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
