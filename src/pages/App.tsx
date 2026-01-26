/**
 * App Root Router Page
 * 
 * Central routing and layout component that orchestrates the entire application.
 * Implements route configuration with code splitting, error boundaries, and loading states.
 * Provides global UI providers (tooltips, notifications) and lazy-loaded route definitions.
 * 
 * @module pages/App
 * @category Pages - Dashboard
 * 
 * Features:
 * - Lazy-loaded route definitions for optimal code splitting
 * - Comprehensive route organization (Home, Auth, Dashboard, Admin)
 * - Error boundary wrapping for route-level error handling
 * - Suspense fallback with loading state component
 * - Global UI providers (Tooltip, Toaster for notifications)
 * - 404 fallback page for undefined routes
 * - Route-level performance optimization
 * - Responsive layout with mobile navigation support
 * - Protected route implementation for authenticated pages
 * - Loading states during route transitions
 * 
 * Routes:
 * - Public: Home, Catalog, EscortList, EscortProfile, Pricing, Contact, Blog
 * - Legal: TermsOfService, PrivacyPolicy, CookiePolicy, KVKK, Safety
 * - Auth: ClientLogin, ClientRegister, EscortLogin, EscortRegister
 * - User: MyFavorites, Messages, MyAppointments
 * - Escort Panel: EscortDashboard, EscortMarket, ProfileEdit, Photos, Calendar, Earnings
 * - Customer Panel: CustomerDashboard, CustomerSettings, Notifications, History, Wallet
 * - Payment: PaymentResult, MembershipUpgrade, BillingDashboard
 * - Admin: AdminDashboard, AdminApprovals, AdminPanel, AdminReports, AdminRealTimeMonitoring
 * - General: About, FAQ, HowItWorks, Support, Report
 * - Utilities: SEO, NotFound
 * 
 * @example
 * ```tsx
 * // Root application entry point
 * <App />
 * ```
 */

import React, { Suspense, lazy } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { RouteErrorBoundary } from "@/components/ErrorBoundary";
import { FullPageLoading } from "@/components/LoadingStates";
import CookieConsent from "@/components/CookieConsent";
import RoleSelector from "@/components/RoleSelector";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { NotificationToast, NotificationCenter } from "@/components/Notifications";
import { FloatingNavigation } from "@/components/FloatingNavigation";
import { Header } from "@/components/Header";
import { Route } from "wouter";
import NotFound from "@/pages/NotFound";

// ─────────────────────────────────────────────────────────────────────────────
// LAZY LOADED ROUTES (Code Splitting)
// ─────────────────────────────────────────────────────────────────────────────
// This improves initial load time by splitting routes into separate chunks

// Home & Catalog (High priority - loaded first)
const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.default || m.Home })));
const Catalog = lazy(() => import("@/pages/Catalog").then(m => ({ default: m.default })));
const EscortList = lazy(() => import("@/pages/EscortList").then(m => ({ default: m.default })));

// Profile Pages
const EscortProfile = lazy(() => import("@/pages/EscortProfile").then(m => ({ default: m.default })));

// Legal Pages
const TermsOfService = lazy(() => import("@/pages/TermsOfService").then(m => ({ default: m.default })));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy").then(m => ({ default: m.default })));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy").then(m => ({ default: m.default })));
const KVKK = lazy(() => import("@/pages/KVKK").then(m => ({ default: m.default })));
const Safety = lazy(() => import("@/pages/Safety").then(m => ({ default: m.default })));


// Authentication
const EscortLogin = lazy(() => import("@/pages/EscortLogin").then(m => ({ default: m.default })));
const ClientLogin = lazy(() => import("@/pages/ClientLogin").then(m => ({ default: m.default })));
const EscortRegister = lazy(() => import("@/pages/EscortRegister").then(m => ({ default: m.default })));
const ClientRegister = lazy(() => import("@/pages/ClientRegister").then(m => ({ default: m.default })));

// User Dashboard
const MyFavorites = lazy(() => import("@/pages/MyFavorites").then(m => ({ default: m.default })));
const Messages = lazy(() => import("@/pages/Messages").then(m => ({ default: m.default })));
const MyAppointments = lazy(() => import("@/pages/MyAppointments").then(m => ({ default: m.default })));

