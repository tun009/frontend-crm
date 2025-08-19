import { mockApiCall, mockPaginatedApiCall } from './index';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  status: 'active' | 'inactive';
  stock: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Premium License',
    description: 'Full-featured premium license with all advanced features',
    price: 299.99,
    category: 'License',
    status: 'active',
    stock: 100,
    sku: 'LIC-PREM-001',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Standard License',
    description: 'Standard license with essential features',
    price: 149.99,
    category: 'License',
    status: 'active',
    stock: 200,
    sku: 'LIC-STD-001',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T14:20:00Z'
  },
  {
    id: 3,
    name: 'Basic License',
    description: 'Entry-level license for small teams',
    price: 49.99,
    category: 'License',
    status: 'active',
    stock: 500,
    sku: 'LIC-BAS-001',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-05T09:15:00Z'
  }
];

export const getProducts = (page?: number, pageSize?: number) => 
  mockPaginatedApiCall(mockProducts, page, pageSize, 800);

export const getProductById = (id: number) => {
  const product = mockProducts.find(p => p.id === id);
  return mockApiCall(product, 400);
};
