/**
 * Settings Page - Universal Redirect
 *
 * Kullanıcının rolüne göre doğru ayarlar sayfasına yönlendirir.
 * Admin → /admin/settings
 * Customer → /customer/settings
 * Escort → /escort/profile/edit
 *
 * @page
 * @category Settings
 */

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FullPageLoading } from '@/components/LoadingStates';

export default function Settings() {
  const { user, isLoading, isAdmin, isEscort } = useAuth();

  useEffect(() => {
    // Yüklenme devam ediyorsa bekle
    if (isLoading) return;

    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    if (!user) {
      window.location.href = '/login';
      return;
    }

    // Rol bazlı yönlendirme
    if (isAdmin) {
      window.location.href = '/admin/settings';
    } else if (isEscort) {
      window.location.href = '/escort/profile/edit';
    } else {
      // Customer ve diğer kullanıcılar
      window.location.href = '/customer/settings';
    }
  }, [user, isLoading, isAdmin, isEscort]);

  // Yüklenme sırasında gösterilecek UI
  return <FullPageLoading message="Ayarlar sayfasına yönlendiriliyor..." />;
}
