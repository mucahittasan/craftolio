# Craftolio – Portfolio Builder (Next.js 15, React 19, Prisma, NextAuth)

### Overview

Craftolio is a full-stack, production-ready portfolio builder. Users can register, manage profile, experiences, education, projects, and skills, and publish a portfolio page at `/portfolio/[userName]`.

### Tech Stack

- Next.js App Router (15.x), React 19, TypeScript
- Prisma ORM (PostgreSQL)
- NextAuth v5 (credentials provider, JWT sessions)
- Tailwind CSS, Radix UI, Framer Motion
- React Query, Zustand

---

## Quick Start

Prereqs:

- Node.js ≥ 18.17
- PostgreSQL database

Install deps and run dev:

```bash
pnpm install
cp .env.example .env.local  # create and fill envs (see below)
pnpm prisma migrate dev --name init  # creates DB schema locally
pnpm dev
```

App runs at http://localhost:3000

## Environment Variables

Create `.env.local` in the repo root:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
NEXTAUTH_SECRET="your-strong-random-secret"
# Recommended for prod (NextAuth):
NEXTAUTH_URL="https://your-domain.tld"
```

Notes:

- `NEXTAUTH_SECRET` is required for JWT/session signing.
- `DATABASE_URL` must point to your PostgreSQL instance.

## Scripts

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm start        # start production server
pnpm lint         # run eslint
pnpm commit       # commit with Commitizen (conventional commits)

# Prisma
pnpm prisma migrate dev --name <change>  # create/apply local migration
pnpm prisma migrate deploy               # apply migrations in prod/CI
pnpm prisma generate                     # regenerate Prisma Client
```

## Database & Prisma

- Prisma client is generated to `src/generated/prisma` via `prisma/schema.prisma`.
- Core models: `User`, `Profile`, `Experience`, `Education`, `Project`, `Skill`, plus NextAuth models `Account`, `Session`, `VerificationToken`.
- Run `pnpm prisma migrate dev` on first run to create tables.

Schema excerpt:

```startLine:endLine:prisma/schema.prisma
11:31:model User {
12:  id       String  @id @default(cuid())
13:  username String? @unique
15:  name           String?
16:  email          String    @unique
17:  emailVerified  DateTime?
18:  image          String?
19:  hashedPassword String?
26:  profile     Profile?
27:  experiences Experience[]
28:  educations  Education[]
29:  projects    Project[]
30:  skills      Skill[]
}
```

## Authentication

- NextAuth v5 with Credentials provider (email/password) and Prisma adapter.
- JWT sessions strategy.

Config excerpt:

```startLine:endLine:src/auth.ts
71:76:  secret: process.env.NEXTAUTH_SECRET,
78:78:export const { handlers, auth, signIn, signOut } = NextAuth(config);
```

Auth routes:

- `GET/POST /api/auth/[...nextauth]` – provided by NextAuth handlers.
- `POST /api/register` – simple email/password registration, hashes password with bcrypt.

## API Endpoints

- `POST /api/register`
  - Body: `{ email, name, password }`
  - 409 if email exists; 400 for missing fields.

- `GET /api/i?url=<encoded>` – Image proxy/validator
  - Accepts only http/https, enforces content-type image/\*, max 8MB, caches responses.

Domains include `ui-avatars.com`, `user-images.githubusercontent.com`, `images.unsplash.com`, `craftolio.vercel.app`, `craftolio.com`.

## Project Structure (selected)

```text
src/
  app/
    (root)/, (dashboard)/, portfolio/[userName]/
    api/auth/[...nextauth]/, api/register/, api/i/
  features/
    auth/, builder/, landing/, portfolio/, shared/
  lib/prisma.ts                 # Prisma client singleton
  generated/prisma/             # Prisma Client output
```

## Development Notes

- State: React Query for server cache; Zustand for local app state.
- Forms: React Hook Form + Zod.
- UI: Tailwind + Radix primitives, animations with Framer Motion.
- Formatting: Prettier (+ tailwind plugin), lint-staged configured. If you want Git hooks, initialize husky:
  ```bash
  npx husky init && pnpm husky install
  ```

## Deployment (Vercel recommended)

1. Set envs in Vercel Project Settings: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
2. Ensure your PostgreSQL is reachable from Vercel.
3. Add a deploy step to apply migrations on boot (Vercel Build Command or CI):
   ```bash
   pnpm prisma migrate deploy && pnpm build
   ```
4. Use `pnpm start` as the run command for self-hosting; on Vercel, Next handles this.

## Security

- Strong `NEXTAUTH_SECRET` is mandatory in any non-local environment.
- Image proxy validates protocol, MIME type, and enforces a strict size cap.

## License

MIT
