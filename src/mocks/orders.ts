import { mockApiCall, mockPaginatedApiCall } from './index';

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    customerId: 101,
    customerName: 'Alice Johnson',
    customerEmail: 'alice.johnson@email.com',
    status: 'delivered',
    total: 299.99,
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'Premium License',
        quantity: 1,
        price: 299.99,
        total: 299.99
      }
    ],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-18T14:22:00Z',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    customerId: 102,
    customerName: 'Bob Smith',
    customerEmail: 'bob.smith@email.com',
    status: 'processing',
    total: 149.99,
    items: [
      {
        id: 2,
        productId: 2,
        productName: 'Standard License',
        quantity: 1,
        price: 149.99,
        total: 149.99
      }
    ],
    createdAt: '2024-01-16T11:15:00Z',
    updatedAt: '2024-01-16T11:15:00Z',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    }
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    customerId: 103,
    customerName: 'Carol Davis',
    customerEmail: 'carol.davis@email.com',
    status: 'pending',
    total: 599.98,
    items: [
      {
        id: 3,
        productId: 1,
        productName: 'Premium License',
        quantity: 2,
        price: 299.99,
        total: 599.98
      }
    ],
    createdAt: '2024-01-17T09:45:00Z',
    updatedAt: '2024-01-17T09:45:00Z',
    shippingAddress: {
      street: '789 Pine Rd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  }
];

export const getOrders = (page?: number, pageSize?: number) => 
  mockPaginatedApiCall(mockOrders, page, pageSize, 1200);

export const getOrderById = (id: number) => {
  const order = mockOrders.find(o => o.id === id);
  return mockApiCall(order, 600);
};

export const updateOrderStatus = (id: number, status: Order['status']) => {
  const order = mockOrders.find(o => o.id === id);
  if (!order) throw new Error('Order not found');
  
  const updatedOrder = { 
    ...order, 
    status, 
    updatedAt: new Date().toISOString() 
  };
  return mockApiCall(updatedOrder, 500);
};
