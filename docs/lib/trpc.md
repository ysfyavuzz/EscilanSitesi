# `src/lib/trpc.tsx` — tRPC İstemci Yapılandırması

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/lib/trpc.tsx` |
| **Modül** | `lib/trpc` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | `@trpc/react-query`, `@tanstack/react-query`, `httpBatchLink` |
| **İçe Aktar** | `import { trpc } from '@/lib/trpc'` |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Frontend uygulamasının backend tRPC API'siyle tür güvenli iletişim kurmasını sağlayan istemci yapılandırmasını içerir.

2 temel dışa aktarım sunar:
1. `trpc` — tüm bileşenlerde API çağırmak için kullanılan tRPC istemci örneği
2. `TRPCProvider` — uygulamayı saran React Context sağlayıcısı

---

## 📦 Dışa Aktarılanlar

### `trpc`
```ts
export const trpc = createTRPCReact<AppRouter>();
```
Tüm router prosedürlerine (`trpc.auth.login.useMutation()`, `trpc.escort.list.useQuery()` vb.) tür güvenli erişim sağlar.

---

### `TRPCProvider`
```tsx
<TRPCProvider>
  <App />
</TRPCProvider>
```
`QueryClient` ve tRPC istemcisini oluşturup `React.useState` içinde sabitler — her render'da yeniden oluşturma önlenir.

**Auth token** `localStorage` içindeki `auth_user` anahtarından okunur ve her API isteğine `Authorization: Bearer <token>` başlığı olarak eklenir.

---

### `getBaseUrl()` (iç yardımcı)
SSR ortam tespiti yapar:
- Tarayıcıda → `""` (aynı host, göreli URL)
- Node.js'de → `http://localhost:${PORT}`

---

## 🔗 API Endpoint

```
/api/trpc
```
`httpBatchLink` ile birden fazla tRPC çağrısı tek HTTP isteğinde toplu (batch) gönderilir.

---

## ⚠️ Dikkat Edilmesi Gerekenler

- `auth_user` anahtarı ve token formatı `auth.router.ts`'deki login yanıtıyla eşleşmeli. Değişirse istemci yetkisiz kalır.
- `httpBatchLink` kullanımı ağ istek sayısını azaltır, ancak SSE/WebSocket ile gerçek zamanlı abonelik (`subscription`) gerektiren senaryolar için `splitLink` pattern'i eklenmesi gerekir.

---

## 💡 AI Öneri

> **1. Token Yenileme (Refresh Token) Desteği:**
> Şu an JWT süresi dolduğunda kullanıcı çıkış yapıyor. `onError` callback'i ile 401 hatası yakalanıp otomatik token yenileme isteği atılabilir.
>
> **2. React Query Varsayılanları:**
> `QueryClient` için `staleTime`, `cacheTime`, `refetchOnWindowFocus` gibi global varsayılanlar ayarlanabilir. Gereksiz refetch'ler önlenerek performans artırılabilir:
> ```ts
> new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } } })
> ```
>
> **3. WebSocket / Subscriptions:**
> Gerçek zamanlı bildirimler veya canlı chat için `wsLink` + `splitLink` yapılandırması eklenebilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
