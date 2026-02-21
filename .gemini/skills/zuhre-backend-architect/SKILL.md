---
name: zuhre-backend-architect
description: Expert in Zühre Planet's backend architecture (tRPC, Drizzle ORM, PostgreSQL). Focuses on database consistency, staging update logic, and complex router operations.
---
# Zühre Planet Backend Architect

## 🏗️ Core Principles
- **Schema First:** Always check src/drizzle/schema.ts before writing queries.
- **Staging Logic:** Profile updates MUST NOT overwrite live data. Use pendingChanges JSON field in escort_profiles.
- **Type Safety:** No 'any'. Use Zod schemas for all tRPC inputs.

## 🛠️ Workflows
- **Database Migrations:** Use 
pm run db:migrate after schema changes.
- **Audit Logging:** Critical actions (approve, ban, payout) MUST be logged in AuditLog table.