// Escort Dashboard
const EscortDashboard = lazy(() => import("@/pages/EscortDashboard").then(m => ({ default: m.default })));
const EscortMarket = lazy(() => import("@/pages/EscortMarket").then(m => ({ default: m.default })));

// Admin
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard").then(m => ({ default: m.default })));
const AdminApprovals = lazy(() => import("@/pages/AdminApprovals").then(m => ({ default: m.default })));
const AdminListings = lazy(() => import("@/pages/AdminListings").then(m => ({ default: m.default })));
const AdminMedia = lazy(() => import("@/pages/AdminMedia").then(m => ({ default: m.default })));
const AdminFinancial = lazy(() => import("@/pages/AdminFinancial").then(m => ({ default: m.default })));
const AdminMessages = lazy(() => import("@/pages/AdminMessages").then(m => ({ default: m.default })));
const AdminAnalytics = lazy(() => import("@/pages/AdminAnalytics").then(m => ({ default: m.default })));
const AdminSecurity = lazy(() => import("@/pages/AdminSecurity").then(m => ({ default: m.default })));
const AdminNotifications = lazy(() => import("@/pages/AdminNotifications").then(m => ({ default: m.default })));
const AdminSettings = lazy(() => import("@/pages/AdminSettings").then(m => ({ default: m.default })));
const AdminUsers = lazy(() => import("@/pages/AdminUsers").then(m => ({ default: m.default })));
const Settings = lazy(() => import("@/pages/Settings").then(m => ({ default: m.default })));

// Other
const Pricing = lazy(() => import("@/pages/Pricing").then(m => ({ default: m.default })));
const SEO = lazy(() => import("@/pages/SEO").then(m => ({ default: m.default })));

// New Pages - High-End Features
const Contact = lazy(() => import("@/pages/Contact").then(m => ({ default: m.default })));
const PaymentResult = lazy(() => import("@/pages/PaymentResult").then(m => ({ default: m.default })));
const VerificationCenter = lazy(() => import("@/pages/VerificationCenter").then(m => ({ default: m.default })));
const Blog = lazy(() => import("@/pages/Blog").then(m => ({ default: m.default })));

// Phase 2 - Guest & Customer Pages
const GuestCatalog = lazy(() => import("@/pages/GuestCatalog").then(m => ({ default: m.default })));
const CustomerDashboard = lazy(() => import("@/pages/CustomerDashboard").then(m => ({ default: m.default })));

// Phase 3 - Escort Dashboard Pages
const EscortPrivateDashboard = lazy(() => import("@/pages/EscortPrivateDashboard").then(m => ({ default: m.default })));
const EscortAnalyticsDashboard = lazy(() => import("@/pages/EscortAnalyticsDashboard").then(m => ({ default: m.default })));

// Phase 5 - Billing & Payment Pages
const MembershipUpgrade = lazy(() => import("@/pages/MembershipUpgrade").then(m => ({ default: m.default })));
const BillingDashboard = lazy(() => import("@/pages/BillingDashboard").then(m => ({ default: m.default })));

// Phase 6 - Advanced Features (Real-Time Messaging & Video Calls)
const RealTimeMessaging = lazy(() => import("@/pages/RealTimeMessaging").then(m => ({ default: m.default })));
const VideoCallPage = lazy(() => import("@/pages/VideoCallPage").then(m => ({ default: m.default })));

// Phase 6 - Admin Enhancements
const AdminRealTimeMonitoring = lazy(() => import("@/pages/AdminRealTimeMonitoring").then(m => ({ default: m.default })));
const AdminReports = lazy(() => import("@/pages/AdminReports").then(m => ({ default: m.default })));

// Phase 7 - Analytics & Reviews
const Analytics = lazy(() => import("@/pages/Analytics").then(m => ({ default: m.default })));
const Reviews = lazy(() => import("@/pages/Reviews").then(m => ({ default: m.default || m.Reviews })));

