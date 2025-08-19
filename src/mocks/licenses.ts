import { mockApiCall, mockPaginatedApiCall } from './index';

export interface License {
  id: number;
  licenseKey: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  status: 'active' | 'expired' | 'suspended' | 'pending' | 'revoked';
  type: 'standard' | 'premium' | 'enterprise' | 'trial';
  maxUsers: number;
  currentUsers: number;
  issueDate: string;
  expiryDate: string;
  lastUsed: string;
  features: string[];
  price: number;
  renewalPrice: number;
}

const mockLicenses: License[] = [
  {
    id: 1,
    licenseKey: 'LIC-2024-STD-001-ABCD',
    productName: 'CRM Standard',
    customerName: 'Alice Johnson',
    customerEmail: 'alice.johnson@email.com',
    status: 'active',
    type: 'standard',
    maxUsers: 10,
    currentUsers: 8,
    issueDate: '2024-01-15T10:30:00Z',
    expiryDate: '2025-01-15T10:30:00Z',
    lastUsed: '2024-01-20T14:22:00Z',
    features: ['Basic CRM', 'Contact Management', 'Email Integration'],
    price: 299.99,
    renewalPrice: 279.99
  },
  {
    id: 2,
    licenseKey: 'LIC-2024-PRE-002-EFGH',
    productName: 'CRM Premium',
    customerName: 'Bob Smith',
    customerEmail: 'bob.smith@email.com',
    status: 'active',
    type: 'premium',
    maxUsers: 25,
    currentUsers: 22,
    issueDate: '2024-01-10T09:15:00Z',
    expiryDate: '2025-01-10T09:15:00Z',
    lastUsed: '2024-01-21T16:45:00Z',
    features: ['Advanced CRM', 'Analytics', 'API Access', 'Custom Fields'],
    price: 599.99,
    renewalPrice: 549.99
  },
  {
    id: 3,
    licenseKey: 'LIC-2024-ENT-003-IJKL',
    productName: 'CRM Enterprise',
    customerName: 'Carol Davis',
    customerEmail: 'carol.davis@email.com',
    status: 'active',
    type: 'enterprise',
    maxUsers: 100,
    currentUsers: 85,
    issueDate: '2024-01-05T08:00:00Z',
    expiryDate: '2025-01-05T08:00:00Z',
    lastUsed: '2024-01-21T18:30:00Z',
    features: ['Full CRM Suite', 'Advanced Analytics', 'White Label', 'Priority Support'],
    price: 1299.99,
    renewalPrice: 1199.99
  },
  {
    id: 4,
    licenseKey: 'LIC-2024-TRI-004-MNOP',
    productName: 'CRM Trial',
    customerName: 'David Wilson',
    customerEmail: 'david.wilson@email.com',
    status: 'expired',
    type: 'trial',
    maxUsers: 5,
    currentUsers: 3,
    issueDate: '2023-12-01T10:00:00Z',
    expiryDate: '2023-12-31T10:00:00Z',
    lastUsed: '2023-12-30T12:15:00Z',
    features: ['Basic CRM', 'Limited Features'],
    price: 0,
    renewalPrice: 299.99
  },
  {
    id: 5,
    licenseKey: 'LIC-2024-STD-005-QRST',
    productName: 'CRM Standard',
    customerName: 'Emma Brown',
    customerEmail: 'emma.brown@email.com',
    status: 'suspended',
    type: 'standard',
    maxUsers: 15,
    currentUsers: 0,
    issueDate: '2024-01-12T11:30:00Z',
    expiryDate: '2025-01-12T11:30:00Z',
    lastUsed: '2024-01-18T09:20:00Z',
    features: ['Basic CRM', 'Contact Management', 'Email Integration'],
    price: 299.99,
    renewalPrice: 279.99
  },
  {
    id: 6,
    licenseKey: 'LIC-2024-PRE-006-UVWX',
    productName: 'CRM Premium',
    customerName: 'Frank Miller',
    customerEmail: 'frank.miller@email.com',
    status: 'pending',
    type: 'premium',
    maxUsers: 20,
    currentUsers: 0,
    issueDate: '2024-01-20T15:45:00Z',
    expiryDate: '2025-01-20T15:45:00Z',
    lastUsed: '2024-01-20T15:45:00Z',
    features: ['Advanced CRM', 'Analytics', 'API Access', 'Custom Fields'],
    price: 599.99,
    renewalPrice: 549.99
  },
  {
    id: 7,
    licenseKey: 'LIC-2024-ENT-007-YZAB',
    productName: 'CRM Enterprise',
    customerName: 'Grace Lee',
    customerEmail: 'grace.lee@email.com',
    status: 'active',
    type: 'enterprise',
    maxUsers: 200,
    currentUsers: 156,
    issueDate: '2023-11-15T14:20:00Z',
    expiryDate: '2024-11-15T14:20:00Z',
    lastUsed: '2024-01-21T17:10:00Z',
    features: ['Full CRM Suite', 'Advanced Analytics', 'White Label', 'Priority Support'],
    price: 1299.99,
    renewalPrice: 1199.99
  },
  {
    id: 8,
    licenseKey: 'LIC-2024-STD-008-CDEF',
    productName: 'CRM Standard',
    customerName: 'Henry Taylor',
    customerEmail: 'henry.taylor@email.com',
    status: 'revoked',
    type: 'standard',
    maxUsers: 10,
    currentUsers: 0,
    issueDate: '2024-01-08T13:15:00Z',
    expiryDate: '2025-01-08T13:15:00Z',
    lastUsed: '2024-01-15T11:30:00Z',
    features: ['Basic CRM', 'Contact Management', 'Email Integration'],
    price: 299.99,
    renewalPrice: 279.99
  },
  {
    id: 9,
    licenseKey: 'LIC-2024-PRE-009-GHIJ',
    productName: 'CRM Premium',
    customerName: 'Ivy Chen',
    customerEmail: 'ivy.chen@email.com',
    status: 'active',
    type: 'premium',
    maxUsers: 30,
    currentUsers: 28,
    issueDate: '2024-01-18T16:00:00Z',
    expiryDate: '2025-01-18T16:00:00Z',
    lastUsed: '2024-01-21T19:45:00Z',
    features: ['Advanced CRM', 'Analytics', 'API Access', 'Custom Fields'],
    price: 599.99,
    renewalPrice: 549.99
  },
  {
    id: 10,
    licenseKey: 'LIC-2024-TRI-010-KLMN',
    productName: 'CRM Trial',
    customerName: 'Jack Robinson',
    customerEmail: 'jack.robinson@email.com',
    status: 'active',
    type: 'trial',
    maxUsers: 5,
    currentUsers: 4,
    issueDate: '2024-01-15T12:00:00Z',
    expiryDate: '2024-02-15T12:00:00Z',
    lastUsed: '2024-01-21T20:15:00Z',
    features: ['Basic CRM', 'Limited Features'],
    price: 0,
    renewalPrice: 299.99
  },
  {
    id: 11,
    licenseKey: 'LIC-2024-ENT-011-OPQR',
    productName: 'CRM Enterprise',
    customerName: 'Kate Anderson',
    customerEmail: 'kate.anderson@email.com',
    status: 'active',
    type: 'enterprise',
    maxUsers: 150,
    currentUsers: 142,
    issueDate: '2023-12-20T10:30:00Z',
    expiryDate: '2024-12-20T10:30:00Z',
    lastUsed: '2024-01-21T21:00:00Z',
    features: ['Full CRM Suite', 'Advanced Analytics', 'White Label', 'Priority Support'],
    price: 1299.99,
    renewalPrice: 1199.99
  },
  {
    id: 12,
    licenseKey: 'LIC-2024-STD-012-STUV',
    productName: 'CRM Standard',
    customerName: 'Liam Garcia',
    customerEmail: 'liam.garcia@email.com',
    status: 'expired',
    type: 'standard',
    maxUsers: 12,
    currentUsers: 0,
    issueDate: '2023-01-15T09:45:00Z',
    expiryDate: '2024-01-15T09:45:00Z',
    lastUsed: '2024-01-10T14:20:00Z',
    features: ['Basic CRM', 'Contact Management', 'Email Integration'],
    price: 299.99,
    renewalPrice: 279.99
  }
];

export const getLicenses = (page?: number, pageSize?: number) => 
  mockPaginatedApiCall(mockLicenses, page, pageSize, 800);

export const getLicenseById = (id: number) => {
  const license = mockLicenses.find(l => l.id === id);
  return mockApiCall(license, 400);
};

export const updateLicenseStatus = (id: number, status: License['status']) => {
  const license = mockLicenses.find(l => l.id === id);
  if (!license) throw new Error('License not found');
  
  const updatedLicense = { 
    ...license, 
    status,
    lastUsed: new Date().toISOString() 
  };
  return mockApiCall(updatedLicense, 600);
};

export const deleteLicenses = (ids: number[]) => {
  return mockApiCall({ deletedCount: ids.length }, 800);
};
