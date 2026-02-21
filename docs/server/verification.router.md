# src/server/routers/verification.router.ts — Kimlik Doğrulama Router
## Amacı
Escort profillerinin canlı fotoğraf ile doğrulanma sürecini yönetir.

## Akış
1. Fotoğraf yüklenir.
2. AI Simülatörü çalışır (pending_ai).
3. Onaylanırsa admin onayına gider (pending_admin).

## Kritik Sorunlar (BUGS)
- TS Hataları: verificationStatus ve visibilityStatus alanları @ts-ignore ile geçilmiş, şemada eksik olabilir.
