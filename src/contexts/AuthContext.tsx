import React, { createContext, useContext, useEffect, useState } from "react";

// Types
export interface User {
  id: string;
  name?: string;
  email: string;
  role: "customer" | "escort" | "admin";
  avatar?: string;
  verified?: boolean;
  membership?: "standard" | "vip" | "premium";
  hasCustomerAccount?: boolean;
  hasEscortAccount?: boolean;
  isSuperAdmin?: boolean;
  permissions?: AdminPermissions;
}

export interface AdminPermissions {
  canCreateListings: boolean;
  canEditListings: boolean;
  canDeleteListings: boolean;
  canApproveListings: boolean;
  canViewAllUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canBanUsers: boolean;
  canViewAllMessages: boolean;
  canModerateMessages: boolean;
  canManageAds: boolean;
  canEditContent: boolean;
  canManageBanner: boolean;
  canViewAnalytics: boolean;
  canExportData: boolean;
  canManageSettings: boolean;
  canManagePayments: boolean;
}

interface AuthContextValue {
  user: User | null;
  session: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isEscort: boolean;
  viewRole: "guest" | "user" | "premium" | "vip";
  userRole: "customer" | "escort" | "admin" | null;
  permissions: AdminPermissions | null;
  hasPermission: (permission: keyof AdminPermissions) => boolean;
  canAccessAnySection: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
}

const SUPER_ADMIN_PERMISSIONS: AdminPermissions = {
  canCreateListings: true, canEditListings: true, canDeleteListings: true, canApproveListings: true,
  canViewAllUsers: true, canEditUsers: true, canDeleteUsers: true, canBanUsers: true,
  canViewAllMessages: true, canModerateMessages: true, canManageAds: true, canEditContent: true,
  canManageBanner: true, canViewAnalytics: true, canExportData: true, canManageSettings: true,
  canManagePayments: true,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Local Auth Initialization
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // ⚠️ DEMO ONLY - Gerçek login için trpc.auth.login.mutate kullanılmalı
    // TODO: const result = await trpc.auth.login.mutateAsync({ email, password });
    //       setUser(result.user); localStorage.setItem('auth_user', JSON.stringify(result));
    const mockUser: User = {
      id: "1",
      email,
      name: email.split('@')[0],
      role: "customer",  // ✅ Güvenli: email bazlı rol belirleme kaldırıldı
      membership: "standard",
      isSuperAdmin: false,
    };
    setUser(mockUser);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const register = async (data: any) => {
    console.log("Registering:", data);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('auth_user', JSON.stringify(updated));
    }
  };

  const refreshToken = async () => { };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.isSuperAdmin === true;
  const isEscort = user?.role === "escort";
  const userRole = user?.role || null;
  const permissions = user?.permissions || null;

  const viewRole: "guest" | "user" | "premium" | "vip" = isAuthenticated
    ? user.membership === "vip" ? "vip" : user.membership === "premium" ? "premium" : "user"
    : "guest";

  const hasPermission = (permission: keyof AdminPermissions): boolean => {
    if (isSuperAdmin) return true;
    return permissions?.[permission] === true;
  };

  const canAccessAnySection = isSuperAdmin || (permissions && Object.values(permissions).some((p) => p === true));

  const value: AuthContextValue = {
    user, session, isAuthenticated, isLoading, isAdmin, isSuperAdmin, isEscort, viewRole, userRole,
    permissions, hasPermission, canAccessAnySection, login, logout, register, updateProfile, refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
