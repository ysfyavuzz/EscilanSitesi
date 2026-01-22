/**
 * Admin Media Page
 *
 * Medya yönetimi ve moderasyon işlemlerinin yapıldığı sayfa.
 * MediaModeration component'ini kullanır.
 *
 * @module pages/AdminMedia
 * @category Pages - Admin
 *
 * Features:
 * - Fotoğraf inceleme ve onaylama
 * - Video moderasyonu
 * - Uygunsuz içerik tespiti
 * - Toplu onay/reddetme
 * - Medya raporları
 *
 * @see {@link MediaModeration} Component for details
 * @example
 * ```tsx
 * // Route: /admin/media
 * <AdminMedia />
 * ```
 */

import * as React from 'react';
import { AdminSidebar } from '@/components/admin';
import { MediaModeration } from '@/components/admin';

export default function AdminMedia() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <MediaModeration />
      </main>
    </div>
  );
}
