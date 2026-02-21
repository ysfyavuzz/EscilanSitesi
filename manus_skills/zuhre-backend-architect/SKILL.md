---
name: zuhre-backend-architect
description: Zühre Planet backend mimarisi (tRPC, Drizzle, PostgreSQL) uzmanı. Veritabanı tutarlılığı, staging (onay) mantığı ve karmaşık router operasyonlarına odaklanır.
---
# Zühre Planet Backend Architect

Bu yetenek, backend geliştirme süreçlerinde hata payını minimize etmek ve mimari bütünlüğü korumak için tasarlanmıştır.

## Mimari Prensipler
- **Önce Şema:** Sorgu yazmadan önce src/drizzle/schema.ts mutlaka kontrol edilmelidir.
- **Staging Mantığı:** Profil güncellemeleri canlı veriyi doğrudan ezmemelidir. escort_profiles tablosundaki pendingChanges alanı kullanılmalıdır.
- **Tip Güvenliği:** ny kullanımı yasaktır. Tüm girişler Zod şemaları ile doğrulanmalıdır.

## İş Akışları
- **Migration:** Şema değişikliği sonrası 
pm run db:migrate çalıştırılmalıdır.
- **Audit Log:** Onay, ban, ödeme gibi kritik işlemler AuditLog tablosuna kaydedilmelidir.
