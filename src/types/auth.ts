export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  department: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  permissions: Permission[];
}

export type UserRole = 'admin' | 'safety-manager' | 'supervisor' | 'operator';

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
  role?: UserRole;
}