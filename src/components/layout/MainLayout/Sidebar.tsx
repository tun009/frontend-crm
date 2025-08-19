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
  children?: MenuItem[];
  category?: string;
  level?: number;
}

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const { t } = useTranslation('menu');
  const location = useLocation();
  const navigate = useNavigate();
  // All items are expanded by default

  const menuData: MenuItem[] = [
    // Level 1: Dashboard
    {
      key: 'dashboard-group',
      label: t('dashboard'),
      category: 'Dashboard',
      children: [
        {
          key: 'dashboard',
          label: t('dashboard'),
          icon: <DashboardOutlined />,
          path: ROUTES.DASHBOARD,
          level: 2
        }
      ]
    },

    // Level 1: Tài nguyên
    {
      key: 'resources-group',
      label: t('resources'),
      category: 'Resources',
      children: [
        {
          key: 'license-management',
          label: t('licenseManagement'),
          icon: <SafetyCertificateOutlined />,
          path: ROUTES.RESOURCES.LICENSE_MANAGEMENT,
          level: 2
        },
        {
          key: 'products',
          label: t('products'),
          icon: <ShoppingOutlined />,
          path: ROUTES.RESOURCES.PRODUCTS,
          level: 2
        }
      ]
    },

    // Level 1: Kinh doanh
    {
      key: 'business-group',
      label: t('business'),
      category: 'Business',
      children: [
        {
          key: 'orders',
          label: t('orders'),
          icon: <ShoppingCartOutlined />,
          path: ROUTES.BUSINESS.ORDERS,
          level: 2
        },
        {
          key: 'revenue',
          label: t('revenue'),
          icon: <DollarOutlined />,
          path: ROUTES.BUSINESS.REVENUE,
          level: 2
        },
        {
          key: 'customers',
          label: t('customers'),
          icon: <UserOutlined />,
          path: ROUTES.BUSINESS.CUSTOMERS,
          level: 2
        }
      ]
    },

    // Level 1: Marketing
    {
      key: 'marketing-group',
      label: t('marketing'),
      category: 'Marketing',
      children: [
        {
          key: 'affiliate',
          label: t('affiliate'),
          icon: <TeamOutlined />,
          path: ROUTES.MARKETING.AFFILIATE,
          level: 2
        },
        {
          key: 'email-marketing',
          label: t('emailMarketing'),
          level: 2,
          children: [
            {
              key: 'campaigns',
              label: t('campaigns'),
              icon: <RocketOutlined />,
              path: ROUTES.MARKETING.EMAIL_MARKETING.CAMPAIGNS,
              level: 3
            },
            {
              key: 'templates',
              label: t('templates'),
              icon: <FileTextOutlined />,
              path: ROUTES.MARKETING.EMAIL_MARKETING.TEMPLATES,
              level: 3
            }
          ]
        }
      ]
    },

    // Level 1: Công cụ admin
    {
      key: 'admin-tools-group',
      label: t('adminTools'),
      category: 'Admin Tools',
      children: [
        {
          key: 'users',
          label: t('users'),
          icon: <UsergroupAddOutlined />,
          path: ROUTES.ADMIN_TOOLS.USERS,
          level: 2
        },
        {
          key: 'categories',
          label: t('categories'),
          level: 2,
          children: [
            {
              key: 'permissions',
              label: t('permissions'),
              icon: <KeyOutlined />,
              path: ROUTES.ADMIN_TOOLS.CATEGORIES.PERMISSIONS,
              level: 3
            }
          ]
        },
        {
          key: 'settings',
          label: t('settings'),
          icon: <SettingOutlined />,
          path: ROUTES.ADMIN_TOOLS.SETTINGS,
          level: 2
        },
        {
          key: 'tools',
          label: t('tools'),
          icon: <ToolOutlined />,
          path: ROUTES.ADMIN_TOOLS.TOOLS,
          level: 2
        },
        {
          key: 'api-docs',
          label: t('apiDocs'),
          icon: <FileTextOutlined />,
          path: ROUTES.ADMIN_TOOLS.API_DOCS,
          level: 2
        }
      ]
    }
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.path) {
      // Navigate for leaf items only
      navigate(item.path);
    }
  };

  const isActive = (path?: string) => {
    return path && location.pathname === path;
  };

  // Collect all leaf items (items with icons) for collapsed view
  const collectLeafItems = (items: MenuItem[]): MenuItem[] => {
    const leafItems: MenuItem[] = [];

    const traverse = (menuItems: MenuItem[]) => {
      menuItems.forEach(item => {
        if (item.icon && item.path) {
          // This is a leaf item with icon
          leafItems.push(item);
        }
        if (item.children) {
          traverse(item.children);
        }
      });
    };

    traverse(items);
    return leafItems;
  };

  const renderMenuItem = (item: MenuItem, level: number = 1): React.ReactNode => {
    const active = isActive(item.path);
    const hasChildren = item.children && item.children.length > 0;

    // Padding based on level
    let paddingClass = 'px-3';
    if (level === 2) paddingClass = 'px-6';
    if (level === 3) paddingClass = 'px-9';

    return (
      <div key={item.key}>
        <button
          onClick={() => handleMenuClick(item)}
          className={`w-full flex items-center ${paddingClass} py-2 text-left rounded-md transition-colors mb-1 ${
            active
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center space-x-3">
            {item.icon && <span>{item.icon}</span>}
            {!collapsed && <span className={level === 1 ? 'font-medium' : ''}>{item.label}</span>}
          </div>
        </button>

        {/* Always render children if they exist and sidebar is not collapsed */}
        {hasChildren && !collapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderCollapsedMenuItem = (item: MenuItem): React.ReactNode => {
    const active = isActive(item.path);

    return (
      <button
        key={item.key}
        onClick={() => handleMenuClick(item)}
        className={`w-full flex items-center justify-center p-3 rounded-md transition-colors mb-1 ${
          active
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        title={item.label}
      >
        {item.icon}
      </button>
    );
  };

  return (
    <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-65'
    } h-screen flex flex-col`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-xl text-gray-900 dark:text-white">CRM</span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sidebar-scroll">
        <nav className="space-y-2">
          {collapsed ? (
            collectLeafItems(menuData).map(item => renderCollapsedMenuItem(item))
          ) : (
            menuData.map(item => renderMenuItem(item))
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
