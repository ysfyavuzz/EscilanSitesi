/**
 * Customer Analytics Page
 *
 * This page displays activity statistics and spending analysis for customers.
 * Wrapped in CustomerDashboardLayout for consistent navigation.
 *
 * @module pages/customer/CustomerAnalytics
 * @category Pages - Customer Dashboard
 */

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { ReportsPanel } from '@/components/ReportsPanel';
import { useAuth } from '@/contexts/AuthContext';
import { CustomerDashboardLayout } from '@/components/layout/CustomerDashboardLayout';
import {
  BarChart3,
  FileText,
  Heart,
  Calendar,
  MessageSquare,
  Star,
  Settings,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '@/pages/SEO';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CustomerAnalytics() {
  const { isAdmin, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>('dashboard');

  // Customer specific quick stats
  const quickStats = useMemo(() => [
    { icon: Heart, value: '24', label: 'Favori Escort', color: 'bg-red-500/10 text-red-500' },
    { icon: Calendar, value: '18', label: 'Toplam Randevu', color: 'bg-blue-500/10 text-blue-500' },
    { icon: MessageSquare, value: '156', label: 'Mesaj Trafiği', color: 'bg-purple-500/10 text-purple-500' },
    { icon: DollarSign, value: '₺12,450', label: 'Toplam Harcama', color: 'bg-green-500/10 text-green-500' },
  ], []);

  return (
    <ProtectedRoute accessLevel={isAdmin ? "admin" : "customer"}>
      <CustomerDashboardLayout>
        <SEO
          title="Analitik | Müşteri Paneli"
          description="Aktivite istatistikleri ve harcama analizlerinizi görüntüleyin."
        />

        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-orbitron text-white">Analitik</h1>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="bg-white/5 border border-white/10 mb-6">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
                <BarChart3 className="w-4 h-4 mr-2" />
                Aktivite Özeti
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
                <FileText className="w-4 h-4 mr-2" />
                Detaylı Raporlar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <AnalyticsDashboard autoRefresh={true} userRole={userRole} />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <ReportsPanel userRole={userRole} />
            </TabsContent>
          </Tabs>

          {/* Footer Info */}
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Veriler her 5 dakikada bir otomatik güncellenir</span>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-white/5">
              <Settings className="w-4 h-4 mr-2" />
              Görünüm Ayarları
            </Button>
          </div>
        </div>
      </CustomerDashboardLayout>
    </ProtectedRoute>
  );
}