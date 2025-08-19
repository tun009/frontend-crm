export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'CRM Frontend';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

export const ROUTES = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },

  // Main
  HOME: '/',
  DASHBOARD: '/dashboard',

  // Resources
  RESOURCES: {
    LICENSE_MANAGEMENT: '/resources/license-management',
    PRODUCTS: '/resources/products',
  },

  // Business
  BUSINESS: {
    ORDERS: '/business/orders',
    REVENUE: '/business/revenue',
    CUSTOMERS: '/business/customers',
  },

  // Marketing
  MARKETING: {
    AFFILIATE: '/marketing/affiliate',
    EMAIL_MARKETING: {
      CAMPAIGNS: '/marketing/email-marketing/campaigns',
      TEMPLATES: '/marketing/email-marketing/templates',
    },
  },

  // Admin Tools
  ADMIN_TOOLS: {
    USERS: '/admin-tools/users',
    CATEGORIES: {
      PERMISSIONS: '/admin-tools/categories/permissions',
    },
    SETTINGS: '/admin-tools/settings',
    TOOLS: '/admin-tools/tools',
    API_DOCS: '/admin-tools/api-docs',
  },

  // Errors
  FORBIDDEN: '/403',
  NOT_FOUND: '*',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
