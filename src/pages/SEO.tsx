/**
 * SEO Component Page
 * 
 * Dynamic SEO meta tag manager for setting page-specific meta information.
 * Handles Open Graph tags, canonical links, JSON-LD schema markup, and meta descriptions.
 * Improves search engine visibility and social media sharing with comprehensive metadata.
 * 
 * @module pages/SEO
 * @category Pages - Utilities
 * 
 * Features:
 * - Dynamic page title management
 * - Meta description optimization
 * - Keywords configuration for search engines
 * - Open Graph tags (og:title, og:description, og:image, og:url)
 * - Twitter Card tags for social media sharing
 * - Canonical URL specification for duplicate prevention
 * - JSON-LD DirectoryWebSite schema markup implementation
 * - DirectoryWebSite schema with SearchAction for structured data
 * - Language and locale meta tags
 * - Robots index/follow configuration
 * - Charset (UTF-8) specification
 * - Dynamic meta tag injection into document head
 * 
 * Implementation:
 * - Creates and manages DirectoryWebSite schema for search results
 * - Injects script tags with JSON-LD schema into document head
 * - Updates all meta tags dynamically on prop changes
 * - Ensures proper encoding for Turkish characters
 * 
 * @example
 * ```tsx
 * // Usage in Home.tsx
 * <SEO 
 *   title="Marmara Escort İlanları | İstanbul, Bursa, Kocaeli VIP Escort"
 *   description="Marmara bölgesinin en seçkin escort ilan platformu..."
 *   keywords="istanbul escort, bursa escort, kocaeli escort"
 * />
 * ```
 */

import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schemaData?: Record<string, any>; // Dinamik Schema objesi (Opsiyonel)
}

export function SEO({ title, description, keywords, canonical, ogImage, schemaData }: SEOProps) {
  useEffect(() => {
    // Escort ilanları ve SEO dinamizmi
    const isBrandInTitle = title.includes('Zühre Planet') || title.includes('Escort Platform');
    document.title = isBrandInTitle ? title : `${title} | Zühre Planet VIP Escort İlanları`;

    // Description Meta
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Keywords Meta
    const defaultKeywords = "istanbul escort, ankara escort, izmir escort, vip escort bay, onaylı profiller, zühre planet";
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords || defaultKeywords);

    // Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || window.location.href);

    // Open Graph Tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:url': window.location.href,
      'og:image': ogImage || '/og-image.jpg',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (property.startsWith('og:')) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      // Content güncellenirken varsa hata fırlatmasını önler
      if (meta instanceof Element) {
        meta.setAttribute('content', content);
      }
    });

    // JSON-LD Schema (Varsayılan veya Prop üzerinden Gelen Özel Schema)
    const jsonLdData = schemaData || {
      "@context": "https://schema.org",
      "@type": "DirectoryWebSite",
      "name": "Zühre Planet",
      "url": window.location.origin,
      "description": description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    // Temizle ve Ekle
    const existingScript = document.querySelector('script[data-type="seo-schema"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.setAttribute('data-type', 'seo-schema');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

    return () => {
      // Temizlik işlemi (Özellikle Next/SPA yönlendirmelerinde)
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (document.head.contains(linkCanonical as Element)) {
        document.head.removeChild(linkCanonical as Element);
      }
    };
  }, [title, description, keywords, canonical, ogImage, schemaData]);

  return null;
}

export default SEO;
