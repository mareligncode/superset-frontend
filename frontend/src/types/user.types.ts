export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  permissions: Permission[];
  organization: string;
  region?: string;
  facility?: string;
  avatar?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export type UserRole =
  | 'super-admin'
  | 'admin'
  | 'regional-admin'
  | 'facility-admin'
  | 'data-manager'
  | 'analyst'
  | 'viewer'
  | 'healthcare-worker';

export type Permission =
  | 'dashboard:view'
  | 'dashboard:create'
  | 'dashboard:edit'
  | 'dashboard:delete'
  | 'data:view'
  | 'data:create'
  | 'data:edit'
  | 'data:delete'
  | 'data:export'
  | 'users:view'
  | 'users:create'
  | 'users:edit'
  | 'users:delete'
  | 'reports:view'
  | 'reports:create'
  | 'reports:export'
  | 'settings:view'
  | 'settings:edit';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organization: string;
  role: UserRole;
}

export interface UserProfile {
  user: User;
  preferences: UserPreferences;
  notifications: NotificationSettings;
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'auto';
  dateFormat: string;
  timeFormat: string;
  timezone: string;
  defaultDashboard?: string;
  defaultRegion?: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  alertTypes: AlertType[];
}

export type AlertType =
  | 'data-quality'
  | 'system-outage'
  | 'report-ready'
  | 'threshold-breach'
  | 'new-feature';

export interface Session {
  id: string;
  userId: string;
  token: string;
  device: string;
  browser: string;
  ipAddress: string;
  location?: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
}
