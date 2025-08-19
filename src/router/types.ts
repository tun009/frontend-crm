import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
  exact?: boolean;
  requireAuth?: boolean;
  roles?: string[];
  title?: string;
  children?: RouteConfig[];
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}
