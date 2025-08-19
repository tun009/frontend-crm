import { mockApiCall } from './index';

export interface RevenueData {
  totalRevenue: number;
  monthlyRevenue: Array<{ month: string; revenue: number; orders: number }>;
  revenueByCategory: Array<{ category: string; revenue: number; percentage: number }>;
  topProducts: Array<{ productName: string; revenue: number; units: number }>;
}

const mockRevenueData: RevenueData = {
  totalRevenue: 125000,
  monthlyRevenue: [
    { month: 'Jan', revenue: 18000, orders: 120 },
    { month: 'Feb', revenue: 22000, orders: 145 },
    { month: 'Mar', revenue: 19500, orders: 132 },
    { month: 'Apr', revenue: 25000, orders: 168 },
    { month: 'May', revenue: 21000, orders: 140 },
    { month: 'Jun', revenue: 19500, orders: 135 }
  ],
  revenueByCategory: [
    { category: 'Premium License', revenue: 75000, percentage: 60 },
    { category: 'Standard License', revenue: 37500, percentage: 30 },
    { category: 'Basic License', revenue: 12500, percentage: 10 }
  ],
  topProducts: [
    { productName: 'Premium License', revenue: 75000, units: 250 },
    { productName: 'Standard License', revenue: 37500, units: 250 },
    { productName: 'Basic License', revenue: 12500, units: 250 }
  ]
};

export const getRevenueData = () => mockApiCall(mockRevenueData, 1000);
