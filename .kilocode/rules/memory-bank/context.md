# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Built "She Said What?" women-to-men translator app
  - Main page with textarea input, translate button, and result display
  - `/api/translate` route with 25+ phrase mappings using regex pattern matching
  - Example phrase chips for quick testing
  - Dark rose/pink gradient UI with Tailwind CSS

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Translator UI (client component) | ✅ Ready |
| `src/app/layout.tsx` | Root layout + metadata | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `src/app/api/translate/route.ts` | Translation API (POST) | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

App is live and working. The translator supports 25+ common phrases women say with humorous plain-English translations for men.

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-03-26 | Built "She Said What?" women-to-men translator with 25+ phrase mappings |
