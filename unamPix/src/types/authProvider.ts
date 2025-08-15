import type React from "react";
import type { LoginUser, User } from "./user";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  register: (data: User) => Promise<void>;
  login: (data: LoginUser) => Promise<void>;
  logout: () => Promise<void>;
  errors: string[];
  clearErrors: () => void;
  initialUsers: () => React.ReactNode;
}
