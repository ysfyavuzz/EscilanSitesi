# `src/drizzle/db.ts` — Veritabanı Bağlantısı (PostgreSQL)

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/drizzle/db.ts` |
| **Modül** | `drizzle/db` |
| **Dil** | TypeScript |
| **Teknoloji** | `drizzle-orm/postgres-js`, `postgres` (node-postgres alternatifi) |
| **İçe Aktar** | `import { db } from '@/drizzle/db'` |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Uygulama boyunca tüm tRPC router'larının kullandığı **PostgreSQL veritabanı bağlantısını** sağlar.
`drizzle-orm/postgres-js` kütüphanesiyle Drizzle ORM instance'ı oluşturur.

---

## 📦 Dışa Aktarılanlar

### `db`
```ts
export const db = drizzle(client, { schema });
```
Tüm Drizzle sorgu metotlarına (`db.select()`, `db.insert()`, `db.update()`, `db.delete()`, `db.query.*`) erişim sağlar.

```ts
// Kullanım örneği
import { db } from '@/drizzle/db';
import * as schema from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const user = await db.query.users.findFirst({
  where: eq(schema.users.email, 'user@example.com')
});
```

---

## 🔐 Ortam Değişkenleri

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| `DATABASE_URL` | ✅ | `postgresql://user:pass@host:5432/dbname` formatında |

`DATABASE_URL` tanımlanmazsa uygulama **başlarken hata fırlatır** ve durur.

---

## ⚠️ Dikkat Edilmesi Gerekenler

- Bu dosya sadece **sunucu tarafında** çalışabilir (Node.js). İstemci (browser) kodunda import edilmemelidir.
- `src/lib/db.ts` ile karıştırılmamalıdır — o dosya eski LibSQL stub'udur ve aktif kullanımda değildir.

---

## 💡 AI Öneri

> **1. Bağlantı Havuzu (Connection Pool):**
> `postgres()` kütüphanesi varsayılan olarak connection pool kullanır. Yoğun trafik için `max` parametresi ayarlanmalıdır:
> ```ts
> const client = postgres(DATABASE_URL, { max: 10 });
> ```
>
> **2. SSL Zorunluluğu:**
> Production'da:
> ```ts
> const client = postgres(DATABASE_URL, { ssl: 'require' });
> ```
>
> **3. Query Logging (Geliştirme):**
> ```ts
> export const db = drizzle(client, { schema, logger: process.env.NODE_ENV === 'development' });
> ```

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
