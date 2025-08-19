import { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header collapsed={collapsed} onToggleCollapse={handleToggleCollapse} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar collapsed={collapsed} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm min-h-[calc(100vh-8rem)]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
