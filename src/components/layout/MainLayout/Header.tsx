import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { Avatar, Badge, Dropdown, Space } from '@/components/ui';
import {
  BellOutlined,
  GlobalOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

interface HeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Header = ({ collapsed, onToggleCollapse }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();
  const [notificationCount] = useState(5);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const languageItems = [
    {
      key: 'en_US',
      label: 'English',
      onClick: () => handleLanguageChange('en_US')
    },
    {
      key: 'vi_VN',
      label: 'Tiếng Việt',
      onClick: () => handleLanguageChange('vi_VN')
    }
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <Space>
          <UserOutlined />
          {t('common.profile')}
        </Space>
      )
    },
    {
      key: 'settings',
      label: (
        <Space>
          <SettingOutlined />
          {t('common.settings')}
        </Space>
      )
    },
    {
      type: 'divider' as const
    },
    {
      key: 'logout',
      label: (
        <Space>
          <LogoutOutlined />
          {t('common.logout')}
        </Space>
      ),
      danger: true
    }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 h-16 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {collapsed ? (
            <MenuUnfoldOutlined className="text-gray-600 dark:text-gray-300" />
          ) : (
            <MenuFoldOutlined className="text-gray-600 dark:text-gray-300" />
          )}
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">CRM</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Dropdown menu={{ items: languageItems }} placement="bottomRight">
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <GlobalOutlined className="text-gray-600 dark:text-gray-300" />
          </button>
        </Dropdown>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? (
            <SunOutlined className="text-gray-600 dark:text-gray-300" />
          ) : (
            <MoonOutlined className="text-gray-600 dark:text-gray-300" />
          )}
        </button>

        <Badge count={notificationCount}>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <BellOutlined className="text-gray-600 dark:text-gray-300" />
          </button>
        </Badge>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
