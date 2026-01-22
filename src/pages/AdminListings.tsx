/**
 * Admin Listings Page
 *
 * İlan yönetimi ve onay işlemlerinin yapıldığı sayfa.
 * ListingManagement component'ini kullanır.
 *
 * @module pages/AdminListings
 * @category Pages - Admin
 *
 * Features:
 * - Bekleyen ilanları görüntüleme
 * - İlan onaylama/reddetme
 * - İlan detaylarını düzenleme
 * - Gelişmiş filtreleme (şehir, boy, kilo)
 * - Toplu işlemler
 *
 * @see {@link ListingManagement} Component for details
 * @example
 * ```tsx
 * // Route: /admin/listings
 * <AdminListings />
 * ```
 */

import * as React from 'react';
import { AdminSidebar } from '@/components/admin';
import { ListingManagement } from '@/components/admin';
import { Card } from '@/components/ui/card';

export default function AdminListings() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <ListingManagement />
      </main>
    </div>
  );
}
