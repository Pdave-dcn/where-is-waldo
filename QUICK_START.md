# Where's Waldo - Quick Start

## What Is This?

A photo-tagging game where players find hidden characters in crowded images. Players are timed, compete on leaderboards, and can track their progress across multiple game scenes.

---

## 5-Minute Setup

```bash
# 1. Clone and install
git clone <repo-url> && cd where-is-waldo && npm install

# 2. Set up environment (backend/.env)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/waldo
ALLOWED_ORIGIN=http://localhost:5173
CLOUDINARY_*=<your-credentials>

# 3. Migrate and seed database
npm run db:seed

# 4. Start both servers
npm run start

# 5. Open browser
# Frontend: http://localhost:5173
# API: http://localhost:3000
```

---

## Tech Stack

| Layer    | Technology                                         |
| -------- | -------------------------------------------------- |
| Frontend | React 18, Vite, Tailwind CSS, Zustand, React Query |
| Backend  | Express, TypeScript, Zod, Pino                     |
| Database | PostgreSQL (Prisma ORM)                            |
| Images   | Cloudinary CDN                                     |

---

## Project Structure

```bash
where-is-waldo/
├── frontend/src/
│   ├── components/       # UI components
│   ├── stores/           # Zustand state stores (6 stores)
│   ├── queries/          # React Query hooks
│   ├── api/              # Axios API functions
│   └── pages/            # Route pages
│
├── backend/src/
│   ├── controllers/      # Request handlers
│   ├── routes/           # API endpoints
│   ├── zodSchemas/       # Validation schemas
│   ├── core/             # Config, errors, middleware
│   └── prisma/           # Database schema
│
└── docs/                 # Full documentation
```

---

## Key Concepts

### State Management (Zustand)

6 stores manage different concerns:

- `gameData` - selected image and characters
- `gameStatus` - IDLE | RUNNING | PAUSED | ENDED
- `gameTimer` - elapsed seconds
- `gameProgress` - found characters (Set)
- `gameUI` - box position, modals
- `gameMetrics` - final score

### Data Fetching (React Query)

- Images: cached 24 hours
- Leaderboard: cached 5 minutes
- Completions: mutation with cache invalidation

### Validation (Zod)

- All API inputs validated server-side
- All API responses validated client-side

---

## Key Files

| Purpose         | File                           |
| --------------- | ------------------------------ |
| Frontend entry  | `frontend/src/main.tsx`        |
| Routes          | `frontend/src/App.tsx`         |
| Main game page  | `frontend/src/pages/Index.tsx` |
| API entry       | `backend/src/index.ts`         |
| Database schema | `backend/prisma/schema.prisma` |

---

## Game Flow

```bash
1. Select image → fetch image + character positions
2. Start game → timer starts
3. Click image → character dropdown appears
4. Select character → mark as found, check completion
5. All found → submit score → view leaderboard
```

---

## Common Commands

```bash
npm run start           # Both servers
npm run start:frontend  # Frontend only (5173)
npm run start:backend   # Backend only (3000)
npm run db:seed        # Seed database

# Backend
cd backend
npm run dev             # Watch mode
npm run prisma:studio   # DB GUI

# Frontend
cd frontend
npm run dev             # Vite dev server
npm run build           # Production build
```

---

## Documentation

| For...            | See                           |
| ----------------- | ----------------------------- |
| Full docs index   | `docs/README.md`              |
| Architecture      | `docs/architecture/README.md` |
| Backend API       | `docs/backend/README.md`      |
| Frontend patterns | `docs/frontend/README.md`     |
| Setup guide       | `docs/guides/README.md`       |
| Features          | `docs/features/README.md`     |
| Performance       | `docs/performance.md`         |

---

## Troubleshooting

**"Cannot connect to database"** → Check `DATABASE_URL` and PostgreSQL running

**"CORS error"** → Verify `ALLOWED_ORIGIN` matches frontend URL

**"Module not found"** → `rm -rf node_modules && npm install`

**"TypeScript errors"** → `cd backend && npm run prisma:generate`
