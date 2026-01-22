/**
 * Admin Financial Page
 *
 * Finansal raporların ve gelir yönetiminin yapıldığı sayfa.
 * FinancialReports component'ini kullanır.
 *
 * @module pages/AdminFinancial
 * @category Pages - Admin
 *
 * Features:
 * - Gelir raporları
 * - Gider takibi
 * - Ödeme geçmişi
 * - Faturalandırma yönetimi
 * - Finansal özetler
 *
 * @see {@link FinancialReports} Component for details
 * @example
 * ```tsx
 * // Route: /admin/financial
 * <AdminFinancial />
 * ```
 */

import * as React from 'react';
import { AdminSidebar } from '@/components/admin';
import { FinancialReports } from '@/components/admin';

export default function AdminFinancial() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <FinancialReports />
      </main>
    </div>
  );
}
