# AGENTS.md - Agentic Coding Guidelines

This document provides guidelines for agents working in this "Where's Waldo" codebase.

## Project Overview

A monorepo with two workspaces:
- **backend**: Express + TypeScript + Prisma + Zod + Pino (port 3000)
- **frontend**: React + Vite + Tailwind + Zustand + React Query + Axios (port 5173)

---

## Build/Lint/Test Commands

### Root Commands
```bash
npm run start          # Start both frontend and backend concurrently
npm run start:frontend # Start frontend only
npm run start:backend  # Start backend only
npm run db:seed        # Seed database from root
```

### Frontend Commands
```bash
cd frontend
npm run dev             # Start dev server with HMR
npm run build           # Type-check and build for production
npm run lint            # Run ESLint
npm run preview         # Preview production build locally
```

### Backend Commands
```bash
cd backend
npm run dev             # Start dev server (tsx watch mode)
npm run build           # Generate Prisma client + compile TypeScript
npm run start           # Run compiled backend (node dist/index.js)
npm run prisma:migrate  # Apply database migrations
npm run prisma:generate # Generate Prisma client
npm run prisma:studio   # Open Prisma Studio UI
npm run db:seed         # Seed database
npm run start:prod      # Deploy: migrate + start production
npm run start:prod:seed # Deploy: migrate + seed + start production
```

### Testing
- **No test framework is currently configured.** When adding tests, use Vitest for both workspaces.
- Install with: `npm install -D vitest @vitest/ui` in the respective workspace
- Run single test file: `npx vitest run src/path/to/test.spec.ts`

---

## Code Style Guidelines

### General

- **TypeScript**: Strict mode enabled in both workspaces (`"strict": true`)
- **ES Modules**: Use `.js` extensions in imports even for TypeScript files
- **No semicolons**: Use ASI (Automatic Semicolon Insertion)
- **Quotes**: Single quotes for strings
- **Indentation**: 2 spaces

### TypeScript Configuration

Both workspaces enforce strict TypeScript:
- No implicit any (`@typescript-eslint/no-explicit-any: "warn"`)
- Unused variables must be prefixed with `_` (`@typescript-eslint/no-unused-vars: ["error", { argsIgnorePattern: "^_" }]`)
- Frontend additionally: `noUnusedLocals`, `noUnusedParameters`

### Imports

**Order (frontend):**
1. React/core imports (`react`, `react-dom`)
2. Third-party libraries (Radix UI, Zustand, React Query, etc.)
3. Absolute imports (`@/...`)
4. Relative imports (`./`, `../`)

**Extensions:** Always include `.js` extension for local imports:
```typescript
// CORRECT
import { logger } from "./core/config/logger.js";
import api from "./axios";

// INCORRECT
import { logger } from "./core/config/logger";
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `game-completion.route.ts`, `use-game-orchestrator.ts` |
| Functions/Variables | camelCase | `getLeaderboardForImage`, `isGameComplete` |
| React Components | PascalCase | `Leaderboard.tsx`, `GameImage.tsx` |
| TypeScript Types/Interfaces | PascalCase | `GameUIState`, `BoxPosition` |
| Constants | SCREAMING_SNAKE_CASE | `PORT`, `API_BASE_URL` |
| Zod Schemas | PascalCase with Schema suffix | `ImageIdParamSchema`, `LeaderboardResponseSchema` |
| Hooks | camelCase with `use` prefix | `useGameOrchestrator`, `useGameCompletion` |
| Zustand stores | camelCase with Store suffix | `useGameUIStore`, `useGameDataStore` |
| API functions | camelCase verb prefix | `getLeaderboard`, `submitCharacterLocation` |

### Component Structure

Follow this pattern for React components:
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { someUi } from "@/components/ui/some-ui"

interface ComponentProps {
  className?: string
  variant?: "default" | "secondary"
}

function MyComponent({ className, variant = "default" }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      Content
    </div>
  )
}

export { MyComponent, type ComponentProps }
```

### Error Handling

