/**
 * Customer Complaints Page
 *
 * This page allows customers to view their past complaints and submit new ones.
 * Wrapped in CustomerDashboardLayout for consistent navigation.
 *
 * @module pages/customer/CustomerComplaints
 * @category Pages - Customer Dashboard
 */

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  AlertCircle,
  CheckCircle2,
  Upload,
  X,
  FileText,
  User,
  AlertTriangle,
  Shield,
  FileWarning,
  Clock,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { CustomerDashboardLayout } from '@/components/layout/CustomerDashboardLayout';
import { SEO } from '@/pages/SEO';
import ProtectedRoute from '@/components/ProtectedRoute';

/**
 * Complaint types
 */
type ComplaintType = 'escort_behavior' | 'payment_issue' | 'technical' | 'security' | 'other';

/**
 * Priority levels
 */
type Priority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Complaint status
 */
type ComplaintStatus = 'pending' | 'in_review' | 'resolved' | 'rejected';

/**
 * Form data interface
 */
interface ComplaintFormData {
  type: ComplaintType;
  reportedUserId: string;
  description: string;
  files: File[];
  isAnonymous: boolean;
  priority: Priority;
}

/**
 * Uploaded file interface
 */
interface UploadedFile {
  file: File;
  preview: string;
}

/**
 * Mock past complaints
 */
const mockPastComplaints = [
  {
    id: 'C-123456',
    type: 'escort_behavior' as ComplaintType,
    status: 'resolved' as ComplaintStatus,
    date: '2026-01-15',
    description: 'Randevuya vaktinde gelinmedi ve iletişim kurulamadı.',
    priority: 'medium' as Priority,
    trackingNumber: 'SK-2026-001',
  },
  {
    id: 'C-789012',
    type: 'technical' as ComplaintType,
    status: 'pending' as ComplaintStatus,
    date: '2026-02-01',
    description: 'Ödeme sırasında hata aldım ancak bakiye düştü.',
    priority: 'high' as Priority,
    trackingNumber: 'SK-2026-042',
  }
];

