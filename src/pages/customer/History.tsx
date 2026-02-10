/**
 * Customer History Page
 *
 * This page displays the customer's past appointments and activity history.
 * Wrapped in CustomerDashboardLayout for consistent navigation.
 * Uses the "Deep Space Luxury" theme with glassmorphism.
 *
 * @module pages/customer/History
 * @category Pages - Customer Dashboard
 */

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Star,
  FileText,
  RotateCcw,
  X,
  Search,
  Filter,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CustomerDashboardLayout } from '@/components/layout/CustomerDashboardLayout';
import { SEO } from '@/pages/SEO';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

/** Appointment status config */
const statusConfig = {
  completed: { color: 'bg-green-500/10 text-green-400 border-green-500/20', label: 'Tamamlandı', icon: CheckCircle },
  cancelled: { color: 'bg-red-500/10 text-red-400 border-red-500/20', label: 'İptal Edildi', icon: XCircle },
  pending: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', label: 'Bekliyor', icon: AlertCircle },
  confirmed: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', label: 'Onaylandı', icon: CheckCircle },
};

/** Mock history data */
const mockHistory = [
  {
    id: 'apt-001',
    escortName: 'Ayşe Yılmaz',
    serviceType: 'VIP Randevu',
    date: '2025-01-15',
    time: '14:00',
    price: 1500,
    status: 'completed' as const,
    location: 'Beşiktaş, İstanbul',
  },
  {
    id: 'apt-002',
    escortName: 'Elif Demir',
    serviceType: 'Standart Randevu',
    date: '2025-01-12',
    time: '18:00',
    price: 800,
    status: 'completed' as const,
    location: 'Etiler, İstanbul',
  },
  {
    id: 'apt-003',
    escortName: 'Zeynep Kara',
    serviceType: 'Premium Randevu',
    date: '2025-01-08',
    time: '20:00',
    price: 2500,
    status: 'cancelled' as const,
    location: 'Şişli, İstanbul',
  },
];

export default function CustomerHistory() {
  const { isAdmin } = useAuth();
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredHistory = useMemo(() => {
    return mockHistory.filter(item => {
      const matchesFilter = activeFilter === 'all' || item.status === activeFilter;
      const matchesSearch = item.escortName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <ProtectedRoute accessLevel={isAdmin ? "admin" : "customer"}>
      <CustomerDashboardLayout>
        <SEO
          title="İşlem Geçmişi | Müşteri Paneli"
          description="Geçmiş randevularınızı ve platform aktivitelerinizi inceleyin."
        />

        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-orbitron text-white">İşlem Geçmişi</h1>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <Calendar className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">{mockHistory.length}</div>
                    <div className="text-sm text-muted-foreground">Toplam Randevu</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">
                      {mockHistory.filter(i => i.status === 'completed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Tamamlanan</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <DollarSign className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">₺4,800</div>
                    <div className="text-sm text-muted-foreground">Toplam Harcama</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Escort adı veya hizmet ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-white/10 text-white"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'completed', 'cancelled'].map((f) => (
                <Button
                  key={f}
                  variant={activeFilter === f ? 'default' : 'outline'}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "glass border-white/10",
                    activeFilter === f ? "bg-blue-600 hover:bg-blue-700 border-transparent" : "hover:bg-white/5"
                  )}
                >
                  {f === 'all' ? 'Tümü' : f === 'completed' ? 'Tamamlanan' : 'İptal Edilen'}
                </Button>
              ))}
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass border-white/10 hover:border-blue-500/30 transition-all group">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center font-bold text-lg border border-white/10">
                          {item.escortName[0]}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-white text-lg">{item.escortName}</h3>
                          <p className="text-sm text-blue-400">{item.serviceType}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(item.date).toLocaleDateString('tr-TR')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={cn("border", statusConfig[item.status].color)}>
                            {statusConfig[item.status].label}
                          </Badge>
                          <div className="text-xl font-black text-white">
                            ₺{item.price.toLocaleString('tr-TR')}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-400/10">
                            <FileText className="w-4 h-4 mr-1" /> Fatura
                          </Button>
                          <Button size="sm" variant="ghost" className="text-cyan-400 hover:bg-cyan-400/10">
                            <RotateCcw className="w-4 h-4 mr-1" /> Tekrarla
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {filteredHistory.length === 0 && (
              <Card className="glass border-white/10 p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">İşlem Bulunamadı</h3>
                <p className="text-muted-foreground">Arama kriterlerinize uygun işlem geçmişi bulunmamaktadır.</p>
              </Card>
            )}
          </div>
        </div>
      </CustomerDashboardLayout>
    </ProtectedRoute>
  );
}

// Ensure useMemo is imported
import { useMemo } from 'react';