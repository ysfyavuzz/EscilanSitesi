/**
 * Customer Reviews Page
 *
 * This page displays reviews written by the customer and allows managing them.
 * Wrapped in CustomerDashboardLayout for consistent navigation.
 *
 * @module pages/customer/CustomerReviews
 * @category Pages - Customer Dashboard
 */

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReviewsPanel } from '@/components/ReviewsPanel';
import { useReviews } from '@/hooks/useReviews';
import { useAuth } from '@/contexts/AuthContext';
import { CustomerDashboardLayout } from '@/components/layout/CustomerDashboardLayout';
import {
  Star,
  Shield,
  TrendingUp,
  Award,
  MessageSquare,
  ThumbsUp,
  Heart,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '@/pages/SEO';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CustomerReviews() {
  const { isAdmin, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'written' | 'all'>('written');

  const {
    reviews,
    stats,
    isLoading,
    loadMoreReviews,
    setFilters,
    sortReviews,
  } = useReviews({
    autoRefresh: false,
  });

  // Mock quick stats for customer
  const quickStats = useMemo(() => [
    { icon: Star, value: '12', label: 'Yazılan Değerlendirme', color: 'bg-yellow-500/10 text-yellow-500' },
    { icon: ThumbsUp, value: '45', label: 'Faydalı Oy', color: 'bg-green-500/10 text-green-500' },
    { icon: Award, value: '8', label: 'VIP Değerlendirme', color: 'bg-blue-500/10 text-blue-500' },
    { icon: Heart, value: '24', label: 'Toplam Puan', color: 'bg-red-500/10 text-red-500' },
  ], []);

  return (
    <ProtectedRoute accessLevel={isAdmin ? "admin" : "customer"}>
      <CustomerDashboardLayout>
        <SEO
          title="Değerlendirmelerim | Müşteri Paneli"
          description="Yazdığınız tüm değerlendirmeleri ve aldıkları etkileşimleri görüntüleyin."
        />

        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-orbitron text-white">Değerlendirmelerim</h1>
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

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="written" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
                <Star className="w-4 h-4 mr-2" />
                Yazdığım Değerlendirmeler
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
                <MessageSquare className="w-4 h-4 mr-2" />
                Sistem Geneli
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Reviews List */}
          <Card className="glass border-white/10 overflow-hidden">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-xl">Değerlendirme Geçmişi</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ReviewsPanel
                reviews={reviews}
                stats={stats}
                isLoading={isLoading}
                hasMore={false}
                onLoadMore={loadMoreReviews}
                onFilter={setFilters}
                onSort={sortReviews}
                userRole={userRole}
                className="bg-transparent"
              />
            </CardContent>
          </Card>
        </div>
      </CustomerDashboardLayout>
    </ProtectedRoute>
  );
}