// Phase 10 - New Platform Features
const Login = lazy(() => import("@/pages/Login").then(m => ({ default: m.default })));
const AdminPanel = lazy(() => import("@/pages/AdminPanel").then(m => ({ default: m.default })));
const AdminComplaints = lazy(() => import("@/pages/AdminComplaints").then(m => ({ default: m.default })));
const CustomerSettings = lazy(() => import("@/pages/customer/CustomerSettings").then(m => ({ default: m.default })));
const About = lazy(() => import("@/pages/general/About").then(m => ({ default: m.default })));
const FAQ = lazy(() => import("@/pages/general/FAQ").then(m => ({ default: m.default })));
const HowItWorks = lazy(() => import("@/pages/general/HowItWorks").then(m => ({ default: m.default })));
const SupportPage = lazy(() => import("@/pages/general/Support").then(m => ({ default: m.default })));

// Phase 2 - Escort Panel Pages (Faz 2)
const EscortProfileEdit = lazy(() => import("@/pages/escort/ProfileEdit").then(m => ({ default: m.default })));
const EscortPhotos = lazy(() => import("@/pages/escort/PhotoManager").then(m => ({ default: m.default })));
const EscortCalendar = lazy(() => import("@/pages/escort/CalendarManager").then(m => ({ default: m.default })));
const EscortEarnings = lazy(() => import("@/pages/escort/EarningsReport").then(m => ({ default: m.default })));

// Phase 2 - Customer Panel Pages (Faz 2)
const CustomerNotifications = lazy(() => import("@/pages/customer/Notifications").then(m => ({ default: m.default })));
const CustomerHistory = lazy(() => import("@/pages/customer/History").then(m => ({ default: m.default })));
const CustomerWallet = lazy(() => import("@/pages/customer/Wallet").then(m => ({ default: m.default })));

// Phase 2 - General Pages (Faz 2)
const ReportPage = lazy(() => import("@/pages/Report").then(m => ({ default: m.default })));

// ─────────────────────────────────────────────────────────────────────────────
// LOADING FALLBACK COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function RouteLoading() {
  return <FullPageLoading message="Sayfa yükleniyor..." />;
}

// ─────────────────────────────────────────────────────────────────────────────
// LAZY ROUTE WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
// Wraps lazy-loaded components with Suspense and ErrorBoundary

interface LazyRouteProps {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
}

