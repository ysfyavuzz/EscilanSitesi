import React, { createContext, useContext, useEffect, useState } from "react";
import {
  supabase,
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  refreshSession,
  updateUserMetadata,
  type SupabaseUser,
} from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

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
  // Super Admin Yetkileri
  isSuperAdmin?: boolean;
  permissions?: AdminPermissions;
}

export interface AdminPermissions {
  // İlan Yönetimi
  canCreateListings: boolean;
  canEditListings: boolean;
  canDeleteListings: boolean;
  canApproveListings: boolean;
  // Kullanıcı Yönetimi
  canViewAllUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canBanUsers: boolean;
  // Mesajlar
  canViewAllMessages: boolean;
  canModerateMessages: boolean;
  // İçerik Yönetimi
  canManageAds: boolean;
  canEditContent: boolean;
  canManageBanner: boolean;
  // Analitik
  canViewAnalytics: boolean;
  canExportData: boolean;
  // Sistem Ayarları
  canManageSettings: boolean;
  canManagePayments: boolean;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isEscort: boolean;
  // Rol bazlı görüntüleme limitleri için
  viewRole: "guest" | "user" | "premium" | "vip";
  // Kullanıcının rolü (customer, escort, admin)
  userRole: "customer" | "escort" | "admin" | null;
  // Admin Yetkileri
  permissions: AdminPermissions | null;
  hasPermission: (permission: keyof AdminPermissions) => boolean;
  canAccessAnySection: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
}

// Super Admin için varsayılan yetkiler
const SUPER_ADMIN_PERMISSIONS: AdminPermissions = {
  canCreateListings: true,
  canEditListings: true,
  canDeleteListings: true,
  canApproveListings: true,
  canViewAllUsers: true,
  canEditUsers: true,
  canDeleteUsers: true,
  canBanUsers: true,
  canViewAllMessages: true,
  canModerateMessages: true,
  canManageAds: true,
  canEditContent: true,
  canManageBanner: true,
  canViewAnalytics: true,
  canExportData: true,
  canManageSettings: true,
  canManagePayments: true,
};

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "customer" | "escort";
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Convert Supabase User to App User
 */
function convertSupabaseUser(supabaseUser: SupabaseUser): User {
  const metadata = supabaseUser.user_metadata || {};
  const role = metadata.role || "customer";
  const isSuperAdmin = metadata.isSuperAdmin === true || role === "admin";

  return {
    id: supabaseUser.id,
    name: metadata.name || supabaseUser.email?.split("@")[0],
    email: supabaseUser.email!,
    role,
    avatar: metadata.avatar,
    verified: supabaseUser.email_confirmed_at != null,
    membership: metadata.membership || "standard",
    hasCustomerAccount: metadata.hasCustomerAccount,
    hasEscortAccount: metadata.hasEscortAccount,
    isSuperAdmin,
    permissions: isSuperAdmin ? SUPER_ADMIN_PERMISSIONS : metadata.permissions,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from Supabase
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(convertSupabaseUser(session.user));
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser(convertSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string) => {
    try {
      const { session, user: supabaseUser } = await signIn(email, password);
      setSession(session);
      if (supabaseUser) {
        setUser(convertSupabaseUser(supabaseUser));
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  /**
   * Logout current user
   */
  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  /**
   * Register new user
   */
  const register = async (data: RegisterData) => {
    try {
      const { name, email, password, role = "customer" } = data;

      await signUp(email, password, {
        name,
        role,
      });

      // After signup, user needs to verify email
      // Supabase will send verification email automatically if configured
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) throw new Error("No user logged in");

      // Update Supabase user metadata
      await updateUserMetadata(data);

      // Update local state
      setUser({ ...user, ...data });
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  /**
   * Refresh authentication token
   */
  const refreshToken = async () => {
    try {
      const newSession = await refreshSession();
      if (newSession) {
        setSession(newSession);
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUser(convertSupabaseUser(data.user));
        }
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      throw error;
    }
  };

  // Computed properties
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.isSuperAdmin === true;
  const isEscort = user?.role === "escort";
  const userRole = user?.role || null;
  const permissions = user?.permissions || null;

  // View role based on membership
  const viewRole: "guest" | "user" | "premium" | "vip" = isAuthenticated
    ? user.membership === "vip"
      ? "vip"
      : user.membership === "premium"
        ? "premium"
        : "user"
    : "guest";

  // Permission checker
  const hasPermission = (permission: keyof AdminPermissions): boolean => {
    if (isSuperAdmin) return true;
    return permissions?.[permission] === true;
  };

  // Check if user can access any admin section
  const canAccessAnySection =
    isSuperAdmin ||
    (permissions && Object.values(permissions).some((p) => p === true));

  const value: AuthContextValue = {
    user,
    session,
    isAuthenticated,
    isLoading,
    isAdmin,
    isSuperAdmin,
    isEscort,
    viewRole,
    userRole,
    permissions,
    hasPermission,
    canAccessAnySection,
    login,
    logout,
    register,
    updateProfile,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Hook to require authentication
 */
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page
      window.location.href = "/login";
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}

/**
 * Hook to require admin role
 */
export function useRequireAdmin() {
  const { isAdmin, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        window.location.href = "/login";
      } else if (!isAdmin) {
        window.location.href = "/";
      }
    }
  }, [isAdmin, isLoading, isAuthenticated]);

  return { isAdmin, isLoading };
}
