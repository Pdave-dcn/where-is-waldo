# Documentation

Welcome to the Where's Waldo game documentation. This folder contains comprehensive guides for understanding, developing, and maintaining this codebase.

## Quick Navigation

### [Architecture Overview](./architecture/README.md)

- System design and component interactions
- Request/response flow
- Data architecture

### [Backend Documentation](./backend/README.md)

- API structure and endpoints
- Database schema (Prisma)
- Error handling patterns
- Middleware and rate limiting

### [Frontend Documentation](./frontend/README.md)

- Component architecture
- State management (Zustand stores)
- Data fetching (React Query + Axios)
- Performance optimizations

### [Developer Guide](./guides/README.md)

- Local development setup
- Environment variables
- Common workflows
- Testing

### [Features](./features/README.md)

- Game mechanics
- Character detection algorithm
- Leaderboard system

---

## Project Overview

**Where's Waldo** is a photo-tagging game where players find hidden characters in crowded images. Players are timed, compete on leaderboards, and can track their progress across multiple game images.

### Tech Stack

| Layer         | Technology                                         |
| ------------- | -------------------------------------------------- |
| Frontend      | React 18, Vite, Tailwind CSS, Zustand, React Query |
| Backend       | Express, TypeScript, Zod                           |
| Database      | PostgreSQL via Prisma ORM                          |
| Image Storage | Cloudinary                                         |
| Logging       | Pino (backend), Sonner (frontend)                  |

### Repository Structure

```bash
where's waldo/
├── docs/              # This documentation
├── frontend/          # React SPA (port 5173)
├── backend/           # Express API (port 3000)
└── package.json      # Workspace root
```

---

## Quick Links by Role

### For New Developers

1. Start with [Architecture Overview](./architecture/README.md)
2. Follow [Local Setup](./guides/README.md#local-setup)
3. Review [Code Conventions](./guides/README.md#code-conventions)

### For Backend Work

1. [Backend Architecture](./backend/README.md)
2. [API Endpoints](./backend/README.md#api-endpoints)
3. [Database Schema](./backend/README.md#database-schema)

### For Frontend Work

1. [Frontend Architecture](./frontend/README.md)
2. [State Management](./frontend/README.md#state-management)
3. [Component Patterns](./frontend/README.md#component-patterns)

---

## Documentation Map

```bash
docs/
├── README.md              # This file
├── architecture/
│   └── README.md          # System architecture
├── backend/
│   └── README.md          # Backend documentation
├── frontend/
│   └── README.md          # Frontend documentation
├── guides/
│   └── README.md          # Developer guide
└── features/
    └── README.md          # Feature breakdown
```
