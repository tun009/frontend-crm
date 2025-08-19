import { mockApiCall, mockPaginatedApiCall } from './index';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8901',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T08:30:00Z',
    lastLogin: '2024-01-20T14:22:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 234 567 8902',
    role: 'manager',
    status: 'active',
    createdAt: '2024-01-16T09:15:00Z',
    lastLogin: '2024-01-20T11:45:00Z'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 234 567 8903',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-17T10:00:00Z',
    lastLogin: '2024-01-19T16:30:00Z'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 234 567 8904',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-18T11:20:00Z'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 234 567 8905',
    role: 'manager',
    status: 'active',
    createdAt: '2024-01-19T13:45:00Z',
    lastLogin: '2024-01-20T09:15:00Z'
  }
];

export const getUsers = (page?: number, pageSize?: number) => 
  mockPaginatedApiCall(mockUsers, page, pageSize, 1000);

export const getUserById = (id: number) => {
  const user = mockUsers.find(u => u.id === id);
  return mockApiCall(user, 500);
};

export const createUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
  const newUser: User = {
    ...userData,
    id: Math.max(...mockUsers.map(u => u.id)) + 1,
    createdAt: new Date().toISOString()
  };
  return mockApiCall(newUser, 800);
};

export const updateUser = (id: number, userData: Partial<User>) => {
  const user = mockUsers.find(u => u.id === id);
  if (!user) throw new Error('User not found');
  
  const updatedUser = { ...user, ...userData };
  return mockApiCall(updatedUser, 600);
};

export const deleteUser = (id: number) => {
  return mockApiCall({ success: true }, 500);
};
