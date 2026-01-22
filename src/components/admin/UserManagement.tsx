/**
 * UserManagement Component
 *
 * User CRUD interface for managing customers and escorts.
 * Allows viewing, editing, suspending, and deleting users.
 * Features separate tabs for escorts and customers.
 *
 * @component
 * @category Admin
 */

import * as React from 'react';
import {
  Search, Filter, MoreVertical, Ban, CheckCircle, Mail, Phone, Edit, Trash2,
  Users, UserCircle, Crown, Shield, Eye, X, Save, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { mockCustomers, type Customer } from '@/data/mockData/customers';
import { mockEscorts, type EscortProfile } from '@/data/mockData/escorts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';

type TabType = 'customers' | 'escorts';
type UserStatus = 'all' | 'active' | 'suspended' | 'pending';

interface UserAction {
  type: 'edit' | 'delete' | 'ban' | 'unban' | 'view';
  user: any;
  userType: 'customer' | 'escort';
}

export function UserManagement() {
  const [activeTab, setActiveTab] = React.useState<TabType>('customers');
  const [status, setStatus] = React.useState<UserStatus>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedAction, setSelectedAction] = React.useState<UserAction | null>(null);
  const [editForm, setEditForm] = React.useState<any>({});
  const [banReason, setBanReason] = React.useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [showBanDialog, setShowBanDialog] = React.useState(false);
  const [showViewDialog, setShowViewDialog] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState<any>(null);
  const [userToBan, setUserToBan] = React.useState<any>(null);

  // Mock users state (gerçek API ile değiştirilecek)
  const [customers, setCustomers] = React.useState(mockCustomers);
  const [escorts, setEscorts] = React.useState(mockEscorts);

  // Get current tab users
  const currentUsers = React.useMemo(() => {
    if (activeTab === 'customers') {
      return customers.map(customer => ({ type: 'customer' as const, data: customer }));
    } else {
      return escorts.map(escort => ({ type: 'escort' as const, data: escort }));
    }
  }, [activeTab, customers, escorts]);

  // Filter users
  const filteredUsers = React.useMemo(() => {
    return currentUsers.filter(user => {
      const searchLower = searchQuery.toLowerCase();

      if (user.type === 'customer') {
        const customer = user.data as Customer;
        const matchesSearch =
          customer.username.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.fullName?.toLowerCase().includes(searchLower);

        const matchesStatus = status === 'all' ||
          (status === 'active' && customer.isVerified) ||
          (status === 'suspended' && !customer.isVerified);

        return matchesSearch && matchesStatus;
      } else {
        const escort = user.data as EscortProfile;
        const matchesSearch =
          escort.displayName.toLowerCase().includes(searchLower) ||
          escort.city.toLowerCase().includes(searchLower);

        const matchesStatus = status === 'all' ||
          (status === 'active' && escort.verificationStatus === 'verified') ||
          (status === 'suspended' && escort.verificationStatus === 'rejected') ||
          (status === 'pending' && escort.verificationStatus === 'pending');

        return matchesSearch && matchesStatus;
      }
    });
  }, [currentUsers, searchQuery, status]);

  // Handle actions
  const handleEdit = (user: any, userType: 'customer' | 'escort') => {
    setSelectedAction({ type: 'edit', user, userType });
    setEditForm(user);
    setShowViewDialog(false);
    setShowBanDialog(false);
  };

  const handleDelete = (user: any, userType: 'customer' | 'escort') => {
    setUserToDelete({ user, userType });
    setShowDeleteConfirm(true);
  };

  const handleBan = (user: any, userType: 'customer' | 'escort') => {
    setUserToBan({ user, userType });
    setBanReason('');
    setShowBanDialog(true);
  };

  const handleView = (user: any, userType: 'customer' | 'escort') => {
    setSelectedAction({ type: 'view', user, userType });
    setEditForm(user);
    setShowViewDialog(true);
  };

  // Execute actions
  const confirmDelete = () => {
    if (userToDelete) {
      if (userToDelete.userType === 'customer') {
        setCustomers(prev => prev.filter(c => c.id !== userToDelete.user.id));
      } else {
        setEscorts(prev => prev.filter(e => e.id !== userToDelete.user.id));
      }
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  const confirmBan = () => {
    if (userToBan) {
      if (userToBan.userType === 'customer') {
        setCustomers(prev => prev.map(c =>
          c.id === userToBan.user.id
            ? { ...c, isVerified: false, banReason }
            : c
        ));
      } else {
        setEscorts(prev => prev.map(e =>
          e.id === userToBan.user.id
            ? { ...e, verificationStatus: 'rejected' as const, banReason }
            : e
        ));
      }
      setShowBanDialog(false);
      setUserToBan(null);
      setBanReason('');
    }
  };

  const saveEdit = () => {
    if (selectedAction?.type === 'edit') {
      if (selectedAction.userType === 'customer') {
        setCustomers(prev => prev.map(c =>
          c.id === selectedAction.user.id ? { ...c, ...editForm } : c
        ));
      } else {
        setEscorts(prev => prev.map(e =>
          e.id === selectedAction.user.id ? { ...e, ...editForm } : e
        ));
      }
      setShowViewDialog(false);
      setSelectedAction(null);
    }
  };

  const toggleBan = (user: any, userType: 'customer' | 'escort') => {
    const isBanned = userType === 'customer'
      ? !user.isVerified
      : user.verificationStatus === 'rejected';

    if (isBanned) {
      // Unban
      if (userType === 'customer') {
        setCustomers(prev => prev.map(c =>
          c.id === user.id ? { ...c, isVerified: true, banReason: undefined } : c
        ));
      } else {
        setEscorts(prev => prev.map(e =>
          e.id === user.id ? { ...e, verificationStatus: 'verified' as const, banReason: undefined } : e
        ));
      }
    } else {
      handleBan(user, userType);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
          <p className="text-gray-500 mt-1">Tüm kullanıcıları yönetin</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700">
          <Users className="w-4 h-4 mr-2" />
          Yeni Kullanıcı Ekle
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-1.5 inline-flex gap-1.5">
        <button
          onClick={() => setActiveTab('customers')}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200',
            activeTab === 'customers'
              ? 'bg-pink-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <UserCircle className="w-5 h-5" />
          <span>Müşteriler</span>
          <Badge
            variant={activeTab === 'customers' ? 'secondary' : 'outline'}
            className={cn(
              'ml-1',
              activeTab === 'customers' ? 'bg-white/20 text-white' : ''
            )}
          >
            {customers.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab('escorts')}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200',
            activeTab === 'escorts'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <Crown className="w-5 h-5" />
          <span>Eskortlar</span>
          <Badge
            variant={activeTab === 'escorts' ? 'secondary' : 'outline'}
            className={cn(
              'ml-1',
              activeTab === 'escorts' ? 'bg-white/20 text-white' : ''
            )}
          >
            {escorts.length}
          </Badge>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={activeTab === 'customers' ? 'Müşteri ara...' : 'Eskort ara...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as UserStatus)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="suspended">Askıya Alınmış</option>
            {activeTab === 'escorts' && <option value="pending">Beklemede</option>}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">
            {activeTab === 'customers' ? 'Toplam Müşteri' : 'Toplam Eskort'}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {activeTab === 'customers' ? customers.length : escorts.length}
          </p>
        </Card>
        <Card className="p-6 border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Aktif</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {activeTab === 'customers'
              ? customers.filter(c => c.isVerified).length
              : escorts.filter(e => e.verificationStatus === 'verified').length
            }
          </p>
        </Card>
        <Card className="p-6 border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">
            {activeTab === 'customers' ? 'Doğrulanmamış' : 'Beklemede'}
          </p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {activeTab === 'customers'
              ? customers.filter(c => !c.isVerified).length
              : escorts.filter(e => e.verificationStatus === 'pending').length
            }
          </p>
        </Card>
        <Card className="p-6 border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">
            {activeTab === 'customers' ? 'Askıya Alınmış' : 'Reddedilmiş'}
          </p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {activeTab === 'customers'
              ? 0
              : escorts.filter(e => e.verificationStatus === 'rejected').length
            }
          </p>
        </Card>
      </div>

      {/* User List */}
      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'customers' ? 'Müşteri' : 'Eskort'}
                </th>
                {activeTab === 'customers' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İletişim
                  </th>
                )}
                {activeTab === 'escorts' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Konum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fiyat
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kayıt Tarihi
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => {
                const isCustomer = user.type === 'customer';
                const userData = user.data;
                const isBanned = isCustomer
                  ? !(userData as Customer).isVerified
                  : (userData as EscortProfile).verificationStatus === 'rejected';

                return (
                  <tr key={`${user.type}-${index}`} className="hover:bg-gray-50">
                    {/* Kullanıcı Adı */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {isCustomer
                            ? (userData as Customer).username.charAt(0).toUpperCase()
                            : (userData as EscortProfile).displayName.charAt(0).toUpperCase()
                          }
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {isCustomer
                              ? (userData as Customer).username
                              : (userData as EscortProfile).displayName
                            }
                          </p>
                          <p className="text-xs text-gray-500">
                            {isCustomer
                              ? (userData as Customer).fullName
                              : `${(userData as EscortProfile).city}, ${(userData as EscortProfile).district}`
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Müşteri İletişim veya Eskort Konum/Fiyat */}
                    {isCustomer && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-1 mb-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span>{(userData as Customer).email}</span>
                          </div>
                          {(userData as Customer).phoneNumber && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span>{(userData as Customer).phoneNumber}</span>
                            </div>
                          )}
                        </div>
                      </td>
                    )}

                    {!isCustomer && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {(userData as EscortProfile).city}, {(userData as EscortProfile).district}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-pink-600">
                            {(userData as EscortProfile).hourlyRate} ₺/saat
                          </span>
                        </td>
                      </>
                    )}

                    {/* Durum */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isCustomer ? (
                        <Badge variant={(userData as Customer).isVerified ? 'default' : 'destructive'}>
                          {(userData as Customer).isVerified ? 'Aktif' : 'Askıya Alındı'}
                        </Badge>
                      ) : (
                        <Badge
                          variant={
                            (userData as EscortProfile).verificationStatus === 'verified'
                              ? 'default'
                              : (userData as EscortProfile).verificationStatus === 'pending'
                              ? 'secondary'
                              : 'destructive'
                          }
                          className={
                            (userData as EscortProfile).verificationStatus === 'pending'
                              ? 'bg-orange-500'
                              : ''
                          }
                        >
                          {(userData as EscortProfile).verificationStatus === 'verified'
                            ? 'Onaylandı'
                            : (userData as EscortProfile).verificationStatus === 'pending'
                            ? 'Beklemede'
                            : 'Reddedildi'
                          }
                        </Badge>
                      )}
                    </td>

                    {/* Kayıt Tarihi */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {isCustomer
                        ? new Date((userData as Customer).createdAt).toLocaleDateString('tr-TR')
                        : new Date((userData as EscortProfile).joinDate).toLocaleDateString('tr-TR')
                      }
                    </td>

                    {/* İşlemler */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(userData, isCustomer ? 'customer' : 'escort')}
                          title="Detayları Gör"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(userData, isCustomer ? 'customer' : 'escort')}
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBan(userData, isCustomer ? 'customer' : 'escort')}
                          title={isBanned ? 'Yasağı Kaldır' : 'Askıya Al'}
                          className={isBanned ? 'text-green-600 hover:text-green-700' : 'text-orange-600 hover:text-orange-700'}
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(userData, isCustomer ? 'customer' : 'escort')}
                          title="Sil"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Kullanıcı bulunamadı</p>
          </div>
        )}
      </Card>

      {/* View/Edit Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedAction?.type === 'view' ? 'Kullanıcı Detayları' : 'Kullanıcı Düzenle'}
            </DialogTitle>
            <DialogDescription>
              {activeTab === 'customers' ? 'Müşteri bilgileri' : 'Eskort bilgileri'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {activeTab === 'customers' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı</label>
                  <Input
                    value={editForm.username || ''}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    disabled={selectedAction?.type === 'view'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tam Ad</label>
                  <Input
                    value={editForm.fullName || ''}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    disabled={selectedAction?.type === 'view'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                  <Input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    disabled={selectedAction?.type === 'view'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                  <Input
                    value={editForm.phoneNumber || ''}
                    onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                    disabled={selectedAction?.type === 'view'}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Görünen İsim</label>
                  <Input
                    value={editForm.displayName || ''}
                    onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                    disabled={selectedAction?.type === 'view'}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                    <Input
                      value={editForm.city || ''}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      disabled={selectedAction?.type === 'view'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
                    <Input
                      value={editForm.district || ''}
                      onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                      disabled={selectedAction?.type === 'view'}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yaş</label>
                    <Input
                      type="number"
                      value={editForm.age || ''}
                      onChange={(e) => setEditForm({ ...editForm, age: parseInt(e.target.value) })}
                      disabled={selectedAction?.type === 'view'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Saatlik Ücret (₺)</label>
                    <Input
                      type="number"
                      value={editForm.hourlyRate || ''}
                      onChange={(e) => setEditForm({ ...editForm, hourlyRate: parseInt(e.target.value) })}
                      disabled={selectedAction?.type === 'view'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hakkında</label>
                  <Textarea
                    value={editForm.about || ''}
                    onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                    disabled={selectedAction?.type === 'view'}
                    rows={4}
                  />
                </div>
              </>
            )}

            {/* Ban reason if banned */}
            {editForm.banReason && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-900">Askıya Alma Nedeni:</p>
                <p className="text-sm text-red-700 mt-1">{editForm.banReason}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              {selectedAction?.type === 'view' ? 'Kapat' : 'İptal'}
            </Button>
            {selectedAction?.type === 'edit' && (
              <Button onClick={saveEdit} className="bg-pink-600 hover:bg-pink-700">
                <Save className="w-4 h-4 mr-2" />
                Kaydet
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kullanıcıyı Sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              Kullanıcıya ait tüm veriler (mesajlar, randevular vb.) da silinecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Ban Dialog */}
      <Dialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ban className="w-5 h-5 text-orange-600" />
              Kullanıcıyı Askıya Al
            </DialogTitle>
            <DialogDescription>
              Bu kullanıcıyı neden askıya alıyorsunuz?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Askıya Alma Nedeni <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Kullanıcının neden askıya alındığını açıklayın..."
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Bu neden kullanıcıya gösterilecektir.
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBanDialog(false)}>
              İptal
            </Button>
            <Button
              onClick={confirmBan}
              disabled={!banReason.trim()}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Ban className="w-4 h-4 mr-2" />
              Askıya Al
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
