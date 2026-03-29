@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cook Media LLC web application — a single platform for a solo-operated media production company (weddings, live sound/AV, book publishing) that automates the full client lifecycle: inquiry → proposal → contract → payment → event → delivery. The detailed business spec, pricing, and feature roadmap live in `../CLAUDE-cook-media.md`.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript
- **Styling:** Tailwind CSS v4 (CSS-based config in `globals.css`, NOT `tailwind.config.ts`)
- **Database:** PostgreSQL (Neon) with Prisma 7 ORM
- **Auth:** Stubbed (Clerk integration ready, swap `src/lib/auth.ts`)
- **Google Workspace:** Gmail API (emails), Google Drive API (files), Google Sheets API (invoice/contract tracking)
- **Hosting:** Vercel

## Build Commands

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run lint           # ESLint
npm run db:migrate     # Run Prisma migrations
npm run db:studio      # Open Prisma database GUI
npm run db:seed        # Seed wedding packages + add-ons
npm run db:generate    # Regenerate Prisma client
```

## Next.js 16 Breaking Changes (CRITICAL)

- **`proxy.ts` replaces `middleware.ts`** — use `export function proxy()` not `export function middleware()`
- **All params/searchParams are async** — must `await params` in layouts, pages, and route handlers
- **`cookies()` and `headers()` are async** — must `await cookies()`, `await headers()`
- **Route handler params:** `{ params }: { params: Promise<{ id: string }> }` then `const { id } = await params`
- **Tailwind v4:** Config is in `src/app/globals.css` via `@theme inline {}`, not in a JS config file

## Architecture

### Two audiences, distinct UX:
- **Client-facing** (`/inquiry`, `/proposal/[token]`) — premium, mobile-first, branded purple/gold
- **Admin dashboard** (`/admin/*`) — operational hub with sidebar nav

### Key patterns:
- **Money stored as cents** (integers). Use `formatCurrency`/`formatCurrencyShort` from `src/lib/utils.ts`
- **Price snapshots on proposals** — `packagePrice` and `totalPrice` freeze at creation time
- **Inquiry → Client conversion** — inquiries have denormalized contact fields; `clientId` is nullable until converted
- **Google integrations gracefully degrade** — if no `GOOGLE_REFRESH_TOKEN`, functions log to console instead of failing

### Database (Prisma 7):
- Schema: `prisma/schema.prisma` — 6 tables: clients, inquiries, packages, add_ons, proposals, proposal_add_ons
- Client: `src/lib/db.ts` uses `@prisma/adapter-neon` for serverless Neon connection
- Generated types: `src/generated/prisma/client` (import from here, not `@prisma/client`)
- Seed: `prisma/seed.ts` (excluded from tsconfig to avoid build errors)

### Google Workspace:
- `src/lib/google/auth.ts` — OAuth2 client + consent URL
- `src/lib/google/gmail.ts` — send branded emails from Corey's Gmail
- `src/lib/google/drive.ts` — client folder creation, file uploads
- `src/lib/google/sheets.ts` — invoice and contract row syncing
- OAuth callback: `/api/auth/google/callback` displays refresh token for `.env` setup

## Brand Design Tokens (in globals.css)

| Token | Value |
|-------|-------|
| `brand-purple` | `#6B2D8B` |
| `brand-gold` | `#D4A843` |
| `brand-bg` | `#FAFAF8` |
| `brand-text` | `#1A1A2E` |
| `font-heading` | Playfair Display |
| `font-body` | Inter |

## Pricing Rules (Business Logic)

- Never discount packages — offer value-adds instead
- Anchor with premium package (show first, highest `sortOrder`)
- Out-of-town: minimum 20% premium + actual travel costs
- Rush bookings (<60 days): surcharge applies
- Wedding retainer: 50% non-refundable, balance due before event
- All pricing is admin-configurable at `/admin/settings/packages`
