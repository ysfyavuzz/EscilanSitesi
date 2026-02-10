/**
 * Customer Settings Page
 *
 * This page allows customers to manage their profile, preferences, notifications, and security.
 * Wrapped in CustomerDashboardLayout for consistent navigation.
 *
 * @module pages/customer/CustomerSettings
 * @category Pages - Customer Dashboard
 */

import * as React from 'react';
import { User, Mail, Phone, MapPin, Bell, Shield, Trash2, Camera, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { CustomerDashboardLayout } from '@/components/layout/CustomerDashboardLayout';
import { SEO } from '@/pages/SEO';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

export default function CustomerSettings() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = React.useState('profile');

  return (
    <ProtectedRoute accessLevel={isAdmin ? "admin" : "customer"}>
      <CustomerDashboardLayout>
        <SEO
          title="Ayarlar | Müşteri Paneli"
          description="Hesap ayarlarınızı, tercihlerinizi ve güvenliğinizi yönetin."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-orbitron text-white">Hesap Ayarları</h1>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <TabsList className="flex flex-col h-auto bg-white/5 border border-white/10 p-2 space-y-1">
                  {[
                    { id: 'profile', label: 'Profil', icon: User },
                    { id: 'preferences', label: 'Tercihler', icon: MapPin },
                    { id: 'notifications', label: 'Bildirimler', icon: Bell },
                    { id: 'security', label: 'Güvenlik', icon: Shield },
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 transition-all"
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-3">
                <Card className="glass border-white/10">
                  <CardContent className="p-6">
                    <TabsContent value="profile" className="mt-0 space-y-6">
                      <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                        <div className="relative group">
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/20 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                              <Camera className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Profil Fotoğrafı</h3>
                          <p className="text-sm text-muted-foreground mb-3">Görünürlüğünüzü artırmak için bir fotoğraf ekleyin.</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="glass border-white/10 hover:bg-white/5">Yükle</Button>
                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">Kaldır</Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-gray-300">Kullanıcı Adı</Label>
                          <Input className="glass border-white/10 text-white" defaultValue="yusuf_yazici" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Ad Soyad</Label>
                          <Input className="glass border-white/10 text-white" defaultValue="Yusuf Yazıcı" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">E-posta</Label>
                          <div className="flex gap-2">
                            <Input className="glass border-white/10 text-white flex-1" defaultValue="yusuf@example.com" />
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Doğrulandı</Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Telefon</Label>
                          <Input className="glass border-white/10 text-white" defaultValue="+90 555 123 4567" />
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end gap-3">
                        <Button variant="outline" className="glass border-white/10">İptal</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">Kaydet</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="preferences" className="mt-0 space-y-6">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <Label className="text-lg font-bold text-white">Bölgesel Tercihler</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-gray-400 text-xs">Şehir</Label>
                              <select className="w-full glass border-white/10 rounded-lg px-4 py-2 text-white bg-transparent outline-none">
                                <option className="bg-[#0a0a0f]">İstanbul</option>
                                <option className="bg-[#0a0a0f]">Ankara</option>
                                <option className="bg-[#0a0a0f]">İzmir</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-gray-400 text-xs">Dil</Label>
                              <select className="w-full glass border-white/10 rounded-lg px-4 py-2 text-white bg-transparent outline-none">
                                <option className="bg-[#0a0a0f]">Türkçe</option>
                                <option className="bg-[#0a0a0f]">English</option>
                                <option className="bg-[#0a0a0f]">Pусский</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-lg font-bold text-white">Görünüm</Label>
                          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div>
                              <p className="font-medium text-white">Gece Modu</p>
                              <p className="text-xs text-muted-foreground text-blue-400">Deep Space teması şu an aktif.</p>
                            </div>
                            <Switch checked />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="notifications" className="mt-0 space-y-4">
                      {[
                        { id: 'msg', title: 'Yeni Mesajlar', desc: 'Bir escorttan mesaj geldiğinde bildirim al.' },
                        { id: 'app', title: 'Randevu Hatırlatıcıları', desc: 'Randevunuza 2 saat kala SMS ve push bildirimi al.' },
                        { id: 'prom', title: 'Kampanyalar', desc: 'Özel indirimler ve VIP tekliflerden haberdar ol.' },
                      ].map((n) => (
                        <div key={n.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                          <div className="flex-1 pr-4">
                            <p className="font-medium text-white">{n.title}</p>
                            <p className="text-xs text-muted-foreground">{n.desc}</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="security" className="mt-0 space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-gray-300">Mevcut Şifre</Label>
                          <Input type="password" className="glass border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Yeni Şifre</Label>
                          <Input type="password" className="glass border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Yeni Şifre Tekrar</Label>
                          <Input type="password" className="glass border-white/10 text-white" />
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">Şifreyi Güncelle</Button>
                      </div>

                      <div className="pt-6 border-t border-white/10">
                        <h4 className="text-red-500 font-bold mb-2">Tehlikeli Bölge</h4>
                        <p className="text-xs text-muted-foreground mb-4">Hesabınızı silmek geri alınamaz bir işlemdir. Tüm verileriniz kalıcı olarak silinecektir.</p>
                        <Button variant="outline" className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hesabı Kalıcı Olarak Sil
                        </Button>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </CustomerDashboardLayout>
    </ProtectedRoute>
  );
}