**Backend:**
- Use try/catch in controllers, pass errors to `next()`
- Create custom error handlers in `src/core/error/handlers/`
- Use Zod for input validation with descriptive error messages
- Use Pino logger with structured logging and action loggers

```typescript
export const getLeaderboardForImage = async (req, res, next) => {
  const actionLogger = createActionLogger(controllerLogger, "getLeaderboardForImage", req);
  try {
    actionLogger.info("Fetching leaderboard for image");
    // ... logic
  } catch (error: unknown) {
    return next(error);
  }
};
```

**Frontend:**
- Use Zod for API response validation
- Handle errors in API layer with axios interceptors
- Use `sonner` for toast notifications

### Zod Schemas

Define schemas in `zodSchemas/` directories with clear validation messages:
```typescript
import { z } from "zod";

export const ImageIdParamSchema = z.object({
  id: z.string().uuid("Invalid Image ID format in URL parameter."),
});

export const NewImageSchema = z.object({
  name: z.string().min(1, "Name is required."),
  imageUrl: z.string().url("Image URL must be a valid URL."),
});
```

### State Management (Zustand)

- Use `devtools` middleware for debugging
- Define explicit interfaces for state shape
- Include JSDoc comments for complex stores
- Use action names in devtools: `{ name: "GameUI" }`

```typescript
export const useGameUIStore = create<GameUIState>()(
  devtools(
    (set) => ({
      boxPosition: null,
      setBoxPosition: (position) =>
        set({ boxPosition: position }, false, "UI/setBoxPosition"),
    }),
    { name: "GameUI" }
  )
);
```

### Logging (Backend)

Use Pino logger with structured context:
```typescript
logger.info({ userId, action }, "User performed action");
logger.error({ errorType, stack }, "Request failed");
```

### Prisma

- Use Prisma client singleton pattern in `src/core/config/db.ts`
- Generate client after installing deps: `npm run prisma:generate`
- Write migrations: `npm run prisma:migrate`
- Seed script in `src/seeds/seed.ts`

---

## File Organization

### Backend Structure
```
backend/src/
├── core/
│   ├── config/      # Database, CORS, Logger configs
│   └── error/       # Error handling (index.ts, handlers/)
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── routes/         # Route definitions
├── zodSchemas/     # Validation schemas
├── utils/          # Utility functions
├── types/          # Type declarations
└── seeds/          # Database seeds
```

### Frontend Structure
```
frontend/src/
├── api/            # Axios clients and endpoints
├── components/
│   ├── ui/         # Shadcn UI components
│   └── .../        # Feature components
├── contexts/       # React contexts
├── hooks/          # Custom hooks
├── lib/            # Utility libs (utils.ts)
├── pages/          # Page components
├── queries/        # React Query hooks
├── services/       # Business logic services
├── stores/         # Zustand stores
├── utils/          # Utility functions
└── zodSchemas/     # Frontend validation schemas
```

---

## Environment Variables

### Backend (.env)
```
DATABASE_URL
ALLOWED_ORIGIN
NODE_ENV
LOG_LEVEL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

### Frontend (.env)
```
VITE_API_BASE_URL
```

---

## Common Patterns

### API Layer (Frontend)
```typescript
// api/leaderboard.api.ts
import { LeaderboardResponseSchema } from "@/zodSchemas/leaderboard.zod";
import api from "./axios";

export const getLeaderboard = async (imageId: string) => {
  try {
    const response = await api.get(`/image/${imageId}/leaderboard`);
    const validatedResponse = LeaderboardResponseSchema.parse(response.data);
    return validatedResponse.data;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    throw error;
  }
};
```

### React Query Hook
```typescript
// queries/leaderboard.query.ts
import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "@/api/leaderboard.api";

export const useLeaderboard = (imageId: string) => {
  return useQuery({
    queryKey: ["leaderboard", imageId],
    queryFn: () => getLeaderboard(imageId),
  });
};
```

---

## When Making Changes

1. Run lint after changes: `npm run lint` in the workspace
2. Type-check before committing: `npm run build` or `npx tsc --noEmit`
3. Test manually if no test suite exists
4. Update this AGENTS.md if new patterns are introduced
