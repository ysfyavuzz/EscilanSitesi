/**
 * Admin Users Page
 *
 * Kullanıcı yönetiminin yapıldığı sayfa.
 * UserManagement component'ini kullanır.
 *
 * @module pages/AdminUsers
 * @category Pages - Admin
 *
 * Features:
 * - Müşteri ve escort listesi
 * - Kullanıcı detaylarını görüntüleme
 * - Kullanıcı düzenleme
 * - Ban/unban işlemleri
 * - Kullanıcı silme
 * - Filtreleme ve arama
 *
 * @see {@link UserManagement} Component for details
 * @example
 * ```tsx
 * // Route: /admin/users
 * <AdminUsers />
 * ```
 */

import * as React from 'react';
import { AdminSidebar } from '@/components/admin';
import { UserManagement } from '@/components/admin';

export default function AdminUsers() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <UserManagement />
      </main>
    </div>
  );
}