export default function CustomerComplaints() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list');
  const [formData, setFormData] = useState<ComplaintFormData>({
    type: 'escort_behavior',
    reportedUserId: '',
    description: '',
    files: [],
    isAnonymous: false,
    priority: 'medium',
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  /**
   * Status badge component
   */
  const StatusBadge = ({ status }: { status: ComplaintStatus }) => {
    const config = {
      pending: { label: 'Bekliyor', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
      in_review: { label: 'İnceleniyor', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
      resolved: { label: 'Çözüldü', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
      rejected: { label: 'Reddedildi', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    };
    const { label, color } = config[status];
    return <Badge className={`${color} border`}>{label}</Badge>;
  };

  /**
   * Priority badge component
   */
  const PriorityBadge = ({ priority }: { priority: Priority }) => {
    const config = {
      low: { label: 'Düşük', color: 'text-blue-400' },
      medium: { label: 'Orta', color: 'text-yellow-400' },
      high: { label: 'Yüksek', color: 'text-orange-400' },
      urgent: { label: 'Acil', color: 'text-red-400' },
    };
    const { label, color } = config[priority];
    return <span className={`text-xs font-medium ${color}`}>{label}</span>;
  };

  /**
   * Form field change handler
   */
  const handleChange = (field: keyof ComplaintFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * File upload handler
   */
  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 3 - uploadedFiles.length);
    const newUploadedFiles: UploadedFile[] = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedFiles(prev => [...prev, ...newUploadedFiles].slice(0, 3));
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles].slice(0, 3),
    }));
  }, [uploadedFiles.length]);

  /**
   * Submit handler
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const tracking = `SK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setTrackingNumber(tracking);
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <ProtectedRoute accessLevel={isAdmin ? "admin" : "customer"}>
      <CustomerDashboardLayout>
        <SEO
          title="Şikayetlerim | Müşteri Paneli"
          description="Şikayetlerinizi bildirin ve durumlarını takip edin."
        />

        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-orbitron text-white">Şikayetlerim</h1>
            {activeTab === 'list' && (
              <Button onClick={() => setActiveTab('new')} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Şikayet
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="bg-white/5 border border-white/10 mb-6">
              <TabsTrigger value="list" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
                <FileText className="w-4 h-4 mr-2" />
                Geçmiş Şikayetler
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Yeni Şikayet Bildir
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {mockPastComplaints.length > 0 ? (
                <div className="grid gap-4">
                  {mockPastComplaints.map((complaint) => (
                    <Card key={complaint.id} className="glass border-white/10 hover:border-blue-500/30 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-blue-400">{complaint.trackingNumber}</span>
                              <StatusBadge status={complaint.status} />
                              <PriorityBadge priority={complaint.priority} />
                            </div>
                            <h4 className="font-bold text-lg text-white">
                              {complaint.type === 'escort_behavior' ? 'Escort Davranışı' : 
                               complaint.type === 'payment_issue' ? 'Ödeme Sorunu' :
                               complaint.type === 'technical' ? 'Teknik Sorun' : 'Diğer'}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">{complaint.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(complaint.date).toLocaleDateString('tr-TR')}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                            Detaylar <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="glass border-white/10 p-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Harika! Hiç şikayetiniz yok.</h3>
                  <p className="text-muted-foreground">Platformumuzda her şeyin yolunda gitmesine sevindik.</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="new">
              {isSuccess ? (
                <Card className="glass border-white/10 p-12 text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Şikayetiniz Alındı</h2>
                  <p className="text-muted-foreground mb-6">Şikayetiniz başarıyla kaydedildi. En kısa sürede incelenecektir.</p>
                  <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-6 py-4 rounded-xl mb-6">
                    <p className="text-xs text-blue-400 mb-1">Takip Numaranız</p>
                    <p className="text-2xl font-mono font-bold text-white">{trackingNumber}</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button onClick={() => { setIsSuccess(false); setActiveTab('list'); }} variant="outline" className="glass border-white/10">
                      Şikayetlerime Dön
                    </Button>
                    <Button onClick={() => setIsSuccess(false)} className="bg-blue-600 hover:bg-blue-700">
                      Yeni Şikayet Oluştur
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle>Şikayet Formu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Şikayet Türü</label>
                          <select 
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.type}
                            onChange={(e) => handleChange('type', e.target.value)}
                          >
                            <option value="escort_behavior" className="bg-[#0a0a0f]">Escort Davranışı</option>
                            <option value="payment_issue" className="bg-[#0a0a0f]">Ödeme Sorunu</option>
                            <option value="technical" className="bg-[#0a0a0f]">Teknik Sorun</option>
                            <option value="security" className="bg-[#0a0a0f]">Güvenlik</option>
                            <option value="other" className="bg-[#0a0a0f]">Diğer</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Öncelik</label>
                          <div className="flex gap-2">
                            {['low', 'medium', 'high', 'urgent'].map((p) => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => handleChange('priority', p)}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                                  formData.priority === p 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                }`}
                              >
                                {p.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Detaylı Açıklama</label>
                        <textarea
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Yaşadığınız sorunu detaylıca anlatın..."
                          value={formData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Kanıt Yükleme (Maks 3 Dosya)</label>
                        <div 
                          className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors cursor-pointer bg-white/5"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e.target.files)}
                          />
                          <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-400">Dosyaları sürükleyin veya tıklayın</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG (Maks 5MB)</p>
                        </div>
                        {uploadedFiles.length > 0 && (
                          <div className="flex gap-3 mt-4">
                            {uploadedFiles.map((file, i) => (
                              <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/20">
                                <img src={file.preview} className="w-full h-full object-cover" />
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setUploadedFiles(prev => prev.filter((_, idx) => idx !== i)); }}
                                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <Shield className="w-5 h-5 text-blue-400 shrink-0" />
                        <p className="text-xs text-blue-200">
                          Şikayetiniz güvenli bir şekilde iletilecek ve moderatör ekibimiz tarafından incelenecektir. 
                          Platform kurallarına aykırı durumlar için hızlı işlem yapılmaktadır.
                        </p>
                      </div>

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-bold"
                          disabled={isSubmitting || formData.description.length < 10}
                        >
                          {isSubmitting ? 'İletiliyor...' : 'Şikayeti İlet'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CustomerDashboardLayout>
    </ProtectedRoute>
  );
}