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
    <div className="h-screen bg-gray-100 dark:bg-gray-900 flex overflow-hidden">
      {/* Sidebar - Full height on the left */}
      <Sidebar collapsed={collapsed} />

      {/* Right panel - Header + Main content */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <Header collapsed={collapsed} onToggleCollapse={handleToggleCollapse} />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
