import { mockApiCall } from './index';

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeCustomers: number;
  growthRate: {
    users: number;
    orders: number;
    revenue: number;
    customers: number;
  };
}

export interface ChartData {
  revenue: Array<{ month: string; value: number }>;
  orders: Array<{ date: string; count: number }>;
  userGrowth: Array<{ month: string; users: number }>;
}

const mockDashboardStats: DashboardStats = {
  totalUsers: 1250,
  totalOrders: 3420,
  totalRevenue: 125000,
  activeCustomers: 890,
  growthRate: {
    users: 12.5,
    orders: 8.3,
    revenue: 15.7,
    customers: 6.2
  }
};

const mockChartData: ChartData = {
  revenue: [
    { month: 'Jan', value: 12000 },
    { month: 'Feb', value: 15000 },
    { month: 'Mar', value: 18000 },
    { month: 'Apr', value: 22000 },
    { month: 'May', value: 19000 },
    { month: 'Jun', value: 25000 }
  ],
  orders: [
    { date: '2024-01-01', count: 45 },
    { date: '2024-01-02', count: 52 },
    { date: '2024-01-03', count: 38 },
    { date: '2024-01-04', count: 61 },
    { date: '2024-01-05', count: 49 },
    { date: '2024-01-06', count: 55 },
    { date: '2024-01-07', count: 43 }
  ],
  userGrowth: [
    { month: 'Jan', users: 1100 },
    { month: 'Feb', users: 1150 },
    { month: 'Mar', users: 1180 },
    { month: 'Apr', users: 1200 },
    { month: 'May', users: 1220 },
    { month: 'Jun', users: 1250 }
  ]
};

export const getDashboardStats = () => mockApiCall(mockDashboardStats, 800);

export const getDashboardCharts = () => mockApiCall(mockChartData, 1200);
