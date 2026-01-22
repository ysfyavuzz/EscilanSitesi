/**
 * Admin Notifications Page
 *
 * Sistem bildirimlerinin yönetildiği sayfa.
 *
 * @module pages/AdminNotifications
 * @category Pages - Admin
 *
 * Features:
 * - Sistem bildirimlerini görüntüleme
 * - Okunmuş/okunmamış filtreleme
 * - Bildirim gönderme
 * - Bildirim silme
 * - Okundu işaretleme
 *
 * Notification Types:
 * - info: Bilgilendirme mesajları
 * - warning: Uyarılar
 * - success: Başarılı işlemler
 * - error: Hata mesajları
 *
 * @example
 * ```tsx
 * // Route: /admin/notifications
 * <AdminNotifications />
 * ```
 */

import * as React from 'react';
import { AdminSidebar } from '@/components/admin';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Send, Trash2, Check } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

export default function AdminNotifications() {
  const [filter, setFilter] = React.useState<'all' | 'unread' | 'sent'>('all');

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Sistem Bakımı',
      message: 'Sistem bakımı saat 03:00\'te yapılacaktır',
      type: 'info',
      timestamp: '2024-01-15T10:30:00',
      read: false
    },
    {
      id: '2',
      title: 'Yeni Kayıt',
      message: '5 yeni kullanıcı kaydı oldu',
      type: 'success',
      timestamp: '2024-01-15T09:15:00',
      read: true
    }
  ];

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bildirimler</h1>
              <p className="text-gray-500 mt-1">Sistem bildirimlerini yönetin</p>
            </div>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Yeni Bildirim
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Toplam</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Okunmamış</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {notifications.filter(n => !n.read).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Okunmuş</p>
                  <p className="text-2xl font-bold text-green-600">
                    {notifications.filter(n => n.read).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Send className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gönderilen</p>
                  <p className="text-2xl font-bold text-purple-600">24</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Notifications List */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Bildirimler</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                >
                  Tümü
                </Button>
                <Button
                  size="sm"
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  onClick={() => setFilter('unread')}
                >
                  Okunmamış
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-2 ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                        {!notification.read && (
                          <Badge variant="default">Yeni</Badge>
                        )}
                        <Badge
                          variant={
                            notification.type === 'error' ? 'destructive' :
                            notification.type === 'warning' ? 'secondary' :
                            notification.type === 'success' ? 'default' : 'outline'
                          }
                        >
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-gray-700">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.timestamp).toLocaleString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
