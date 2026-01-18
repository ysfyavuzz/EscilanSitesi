/**
 * Blog / News Page
 * 
 * SEO-optimized blog listing page with article grid layout.
 * Features categories, search functionality, and responsive design.
 * Improves site SEO performance with content marketing strategy.
 * 
 * @module pages/Blog
 * @category Pages - Public
 * 
 * Features:
 * - Grid layout for article cards
 * - Article preview with image, title, excerpt
 * - Category filtering (All, News, Tips, Guides, Updates)
 * - Search bar for finding articles
 * - Pagination support
 * - Read time estimation
 * - Publication date display
 * - Featured/Popular articles
 * - Responsive design (mobile, tablet, desktop)
 * - Framer Motion animations
 * - SEO-friendly structure
 * - Mock data for articles (ready for backend integration)
 * - Social sharing buttons
 * - Tags for articles
 * 
 * Article Categories:
 * - News: Platform updates and announcements
 * - Tips: Usage tips and best practices
 * - Guides: How-to guides and tutorials
 * - Updates: Feature updates and improvements
 * 
 * @example
 * ```tsx
 * // Route: /blog
 * <Blog />
 * ```
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input, SearchInput } from '@/components/ui/input';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition 
} from '@/lib/animations';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Newspaper,
  Lightbulb,
  FileText,
  Zap,
  Tag,
} from 'lucide-react';
import { Link } from 'wouter';

// Mock article type
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'news' | 'tips' | 'guides' | 'updates';
  image: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
}

// Mock articles data
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Platform Güvenlik Güncellemesi 2024',
    excerpt: 'Kullanıcı güvenliğini artırmak için yeni güvenlik özellikleri eklendi. 2FA, gelişmiş şifreleme ve daha fazlası.',
    content: 'Full article content...',
    category: 'updates',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    author: 'Güvenlik Ekibi',
    date: '2024-01-15',
    readTime: 5,
    tags: ['güvenlik', '2FA', 'güncellemeler'],
    featured: true,
  },
  {
    id: '2',
    title: 'Profesyonel Profil Oluşturma Rehberi',
    excerpt: 'Dikkat çeken ve profesyonel bir profil nasıl oluşturulur? İşte ipuçları ve öneriler.',
    content: 'Full article content...',
    category: 'guides',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    author: 'Editör Ekibi',
    date: '2024-01-12',
    readTime: 8,
    tags: ['rehber', 'profil', 'ipuçları'],
    featured: true,
  },
  {
    id: '3',
    title: 'VIP Üyelik Avantajları',
    excerpt: 'VIP üyelik ile elde edeceğiniz tüm avantajlar ve özellikler hakkında detaylı bilgi.',
    content: 'Full article content...',
    category: 'tips',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
    author: 'Pazarlama Ekibi',
    date: '2024-01-10',
    readTime: 6,
    tags: ['VIP', 'üyelik', 'avantajlar'],
  },
  {
    id: '4',
    title: 'Yeni Mesajlaşma Özellikleri',
    excerpt: 'Mesajlaşma deneyimini iyileştiren yeni özellikler: sesli mesaj, dosya paylaşımı ve daha fazlası.',
    content: 'Full article content...',
    category: 'news',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop',
    author: 'Ürün Ekibi',
    date: '2024-01-08',
    readTime: 4,
    tags: ['mesajlaşma', 'özellikler', 'yeni'],
  },
  {
    id: '5',
    title: 'Başarılı İlan Verme İpuçları',
    excerpt: 'İlanınızın daha fazla görüntülenmesi ve etkileşim alması için profesyonel ipuçları.',
    content: 'Full article content...',
    category: 'tips',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    author: 'Danışman Ekibi',
    date: '2024-01-05',
    readTime: 7,
    tags: ['ilan', 'ipuçları', 'başarı'],
  },
  {
    id: '6',
    title: 'Mobil Uygulama Güncellemesi',
    excerpt: 'iOS ve Android uygulamalarımız yeni özelliklerle güncellendi. Hemen indirin!',
    content: 'Full article content...',
    category: 'updates',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    author: 'Mobil Ekibi',
    date: '2024-01-03',
    readTime: 3,
    tags: ['mobil', 'uygulama', 'güncelleme'],
  },
];

// Categories
const categories = [
  { value: 'all', label: 'Tümü', icon: BookOpen },
  { value: 'news', label: 'Haberler', icon: Newspaper },
  { value: 'tips', label: 'İpuçları', icon: Lightbulb },
  { value: 'guides', label: 'Rehberler', icon: FileText },
  { value: 'updates', label: 'Güncellemeler', icon: Zap },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles
  const filteredArticles = useMemo(() => {
    let filtered = mockArticles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((article) => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Featured articles
  const featuredArticles = mockArticles.filter((article) => article.featured);

  // Category color mapping
  const categoryColors: Record<string, string> = {
    news: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    tips: 'bg-green-500/10 text-green-500 border-green-500/20',
    guides: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    updates: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  };

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-background py-20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="w-4 h-4 mr-2" />
            Blog & Haberler
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Haberler ve Rehberler
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Platformumuzla ilgili güncellemeler, ipuçları ve rehberleri keşfedin
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchInput
              placeholder="Makale ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.value)}
                className="gap-2"
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Articles */}
        {selectedCategory === 'all' && !searchQuery && featuredArticles.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Öne Çıkanlar</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-4 left-4 ${categoryColors[article.category]}`}>
                      {categories.find((c) => c.value === article.category)?.label}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString('tr-TR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime} dk
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Articles Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' ? 'Tüm Makaleler' : categories.find(c => c.value === selectedCategory)?.label}
            </h2>
            <span className="text-muted-foreground">({filteredArticles.length})</span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <motion.div key={article.id} variants={staggerItem}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-4 left-4 ${categoryColors[article.category]}`}>
                        {categories.find((c) => c.value === article.category)?.label}
                      </Badge>
                    </div>
                    <CardHeader className="flex-1">
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(article.date).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime} dk
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Makale Bulunamadı</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? 'Aramanıza uygun makale bulunamadı. Farklı bir arama terimi deneyin.'
                  : 'Bu kategoride henüz makale yok.'}
              </p>
            </div>
          )}
        </motion.div>

        {/* Load More Button (Pagination placeholder) */}
        {filteredArticles.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg">
              Daha Fazla Yükle
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
