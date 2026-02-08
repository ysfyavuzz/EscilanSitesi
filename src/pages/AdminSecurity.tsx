/**
 * Admin Security Page
 *
 * Güvenlik yönetimi ve logların görüntülendiği sayfa.
 *
 * @module pages/AdminSecurity
 * @category Pages - Admin
 *
 * Features:
 * - Güvenlik loglarını görüntüleme
 * - IP engelleme yönetimi
 * - Şüpheli aktivite takibi
 * - Güvenlik ayarları
 * - İki faktörlü doğrulama
 * - Otomatik güvenlik taraması
 *
 * Security Log Types:
 * - login: Giriş denemeleri
 * - blocked: Engellenen erişimler
 * - suspicious: Şüpheli aktiviteler
 * - breach: Güvenlik ihlalleri
 *
 * Severity Levels:
 * - low: Düşük riskli
 * - medium: Orta riskli
 * - high: Yüksek riskli
 *
 * @example
 * ```tsx
 * // Route: /admin/security
 * <AdminSecurity />
 * ```
 */

import * as React from 'react';
import { AdminSidebar } from '@/components/admin';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Ban, Lock, Activity } from 'lucide-react';

interface SecurityLog {
  id: string;
  type: 'login' | 'blocked' | 'suspicious' | 'breach';
  message: string;
  ip: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export default function AdminSecurity() {
  const [filter, setFilter] = React.useState<'all' | 'blocked' | 'suspicious'>('all');

  const logs: SecurityLog[] = [
    {
      id: '1',
      type: 'blocked',
      message: 'Çok fazla başarısız giriş denemesi',
      ip: '192.168.1.100',
      timestamp: '2024-01-15T10:30:00',
      severity: 'high'
    },
    {
      id: '2',
      type: 'suspicious',
      message: 'Şüpheli aktivite tespit edildi',
      ip: '10.0.0.50',
      timestamp: '2024-01-15T09:15:00',
      severity: 'medium'
    }
  ];

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.type === filter;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Güvenlik</h1>
            <p className="text-gray-500 mt-1">Güvenlik logları ve ayarları</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Güvenli</p>
                  <p className="text-2xl font-bold text-green-600">Aktif</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Ban className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Engelli IP</p>
                  <p className="text-2xl font-bold text-red-600">{logs.filter(l => l.type === 'blocked').length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Şüpheli</p>
                  <p className="text-2xl font-bold text-yellow-600">{logs.filter(l => l.type === 'suspicious').length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bugün</p>
                  <p className="text-2xl font-bold text-blue-600">{logs.length}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Security Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Güvenlik Ayarları</h3>
            <div className="space-y-4">
              {[
                { label: 'İki faktörlü doğrulama', value: true },
                { label: 'IP engelleme aktif', value: true },
                { label: 'Otomatik güvenlik taraması', value: true },
                { label: 'Şüpheli aktivite bildirimi', value: true },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                  <span className="text-gray-700">{setting.label}</span>
                  <Button size="sm" variant={setting.value ? 'default' : 'outline'}>
                    {setting.value ? 'Aktif' : 'Pasif'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Security Logs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Güvenlik Logları</h3>
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
                  variant={filter === 'blocked' ? 'default' : 'outline'}
                  onClick={() => setFilter('blocked')}
                >
                  Engelli
                </Button>
                <Button
                  size="sm"
                  variant={filter === 'suspicious' ? 'default' : 'outline'}
                  onClick={() => setFilter('suspicious')}
                >
                  Şüpheli
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    log.severity === 'high' ? 'bg-red-100' :
                    log.severity === 'medium' ? 'bg-sky-100' : 'bg-blue-100'
                  }`}>
                    {log.type === 'blocked' && <Ban className="w-5 h-5 text-red-600" />}
                    {log.type === 'suspicious' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                    {log.type === 'login' && <Lock className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{log.message}</h4>
                      <Badge variant={log.severity === 'high' ? 'destructive' : 'secondary'}>
                        {log.severity === 'high' && 'Yüksek'}
                        {log.severity === 'medium' && 'Orta'}
                        {log.severity === 'low' && 'Düşük'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">IP: {log.ip}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(log.timestamp).toLocaleString('tr-TR')}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Detay
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
