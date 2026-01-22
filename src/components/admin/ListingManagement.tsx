/**
 * ListingManagement Component
 *
 * Listing approval and management interface.
 * Allows reviewing, approving, or rejecting escort listings.
 * Features advanced filtering with visual color pickers and range sliders.
 *
 * @component
 * @category Admin
 */

import * as React from 'react';
import { Check, X, Eye, AlertCircle, Filter, SlidersHorizontal, Ruler, Weight, MessageCircle, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mockEscorts, type EscortProfile } from '@/data/mockData/escorts';
import {
  VisualFilterItemGrid,
  RangeSlider,
  FilterDropdown,
} from './filters';
import { TURK_EYE_COLORS, TURK_HAIR_COLORS } from '@/types/filter';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Input } from '@/components/ui/input';

type FilterStatus = 'all' | 'pending' | 'verified' | 'rejected';

interface ListingFilters {
  status: FilterStatus;
  eyeColors: string[];
  hairColors: string[];
  heightRange: [number, number];
  weightRange: [number, number];
  city?: string;
}

export function ListingManagement() {
  const [filters, setFilters] = React.useState<ListingFilters>({
    status: 'pending',
    eyeColors: [],
    hairColors: [],
    heightRange: [150, 200],
    weightRange: [40, 100],
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);
  const [selectedListing, setSelectedListing] = React.useState<EscortProfile | null>(null);
  const [showViewDialog, setShowViewDialog] = React.useState(false);
  const [showRejectDialog, setShowRejectDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [editForm, setEditForm] = React.useState<Partial<EscortProfile>>({});
  const [rejectReason, setRejectReason] = React.useState('');
  const [listingToReject, setListingToReject] = React.useState<EscortProfile | null>(null);

  // Local state for listings (mock data state management)
  const [listings, setListings] = React.useState(mockEscorts);

  // Unique cities
  const cities = React.useMemo(() => {
    const uniqueCities = Array.from(new Set(listings.map(e => e.city)));
    return uniqueCities.sort();
  }, [listings]);

  // Filter listings
  const filteredListings = React.useMemo(() => {
    return listings.filter(escort => {
      // Status filter
      if (filters.status !== 'all' && escort.verificationStatus !== filters.status) {
        return false;
      }

      // City filter
      if (filters.city && escort.city !== filters.city) {
        return false;
      }

      // Height range filter
      const height = escort.height;
      if (height < filters.heightRange[0] || height > filters.heightRange[1]) {
        return false;
      }

      return true;
    });
  }, [listings, filters]);

  // Counts
  const pendingCount = listings.filter(e => e.verificationStatus === 'pending').length;
  const activeFilterCount = React.useMemo(() => {
    let count = 0;
    if (filters.eyeColors.length > 0) count++;
    if (filters.hairColors.length > 0) count++;
    if (filters.city) count++;
    if (filters.heightRange[0] !== 150 || filters.heightRange[1] !== 200) count++;
    if (filters.weightRange[0] !== 40 || filters.weightRange[1] !== 100) count++;
    return count;
  }, [filters]);

  const updateFilters = <K extends keyof ListingFilters>(key: K, value: ListingFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetAdvancedFilters = () => {
    setFilters(prev => ({
      ...prev,
      eyeColors: [],
      hairColors: [],
      heightRange: [150, 200],
      weightRange: [40, 100],
      city: undefined,
    }));
  };

  // Actions
  const handleView = (listing: EscortProfile) => {
    setSelectedListing(listing);
    setEditForm(listing);
    setShowViewDialog(true);
  };

  const handleEdit = (listing: EscortProfile) => {
    setSelectedListing(listing);
    setEditForm(listing);
    setShowEditDialog(true);
    setShowViewDialog(false);
  };

  const handleApprove = (listing: EscortProfile) => {
    setListings(prev => prev.map(e =>
      e.id === listing.id
        ? { ...e, verificationStatus: 'verified' as const }
        : e
    ));
  };

  const handleReject = (listing: EscortProfile) => {
    setListingToReject(listing);
    setRejectReason('');
    setShowRejectDialog(true);
  };

  const confirmReject = () => {
    if (listingToReject) {
      setListings(prev => prev.map(e =>
        e.id === listingToReject.id
          ? { ...e, verificationStatus: 'rejected' as const, rejectReason }
          : e
      ));
      setShowRejectDialog(false);
      setListingToReject(null);
      setRejectReason('');
    }
  };

  const saveEdit = () => {
    if (selectedListing) {
      setListings(prev => prev.map(e =>
        e.id === selectedListing.id ? { ...e, ...editForm } : e
      ));
      setShowEditDialog(false);
      setSelectedListing(null);
    }
  };

  const handleDelete = (listing: EscortProfile) => {
    if (confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      setListings(prev => prev.filter(e => e.id !== listing.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İlan Yönetimi</h1>
          <p className="text-gray-500 mt-1">İlanları inceleyin ve onaylayın</p>
        </div>
        <Button
          variant={showAdvancedFilters ? 'default' : 'outline'}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Gelişmiş Filtreler
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 rounded-xl border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Toplam İlan</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{listings.length}</p>
        </Card>
        <Card className="p-6 rounded-xl border-orange-200 bg-orange-50/50 shadow-sm">
          <p className="text-sm text-orange-600">Bekleyen Onaylar</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{pendingCount}</p>
        </Card>
        <Card className="p-6 rounded-xl border-green-200 bg-green-50/50 shadow-sm">
          <p className="text-sm text-green-600">Onaylanmış</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {listings.filter(e => e.verificationStatus === 'verified').length}
          </p>
        </Card>
        <Card className="p-6 rounded-xl border-red-200 bg-red-50/50 shadow-sm">
          <p className="text-sm text-red-600">Reddedilmiş</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {listings.filter(e => e.verificationStatus === 'rejected').length}
          </p>
        </Card>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'pending', 'verified', 'rejected'] as const).map((f) => (
          <Button
            key={f}
            variant={filters.status === f ? 'default' : 'outline'}
            onClick={() => updateFilters('status', f)}
            className={cn(
              filters.status === f && f === 'pending' && 'bg-orange-600 hover:bg-orange-700',
              filters.status === f && f === 'verified' && 'bg-green-600 hover:bg-green-700',
              filters.status === f && f === 'rejected' && 'bg-red-600 hover:bg-red-700'
            )}
          >
            {f === 'all' && 'Tümü'}
            {f === 'pending' && `Bekleyen (${pendingCount})`}
            {f === 'verified' && 'Onaylı'}
            {f === 'rejected' && 'Reddedilmiş'}
          </Button>
        ))}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="p-6 rounded-xl border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Gelişmiş Filtreler</h3>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetAdvancedFilters}>
                    Temizle
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* City Filter */}
                <FilterDropdown
                  options={cities.map(city => ({ value: city, label: city }))}
                  value={filters.city}
                  onChange={(value) => updateFilters('city', value as string)}
                  placeholder="Şehir Seçin"
                  label="Şehir"
                  icon={<span>📍</span>}
                  glassmorphism
                />

                {/* Height Range */}
                <RangeSlider
                  label="Boy"
                  icon={<Ruler className="w-4 h-4" />}
                  min={150}
                  max={200}
                  value={filters.heightRange}
                  onChange={(value) => updateFilters('heightRange', value)}
                  unit="cm"
                />

                {/* Weight Range */}
                <RangeSlider
                  label="Kilo"
                  icon={<Weight className="w-4 h-4" />}
                  min={40}
                  max={100}
                  value={filters.weightRange}
                  onChange={(value) => updateFilters('weightRange', value)}
                  unit="kg"
                />
              </div>

              <div className="mt-6 space-y-6">
                {/* Eye Color Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    👁️ Göz Rengi
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TURK_EYE_COLORS.map((color) => (
                      <VisualFilterItemGrid
                        key={color.value}
                        {...color}
                        selected={filters.eyeColors.includes(color.value)}
                        onChange={(value, selected) => {
                          updateFilters(
                            'eyeColors',
                            selected
                              ? [...filters.eyeColors, value]
                              : filters.eyeColors.filter(c => c !== value)
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Hair Color Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    💇 Saç Rengi
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TURK_HAIR_COLORS.map((color) => (
                      <VisualFilterItemGrid
                        key={color.value}
                        {...color}
                        selected={filters.hairColors.includes(color.value)}
                        onChange={(value, selected) => {
                          updateFilters(
                            'hairColors',
                            selected
                              ? [...filters.hairColors, value]
                              : filters.hairColors.filter(c => c !== value)
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">{filteredListings.length}</span> ilan bulundu
        </p>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((escort) => (
          <Card key={escort.id} className="overflow-hidden rounded-xl border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={escort.profilePhoto}
                alt={escort.displayName}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={
                    escort.verificationStatus === 'verified'
                      ? 'default'
                      : escort.verificationStatus === 'pending'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className={cn(
                    escort.verificationStatus === 'pending' && 'bg-orange-500',
                    escort.verificationStatus === 'verified' && 'bg-green-500',
                    escort.verificationStatus === 'rejected' && 'bg-red-500'
                  )}
                >
                  {escort.verificationStatus === 'verified' && 'Onaylı'}
                  {escort.verificationStatus === 'pending' && 'Beklemede'}
                  {escort.verificationStatus === 'rejected' && 'Reddedildi'}
                </Badge>
              </div>
              {escort.isVip && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-yellow-500 text-white">
                    ⭐ VIP
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">{escort.displayName}</h3>
                <p className="text-sm text-gray-500">{escort.city}, {escort.district}</p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">{escort.age} yaşında</span>
                <span>•</span>
                <span className="text-gray-600">{escort.height} cm</span>
                <span>•</span>
                <span className="font-semibold text-pink-600">{escort.hourlyRate} ₺/saat</span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{escort.about}</p>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleView(escort)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  İncele
                </Button>
                {escort.verificationStatus === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleApprove(escort)}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleReject(escort)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Additional actions for all listings */}
              <div className="flex gap-2 pt-2 border-t border-gray-200">
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1"
                  onClick={() => handleEdit(escort)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Düzenle
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(escort)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Bu kriterlere uygun ilan bulunamadı</p>
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setFilters({
                  status: 'all',
                  eyeColors: [],
                  hairColors: [],
                  heightRange: [150, 200],
                  weightRange: [40, 100],
                });
              }}
            >
              Filtreleri Temizle
            </Button>
          )}
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>İlan Detayları</DialogTitle>
            <DialogDescription>
              {selectedListing?.displayName} profil bilgileri
            </DialogDescription>
          </DialogHeader>

          {selectedListing && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedListing.profilePhoto}
                  alt={selectedListing.displayName}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedListing.displayName}</h3>
                  <p className="text-gray-600">{selectedListing.city}, {selectedListing.district}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant={
                        selectedListing.verificationStatus === 'verified'
                          ? 'default'
                          : selectedListing.verificationStatus === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {selectedListing.verificationStatus === 'verified' && 'Onaylı'}
                      {selectedListing.verificationStatus === 'pending' && 'Beklemede'}
                      {selectedListing.verificationStatus === 'rejected' && 'Reddedildi'}
                    </Badge>
                    {selectedListing.isVip && (
                      <Badge className="bg-yellow-500 text-white">VIP</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Yaş</p>
                  <p className="font-semibold">{selectedListing.age}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Boy</p>
                  <p className="font-semibold">{selectedListing.height} cm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ücret</p>
                  <p className="font-semibold text-pink-600">{selectedListing.hourlyRate} ₺/saat</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Hakkında</p>
                <p className="text-gray-600">{selectedListing.about}</p>
              </div>

              {selectedListing.rejectReason && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-900">Red Nedeni:</p>
                  <p className="text-sm text-red-700 mt-1">{selectedListing.rejectReason}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Kapat
            </Button>
            {selectedListing?.verificationStatus === 'pending' && (
              <>
                <Button
                  variant="outline"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => {
                    handleApprove(selectedListing);
                    setShowViewDialog(false);
                  }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Onayla
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setShowViewDialog(false);
                    handleReject(selectedListing);
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reddet
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>İlanı Düzenle</DialogTitle>
            <DialogDescription>
              İlan bilgilerini düzenleyin
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Görünen İsim</label>
              <Input
                value={editForm.displayName || ''}
                onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                <Input
                  value={editForm.city || ''}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
                <Input
                  value={editForm.district || ''}
                  onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yaş</label>
                <Input
                  type="number"
                  value={editForm.age || ''}
                  onChange={(e) => setEditForm({ ...editForm, age: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Boy (cm)</label>
                <Input
                  type="number"
                  value={editForm.height || ''}
                  onChange={(e) => setEditForm({ ...editForm, height: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ücret (₺)</label>
                <Input
                  type="number"
                  value={editForm.hourlyRate || ''}
                  onChange={(e) => setEditForm({ ...editForm, hourlyRate: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hakkında</label>
              <Textarea
                value={editForm.about || ''}
                onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              İptal
            </Button>
            <Button onClick={saveEdit} className="bg-pink-600 hover:bg-pink-700">
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <X className="w-5 h-5" />
              İlanı Reddet
            </DialogTitle>
            <DialogDescription>
              Bu ilanı neden reddediyorsunuz?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Red Nedeni <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="İlanın neden reddedildiğini açıklayın..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Bu neden ilan sahibine gösterilecektir.
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              İptal
            </Button>
            <Button
              onClick={confirmReject}
              disabled={!rejectReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              <X className="w-4 h-4 mr-2" />
              Reddet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
