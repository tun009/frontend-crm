import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Loading } from '@/components/ui';
import { getDashboardStats, getDashboardCharts, DashboardStats, ChartData } from '@/mocks/dashboard';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [charts, setCharts] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, chartsResponse] = await Promise.all([
          getDashboardStats(),
          getDashboardCharts()
        ]);
        
        setStats(statsResponse.data);
        setCharts(chartsResponse.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading size="large" text="Loading dashboard..." />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('menu.dashboard')}
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.totalUsers.toLocaleString()}
              </p>
              <p className="text-xs text-green-600">
                +{stats?.growthRate.users}% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 text-xl">👥</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.totalOrders.toLocaleString()}
              </p>
              <p className="text-xs text-green-600">
                +{stats?.growthRate.orders}% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-xl">📦</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${stats?.totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-green-600">
                +{stats?.growthRate.revenue}% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 dark:text-yellow-400 text-xl">💰</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.activeCustomers.toLocaleString()}
              </p>
              <p className="text-xs text-green-600">
                +{stats?.growthRate.customers}% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400 text-xl">🎯</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Overview" className="p-6">
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Revenue Chart Placeholder
            <br />
            <small>Chart library will be added later</small>
          </div>
        </Card>

        <Card title="User Growth" className="p-6">
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            User Growth Chart Placeholder
            <br />
            <small>Chart library will be added later</small>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
