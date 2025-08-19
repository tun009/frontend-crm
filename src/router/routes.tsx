import { lazy } from 'react';
import { RouteConfig } from './types';
import { ROUTES } from '@/utils/constants';

// Lazy load components
const Dashboard = lazy(() => import('@/pages/dashboard'));
const LicenseManagement = lazy(() => import('@/pages/resources/license-management'));
const Products = lazy(() => import('@/pages/resources/products'));
const Orders = lazy(() => import('@/pages/business/orders'));
const Revenue = lazy(() => import('@/pages/business/revenue'));
const Customers = lazy(() => import('@/pages/business/customers'));
const Affiliate = lazy(() => import('@/pages/marketing/affiliate'));
const Campaigns = lazy(() => import('@/pages/marketing/email-marketing/campaigns'));
const Templates = lazy(() => import('@/pages/marketing/email-marketing/templates'));
const Users = lazy(() => import('@/pages/admin-tools/users'));
const Permissions = lazy(() => import('@/pages/admin-tools/categories/permissions'));
const Settings = lazy(() => import('@/pages/admin-tools/settings'));
const Tools = lazy(() => import('@/pages/admin-tools/tools'));
const ApiDocs = lazy(() => import('@/pages/admin-tools/api-docs'));

// Auth pages
const Login = lazy(() => import('@/pages/auth/login'));
const Register = lazy(() => import('@/pages/auth/register'));

// Error pages
const NotFound = lazy(() => import('@/pages/errors/404'));
const Forbidden = lazy(() => import('@/pages/errors/403'));

export const routes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    component: Dashboard,
    exact: true,
    requireAuth: true,
    title: 'Dashboard'
  },
  {
    path: ROUTES.DASHBOARD,
    component: Dashboard,
    requireAuth: true,
    title: 'Dashboard'
  },

  // Resources
  {
    path: ROUTES.RESOURCES.LICENSE_MANAGEMENT,
    component: LicenseManagement,
    requireAuth: true,
    title: 'License Management'
  },
  {
    path: ROUTES.RESOURCES.PRODUCTS,
    component: Products,
    requireAuth: true,
    title: 'Products'
  },

  // Business
  {
    path: ROUTES.BUSINESS.ORDERS,
    component: Orders,
    requireAuth: true,
    title: 'Orders'
  },
  {
    path: ROUTES.BUSINESS.REVENUE,
    component: Revenue,
    requireAuth: true,
    title: 'Revenue'
  },
  {
    path: ROUTES.BUSINESS.CUSTOMERS,
    component: Customers,
    requireAuth: true,
    title: 'Customers'
  },

  // Marketing
  {
    path: ROUTES.MARKETING.AFFILIATE,
    component: Affiliate,
    requireAuth: true,
    title: 'Affiliate'
  },
  {
    path: ROUTES.MARKETING.EMAIL_MARKETING.CAMPAIGNS,
    component: Campaigns,
    requireAuth: true,
    title: 'Email Campaigns'
  },
  {
    path: ROUTES.MARKETING.EMAIL_MARKETING.TEMPLATES,
    component: Templates,
    requireAuth: true,
    title: 'Email Templates'
  },

  // Admin Tools
  {
    path: ROUTES.ADMIN_TOOLS.USERS,
    component: Users,
    requireAuth: true,
    roles: ['admin', 'manager'],
    title: 'Users'
  },
  {
    path: ROUTES.ADMIN_TOOLS.CATEGORIES.PERMISSIONS,
    component: Permissions,
    requireAuth: true,
    roles: ['admin'],
    title: 'Permissions'
  },
  {
    path: ROUTES.ADMIN_TOOLS.SETTINGS,
    component: Settings,
    requireAuth: true,
    roles: ['admin'],
    title: 'Settings'
  },
  {
    path: ROUTES.ADMIN_TOOLS.TOOLS,
    component: Tools,
    requireAuth: true,
    roles: ['admin'],
    title: 'Tools'
  },
  {
    path: ROUTES.ADMIN_TOOLS.API_DOCS,
    component: ApiDocs,
    requireAuth: true,
    title: 'API Documentation'
  },

  // Auth routes
  {
    path: ROUTES.AUTH.LOGIN,
    component: Login,
    requireAuth: false,
    title: 'Login'
  },
  {
    path: ROUTES.AUTH.REGISTER,
    component: Register,
    requireAuth: false,
    title: 'Register'
  },

  // Error routes
  {
    path: ROUTES.FORBIDDEN,
    component: Forbidden,
    requireAuth: false,
    title: 'Forbidden'
  },
  {
    path: ROUTES.NOT_FOUND,
    component: NotFound,
    requireAuth: false,
    title: 'Not Found'
  }
];
