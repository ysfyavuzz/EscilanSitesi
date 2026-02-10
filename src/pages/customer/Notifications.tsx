/**
 * Customer Notifications Page
 *
 * This page displays all notifications for the customer, including appointment updates,
 * messages, system alerts, and payment confirmations.
 * Wrapped in CustomerDashboardLayout for consistent navigation.
 * Uses the "Deep Space Luxury" theme with glassmorphism.
 *
 * @module pages/customer/Notifications
 * @category Pages - Customer Dashboard
 */

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Calendar,
  MessageSquare,
  CreditCard,
  CheckCheck,
  Trash2,
  Filter,
  X,
  Settings,
  Shield,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CustomerDashboardLayout } from '@/components/layout/CustomerDashboardLayout';
import { SEO } from '@/pages/SEO';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

/** Notification types */
type NotificationType = 'appointment' | 'message' | 'system' | 'payment';

/** Notification interface */
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

/** Notification type config */
const typeConfig = {
  appointment: { icon: Calendar, color: 'text-blue-500', label: 'Randevu' },
  message: { icon: MessageSquare, color: 'text-cyan-500', label: 'Mesaj' },
  system: { icon: Shield, color: 'text-purple-500', label: 'Sistem' },
  payment: { icon: CreditCard, color: 'text-green-500', label: 'Ödeme' },
};

/** Mock notifications */
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Randevu Onaylandı',
    message: 'Ayşe ile 15 Ocak 2026 tarihli randevunuz onaylandı.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isRead: false,
  },
  {
    id: '2',
    type: 'message',
    title: 'Yeni Mesaj',
    message: 'Zeynep size yeni bir mesaj gönderdi: "Detayları konuşalım mı?"',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isRead: false,
  },
  {
    id: '3',
    type: 'payment',
    title: 'Bakiye Yüklendi',
    message: 'Hesabınıza ₺1,000 başarıyla tanımlandı.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    isRead: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Güvenlik Uyarısı',
    message: 'Yeni bir cihazdan giriş yapıldı. Bu siz değilseniz şifrenizi değiştirin.',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    isRead: true,
  },
];

export default function CustomerNotifications() {
  const { isAdmin } = useAuth();
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  const filteredNotifications = React.useMemo(() => {
    return notifications.filter(n => activeFilter === 'all' || n.type === activeFilter);
  }, [notifications, activeFilter]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <ProtectedRoute accessLevel={isAdmin ? "admin" : "customer"}>
      <CustomerDashboardLayout>
        <SEO
          title="Bildirimler | Müşteri Paneli"
          description="Randevu güncellemeleri, mesajlar ve sistem uyarılarını takip edin."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-orbitron text-white">Bildirimler</h1>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead} className="glass border-white/10 hover:bg-white/5">
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Tümünü Okundu Say
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-blue-400">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-white">{notifications.length}</div>
                <div className="text-xs text-muted-foreground">Toplam</div>
              </CardContent>
            </Card>
            <Card className="glass border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-blue-500">{unreadCount}</div>
                <div className="text-xs text-muted-foreground">Okunmamış</div>
              </CardContent>
            </Card>
            <Card className="glass border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-green-500">
                  {notifications.filter(n => n.type === 'payment').length}
                </div>
                <div className="text-xs text-muted-foreground">Ödeme</div>
              </CardContent>
            </Card>
            <Card className="glass border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-cyan-500">
                  {notifications.filter(n => n.type === 'message').length}
                </div>
                <div className="text-xs text-muted-foreground">Mesaj</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['all', 'appointment', 'message', 'payment', 'system'].map((f) => (
              <Button
                key={f}
                variant={activeFilter === f ? 'default' : 'outline'}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "glass border-white/10 whitespace-nowrap",
                  activeFilter === f ? "bg-blue-600 hover:bg-blue-700 border-transparent" : "hover:bg-white/5"
                )}
              >
                {f === 'all' ? 'Tümü' : typeConfig[f as NotificationType].label}
              </Button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((n) => {
                const config = typeConfig[n.type];
                const Icon = config.icon;

                return (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card 
                      className={cn(
                        "glass border-white/10 transition-all cursor-pointer group",
                        !n.isRead && "border-l-4 border-l-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10"
                      )}
                      onClick={() => markAsRead(n.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "p-3 rounded-xl bg-white/5 border border-white/10",
                            !n.isRead && "bg-blue-500/20 border-blue-500/30"
                          )}>
                            <Icon className={cn("w-5 h-5", config.color)} />
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className={cn("font-bold text-white", !n.isRead && "text-blue-400")}>
                                {n.title}
                              </h3>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true, locale: tr })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2">{n.message}</p>
                            
                            {!n.isRead && (
                              <div className="pt-2">
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] py-0">YENİ</Badge>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-8 h-8 text-red-400 hover:bg-red-500/10"
                              onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredNotifications.length === 0 && (
              <Card className="glass border-white/10 p-12 text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Bildirim Yok</h3>
                <p className="text-muted-foreground">Şu an için görüntülenecek bildirim bulunmamaktadır.</p>
              </Card>
            )}
          </div>
        </div>
      </CustomerDashboardLayout>
    </ProtectedRoute>
  );
}