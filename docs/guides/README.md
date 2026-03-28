# Developer Guide

Complete guide for setting up, running, and developing the Where's Waldo application.

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL 14+ (or Docker)
- Git

## Local Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd "where's waldo"

# Install root dependencies (includes concurrently)
npm install

# Install workspace dependencies
npm install
```

### 2. Database Setup

**Option A: Local PostgreSQL**

```bash
# Create database
createdb waldo

# Set DATABASE_URL in backend/.env
DATABASE_URL="postgresql://user:password@localhost:5432/waldo"
```

**Option B: Docker**

```bash
docker run -d \
  --name waldo-postgres \
  -e POSTGRES_DB=waldo \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:14
```

### 3. Environment Configuration

**Backend** (`backend/.env`):

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/waldo
ALLOWED_ORIGIN=http://localhost:5173
NODE_ENV=development
LOG_LEVEL=debug
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend** (`frontend/.env`):

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Database Migration & Seeding

```bash
# From root directory
npm run db:seed

# Or from backend directory
cd backend
npm run prisma:migrate
npm run db:seed
```

### 5. Start Development Servers

```bash
# From root - starts both frontend and backend
npm run start

# Or separately
npm run start:frontend  # Frontend on port 5173
npm run start:backend   # Backend on port 3000
```

### 6. Verify Setup

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/health
- Prisma Studio: `cd backend && npm run prisma:studio`

## Common Workflows

### Adding a New API Endpoint

**1. Create the schema** (`backend/src/zodSchemas/newFeature.zod.ts`):

```typescript
import { z } from "zod";

export const NewFeatureSchema = z.object({
  name: z.string().min(1),
  value: z.number().positive(),
});
```

**2. Create the controller** (`backend/src/controllers/newFeature.controller.ts`):

```typescript
import { Request, Response, NextFunction } from "express";
import { NewFeatureSchema } from "../zodSchemas/newFeature.zod.js";
import prisma from "../core/config/db.js";

export const createNewFeature = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = NewFeatureSchema.parse(req.body);
    const result = await prisma.someModel.create({ data });
    return res.status(201).json({ data: result });
  } catch (error) {
    return next(error);
  }
};
```

**3. Create the route** (`backend/src/routes/newFeature.route.ts`):

```typescript
import { Router } from "express";
import { createNewFeature } from "../controllers/newFeature.controller.js";

const router = Router();

router.post("/", createNewFeature);

export default router;
```

**4. Register the route** (`backend/src/routes/index.ts`):

```typescript
import newFeatureRouter from "./newFeature.route.js";

router.use("/new-feature", newFeatureRouter);
```

### Adding a New Frontend Component

**1. Create the component** (`frontend/src/components/NewComponent/index.tsx`):

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface NewComponentProps {
  className?: string;
}

function NewComponent({ className }: NewComponentProps) {
  return <div className={cn("base-styles", className)}>Content</div>;
}

export { NewComponent, type NewComponentProps };
```

**2. Add to a parent or page**

**3. Use with proper state management**:

```tsx
// If it needs to access store state
const someValue = useSomeStore((s) => s.someValue);

// If it needs to fetch data
const { data, isLoading } = useSomeQuery(id);
```

### Adding a New Zustand Store

**1. Create the store** (`frontend/src/stores/newStore.store.ts`):

```typescript
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface NewStoreState {
  value: string;
  setValue: (value: string) => void;
}

export const useNewStore = create<NewStoreState>()(
  devtools(
    (set) => ({
      value: "",
      setValue: (value) => set({ value }, false, "NewStore/setValue"),
    }),
    process.env.NODE_ENV === "development" ? { name: "NewStore" } : {},
  ),
);
```

**2. Use in components**:

```tsx
const { value, setValue } = useNewStore();

// Or with selector (preferred for performance)
const value = useNewStore((s) => s.value);
```

### Creating a React Query Hook

**1. Create API function** (`frontend/src/api/newFeature.api.ts`):

```typescript
import api from "./axios";
import { NewFeatureSchema } from "@/zodSchemas/newFeature.zod";

export const getNewFeature = async (id: string) => {
  const response = await api.get(`/new-feature/${id}`);
  return NewFeatureSchema.parse(response.data);
};
```

**2. Create query hook** (`frontend/src/queries/newFeature.query.ts`):

```typescript
import { useQuery } from "@tanstack/react-query";
import { getNewFeature } from "@/api/newFeature.api";

export const useNewFeatureQuery = (id: string) => {
  return useQuery({
    queryKey: ["newFeature", id],
    queryFn: () => getNewFeature(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};
```

## Code Conventions

### TypeScript

- Strict mode enabled in both workspaces
- No implicit `any`
- Unused variables must be prefixed with `_` or removed

### Imports

Always include `.js` extension for local imports:

```typescript
// Correct
import { logger } from "./core/config/logger.js";

// Incorrect
import { logger } from "./core/config/logger";
```

### Naming

| Type       | Convention               | Example                    |
| ---------- | ------------------------ | -------------------------- |
| Files      | kebab-case               | `game-completion.route.ts` |
| Components | PascalCase               | `Leaderboard.tsx`          |
| Hooks      | camelCase with `use`     | `useGameOrchestrator.ts`   |
| Stores     | camelCase with `Store`   | `useGameUIStore`           |
| Schemas    | PascalCase with `Schema` | `ImageIdParamSchema`       |
| Constants  | SCREAMING_SNAKE_CASE     | `API_TIMEOUT`              |

### React Component Patterns

```tsx
// Preferred: Named exports
export function MyComponent() { ... }

// Preferred: Separate props interface
interface MyComponentProps {
  title: string
  onAction: () => void
}

// Preferred: Destructured props with defaults
function MyComponent({ title = "Default", onAction }) { ... }
```

## Build & Deployment

### Development Build

```bash
cd frontend && npm run dev
cd backend && npm run dev
```

### Production Build

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build
```

### Production Start

```bash
# Backend only
cd backend && npm start

# Or with migration
cd backend && npm run start:prod
```

## Troubleshooting

### "Cannot connect to database"

```bash
# Check DATABASE_URL is correct
# Test connection
cd backend && npx prisma db push

# Check PostgreSQL is running
pg_isready
```

### "CORS error"

```bash
# Verify ALLOWED_ORIGIN matches frontend URL
# For local dev: http://localhost:5173
```

### "Port already in use"

```bash
# Find and kill the process
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F

# macOS/Linux
lsof -i :3000
kill -9 <pid>
```

### "Module not found"

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "TypeScript errors"

```bash
# Generate types
cd backend && npm run prisma:generate

# Check types
cd frontend && npx tsc --noEmit
```

## Useful Commands

### Database

```bash
npm run prisma:migrate   # Apply migrations
npm run prisma:generate  # Generate Prisma client
npm run prisma:studio    # Open Prisma Studio
npm run db:seed          # Seed database
```

### Backend

```bash
cd backend
npm run dev              # Dev server (tsx watch)
npm run build            # Compile TypeScript
npm start               # Production server
```

### Frontend

```bash
cd frontend
npm run dev             # Dev server with HMR
npm run build           # Type-check + build
npm run lint            # ESLint
npm run preview         # Preview production build
```
