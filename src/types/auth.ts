export type UserRole = 'customer' | 'admin';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}
