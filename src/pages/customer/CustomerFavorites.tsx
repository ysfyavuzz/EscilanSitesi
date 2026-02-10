/**
 * Customer Favorites Page
 *
 * This page displays a customer's favorited escorts.
 * It allows customers to view their favorite profiles and navigate to them.
 *
 * @module pages/customer/CustomerFavorites
 * @category Pages - Customer Dashboard
 *
 * Features:
 * - Grid display of favorited escort profiles.
 * - Quick navigation to escort profiles.
 * - Placeholder for when no favorites are added.
 *
 * @example
 * ```tsx
 * // Route: /favorites
 * // Accessible via CustomerDashboardLayout navigation
 * <CustomerFavorites />
 * ```
 */

import { useMemo } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProtectedRoute from '@/components/ProtectedRoute';
import { mockEscorts } from '@/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { CustomerDashboardLayout } from '@/components/layout/CustomerDashboardLayout';
import {
  Heart, Star, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '@/pages/SEO';

/**
 * Customer Favorites Page
 */
export default function CustomerFavorites() {
  const { isAdmin } = useAuth();

  // Mock favorite escorts
  const favorites = useMemo(() => mockEscorts.slice(0, 6), []);
  const favoritesCount = 12; // Static for now, replace with actual count later

  return (
    <ProtectedRoute accessLevel={isAdmin ? "admin" : "customer"}>
      <CustomerDashboardLayout>
        <SEO
          title="Favorilerim | Müşteri Paneli"
          description="Favori escort profillerinizi görüntüleyin ve yönetin."
        />

        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold font-orbitron text-white">Favorilerim</h1>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">Toplam {favoritesCount} favori escort</p>
            </div>

            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((escort) => (
                  <Link key={escort.id} href={`/escort/${escort.id}`}>
                    <Card className="glass overflow-hidden group hover:border-blue-500/50 transition-colors cursor-pointer">
                      <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                        <img
                          src={escort.profilePhoto || 'https://via.placeholder.com/300'}
                          alt={escort.displayName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-2 right-2">
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-semibold text-sm truncate">{escort.displayName}</h3>
                        <p className="text-xs text-muted-foreground">{escort.city}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="glass">
                <CardContent className="p-12 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-bold text-lg mb-2">Henüz favori escort yok</h3>
                  <p className="text-muted-foreground mb-4">
                    İlanları gezin ve beğendiğiniz escortları favorilerinize ekleyin!
                  </p>
                  <Link href="/escorts">
                    <Button>İlanlara Göz At</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CustomerDashboardLayout>
    </ProtectedRoute>
  );
}