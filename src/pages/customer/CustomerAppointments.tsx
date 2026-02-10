/**
 * Customer Appointments Page
 *
 * This page displays a customer's upcoming, completed, and cancelled appointments.
 * It provides details for each appointment and allows for actions like messaging or cancelling.
 *
 * @module pages/customer/CustomerAppointments
 * @category Pages - Customer Dashboard
 *
 * Features:
 * - Overview of appointment statistics (upcoming, completed, total spent)
 * - Detailed list of all appointments with status, date, time, location, service, and price
 * - Actions for each appointment: message, call, cancel (for upcoming), review (for completed)
 *
 * @example
 * ```tsx
 * // Route: /appointments
 * // Accessible via CustomerDashboardLayout navigation
 * <CustomerAppointments />
 * ```
 */

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProtectedRoute from '@/components/ProtectedRoute';
import { mockEscorts } from '@/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { CustomerDashboardLayout } from '@/components/layout/CustomerDashboardLayout';
import {
  Calendar, MessageCircle, Clock, CheckCircle2, XCircle,
  MapPin, DollarSign, Star
} from 'lucide-react';
import { SEO } from '@/pages/SEO';

/**
 * Appointment status
 */
type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled' | 'pending';

/**
 * Mock appointment data
 */
const mockAppointments = [
  {
    id: '1',
    escortId: '1',
    escortName: 'Ayşe Y.',
    escortPhoto: mockEscorts[0]?.profilePhoto,
    date: '2026-01-25',
    time: '19:00',
    status: 'upcoming' as AppointmentStatus,
    service: 'Akşam Yemeği',
    location: 'İstanbul, Beşiktaş',
    price: 1500,
  },
  {
    id: '2',
    escortId: '3',
    escortName: 'Zeynep K.',
    escortPhoto: mockEscorts[2]?.profilePhoto,
    date: '2026-01-20',
    time: '20:00',
    status: 'completed' as AppointmentStatus,
    service: 'Etkinlik Eşliği',
    location: 'İstanbul, Kadıköy',
    price: 2000,
  },
  {
    id: '3',
    escortId: '5',
    escortName: 'Elif S.',
    escortPhoto: mockEscorts[4]?.profilePhoto,
    date: '2026-01-22',
    time: '18:00',
    status: 'upcoming' as AppointmentStatus,
    service: 'Özel Davet',
    location: 'İstanbul, Şişli',
    price: 3000,
  },
];

/**
 * Status badge component
 */
function StatusBadge({ status }: { status: AppointmentStatus }) {
  const config = {
    upcoming: { label: 'Gelecek', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
    completed: { label: 'Tamamlandı', color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20' },
    cancelled: { label: 'İptal', color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20' },
    pending: { label: 'Bekliyor', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
  };

  const { label, color } = config[status];

  return (
    <Badge className={color}>
      {label}
    </Badge>
  );
}

/**
 * Customer Appointments Page
 */
export default function CustomerAppointments() {
  const { isAdmin } = useAuth();

  // Dashboard stats (only relevant ones for this page)
  const stats = useMemo(() => ({
    upcomingAppointments: mockAppointments.filter(a => a.status === 'upcoming').length,
    totalBookings: mockAppointments.length,
    totalSpent: mockAppointments.reduce((sum, a) => sum + a.price, 0),
  }), []);

  return (
    <ProtectedRoute accessLevel={isAdmin ? "admin" : "customer"}>
      <CustomerDashboardLayout>
        <SEO
          title="Randevularım | Müşteri Paneli"
          description="Yaklaşan, tamamlanan ve iptal edilen randevularınızı görüntüleyin."
        />

        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold font-orbitron text-white">Randevularım</h1>

          {/* Appointment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.upcomingAppointments}</p>
                <p className="text-sm text-muted-foreground">Gelecek Randevu</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-green-600">{stats.totalBookings - stats.upcomingAppointments}</p>
                <p className="text-sm text-muted-foreground">Tamamlanan</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-blue-600">₺{stats.totalSpent.toLocaleString('tr-TR')}</p>
                <p className="text-sm text-muted-foreground">Toplam Harcama</p>
              </CardContent>
            </Card>
          </div>

          {/* All Appointments */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Tüm Randevular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex-shrink-0">
                      <img
                        src={appointment.escortPhoto}
                        alt={appointment.escortName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-lg">{appointment.escortName}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                        </div>
                        <StatusBadge status={appointment.status} />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>

                      {appointment.price && (
                        <div className="flex items-center gap-2 mb-3">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold">₺{appointment.price.toLocaleString('tr-TR')}</span>
                        </div>
                      )}

                      <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant="outline" className="flex-grow sm:flex-grow-0">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Mesaj
                        </Button>
                        {appointment.status === 'upcoming' && (
                          <Button size="sm" variant="outline" className="text-red-600 flex-grow sm:flex-grow-0">
                            <XCircle className="w-4 h-4 mr-1" />
                            İptal
                          </Button>
                        )}
                        {appointment.status === 'completed' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-grow sm:flex-grow-0">
                            <Star className="w-4 h-4 mr-1" />
                            Değerlendir
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CustomerDashboardLayout>
    </ProtectedRoute>
  );
}