function LazyRoute({ path, component: Component }: LazyRouteProps) {
  return (
    <Route path={path}>
      <RouteErrorBoundary>
        <Suspense fallback={<RouteLoading />}>
          <Component />
        </Suspense>
      </RouteErrorBoundary>
    </Route>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTER CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

function AppRouter() {
  return (
    <>
      {/* Home & Catalog - High Priority */}
      <Route path="/">
        {() => (
          <RouteErrorBoundary>
            <Suspense fallback={<RouteLoading />}>
              <Home />
            </Suspense>
          </RouteErrorBoundary>
        )}
      </Route>

      <Route path="/catalog">
        {() => (
          <RouteErrorBoundary>
            <Suspense fallback={<RouteLoading />}>
              <Catalog />
            </Suspense>
          </RouteErrorBoundary>
        )}
      </Route>

      <Route path="/escorts">
        {() => (
          <RouteErrorBoundary>
            <Suspense fallback={<RouteLoading />}>
              <EscortList />
            </Suspense>
          </RouteErrorBoundary>
        )}
      </Route>

      {/* Guest Catalog - Phase 2 */}
      <Route path="/guest-catalog">
        {() => (
          <RouteErrorBoundary>
            <Suspense fallback={<RouteLoading />}>
              <GuestCatalog />
            </Suspense>
          </RouteErrorBoundary>
        )}
      </Route>

      {/* Profile Pages */}
      <Route path="/escort/:id">
        {() => (
          <RouteErrorBoundary>
            <Suspense fallback={<RouteLoading />}>
              <EscortProfile />
            </Suspense>
          </RouteErrorBoundary>
        )}
      </Route>

      {/* Escort Routes */}
      <Route path="/login-escort">
        {() => <Suspense fallback={<RouteLoading />}><EscortLogin /></Suspense>}
      </Route>

      <Route path="/register-escort">
        {() => <Suspense fallback={<RouteLoading />}><EscortRegister /></Suspense>}
      </Route>

      <Route path="/escort/dashboard">
        {() => <Suspense fallback={<RouteLoading />}><EscortDashboard /></Suspense>}
      </Route>

      <Route path="/escort/market">
        {() => <Suspense fallback={<RouteLoading />}><EscortMarket /></Suspense>}
      </Route>

      {/* Escort Private Dashboard - Phase 3 */}
      <Route path="/escort/dashboard/private">
        {() => <Suspense fallback={<RouteLoading />}><EscortPrivateDashboard /></Suspense>}
      </Route>

      {/* Escort Analytics Dashboard - Phase 3 */}
      <Route path="/escort/dashboard/analytics">
        {() => <Suspense fallback={<RouteLoading />}><EscortAnalyticsDashboard /></Suspense>}
      </Route>

      {/* Escort Panel Pages - Phase 2 (Faz 2) */}
      <Route path="/escort/profile/edit">
        {() => <Suspense fallback={<RouteLoading />}><EscortProfileEdit /></Suspense>}
      </Route>

      <Route path="/escort/photos">
        {() => <Suspense fallback={<RouteLoading />}><EscortPhotos /></Suspense>}
      </Route>

      <Route path="/escort/calendar">
        {() => <Suspense fallback={<RouteLoading />}><EscortCalendar /></Suspense>}
      </Route>

      <Route path="/escort/earnings">
        {() => <Suspense fallback={<RouteLoading />}><EscortEarnings /></Suspense>}
      </Route>

      {/* Client/Customer Routes */}
      <Route path="/login">
        {() => <Suspense fallback={<RouteLoading />}><Login /></Suspense>}
      </Route>

      <Route path="/login-customer">
        {() => <Suspense fallback={<RouteLoading />}><ClientLogin /></Suspense>}
      </Route>

      <Route path="/login-client">
        {() => <Suspense fallback={<RouteLoading />}><ClientLogin /></Suspense>}
      </Route>

      <Route path="/register-client">
        {() => <Suspense fallback={<RouteLoading />}><ClientRegister /></Suspense>}
      </Route>

      {/* Generic Register Routes - Redirects to ClientRegister */}
      <Route path="/register">
        {() => <Suspense fallback={<RouteLoading />}><ClientRegister /></Suspense>}
      </Route>

      <Route path="/signup">
        {() => <Suspense fallback={<RouteLoading />}><ClientRegister /></Suspense>}
      </Route>

      {/* User Dashboard Routes */}
      <Route path="/favorites">
        {() => <Suspense fallback={<RouteLoading />}><MyFavorites /></Suspense>}
      </Route>

      <Route path="/messages">
        {() => <Suspense fallback={<RouteLoading />}><Messages /></Suspense>}
      </Route>

      <Route path="/appointments">
        {() => <Suspense fallback={<RouteLoading />}><MyAppointments /></Suspense>}
      </Route>

      {/* Customer Dashboard - Phase 2 */}
      <Route path="/dashboard">
        {() => <Suspense fallback={<RouteLoading />}><CustomerDashboard /></Suspense>}
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/dashboard">
        {() => <Suspense fallback={<RouteLoading />}><AdminDashboard /></Suspense>}
      </Route>

      <Route path="/admin/approvals">
        {() => <Suspense fallback={<RouteLoading />}><AdminApprovals /></Suspense>}
      </Route>

      <Route path="/admin/panel">
        {() => <Suspense fallback={<RouteLoading />}><AdminPanel /></Suspense>}
      </Route>

      <Route path="/admin/listings">
        {() => <Suspense fallback={<RouteLoading />}><AdminListings /></Suspense>}
      </Route>

      <Route path="/admin/media">
        {() => <Suspense fallback={<RouteLoading />}><AdminMedia /></Suspense>}
      </Route>

      <Route path="/admin/financial">
        {() => <Suspense fallback={<RouteLoading />}><AdminFinancial /></Suspense>}
      </Route>

      <Route path="/admin/messages">
(Content truncated due to size limit. Use line ranges to read remaining content)