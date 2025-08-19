import { mockApiCall, mockPaginatedApiCall } from './index';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  createdAt: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const mockCustomers: Customer[] = [
  {
    id: 101,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 555 0101',
    company: 'Tech Solutions Inc.',
    status: 'active',
    totalOrders: 5,
    totalSpent: 1499.95,
    lastOrderDate: '2024-01-15T10:30:00Z',
    createdAt: '2023-12-01T08:00:00Z',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: 102,
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    phone: '+1 555 0102',
    company: 'Digital Agency LLC',
    status: 'active',
    totalOrders: 3,
    totalSpent: 899.97,
    lastOrderDate: '2024-01-16T11:15:00Z',
    createdAt: '2023-11-15T10:30:00Z',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    }
  },
  {
    id: 103,
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    phone: '+1 555 0103',
    status: 'active',
    totalOrders: 1,
    totalSpent: 599.98,
    lastOrderDate: '2024-01-17T09:45:00Z',
    createdAt: '2024-01-10T14:20:00Z',
    address: {
      street: '789 Pine Rd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  }
];

export const getCustomers = (page?: number, pageSize?: number) => 
  mockPaginatedApiCall(mockCustomers, page, pageSize, 900);

export const getCustomerById = (id: number) => {
  const customer = mockCustomers.find(c => c.id === id);
  return mockApiCall(customer, 500);
};
