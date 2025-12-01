# Where’s Waldo? (Photo Tagging Game)

A fun, interactive photo‑tagging web app featuring a modern React/TypeScript frontend and a Node.js/Prisma API backend. Inspired by the classic Where’s Waldo? books, this app lets players hunt for hidden characters in detailed scenes and submit their fastest times to a global leaderboard.

---

## Features

### Backend

- Type‑safe Node.js API using Express + TypeScript
- PostgreSQL database with Prisma ORM
- RESTful endpoints for game data, scene definitions, and leaderboard submissions
- Input validation using Zod
- Fast, structured logging using Pino

### Frontend

- Responsive UI built with React + Tailwind CSS
- Smooth animations powered by Motion
- Global state handled with Zustand
- Server state and async data fetching managed with React Query (Tanstack Query)
- Typed Axios API layer with request/response validation
- Dark/Light theme toggle

---

## Screenshots

> Add or update your screenshots inside the `/screenshots` folder.

![Image Selection](./screenshots/image-selection-ui.jpeg)
![Info Modal](./screenshots/info-modal.png)
![Game Image](./screenshots/ongoing-game.jpeg)
![Pause Interface](./screenshots/paused.jpeg)
![Leaderboard](./screenshots/leaderboard.jpeg)
![Dark Mode](./screenshots/dark-mode.jpeg)

---

## Live Demo

**Demo URL:** _<your‑live‑demo‑link>_

---

## Project Structure

```bash
where-is-waldo/
│
├── backend/                # Node.js + Express + Prisma ORM
│
├── frontend/               # React + Vite
```

---

## Tech Stack

### Frontend Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- ShadCN UI
- Motion
- React Query _(server state management)_
- Zustand _(local state management)_
- Axios _(typed API client)_
- Zod

### Backend Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- Pino _(structured logging)_

### Dev Tools

- Monorepo with npm Workspaces
- ESLint + Prettier
- dotenv
- Prisma CLI

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (or SQLite for development)
- Optional: [Postman](https://www.postman.com/) or similar tool for testing API endpoints

### 1. Clone the repository

```bash
git clone https://github.com/Pdave-dcn/where-is-waldo
cd where-is-waldo
```

### 2. Project Scripts Overview

The monorepo includes scripts for frontend, backend, and database operations.

**Monorepo-level scripts:**

```bash
npm run start:frontend   # Run frontend only
npm run start:backend    # Run backend only
npm run start            # Run both frontend and backend concurrently
npm run db:seed          # Seed database (runs backend seed script)
```

**Backend scripts:**

```bash
npm run dev             # Start backend in watch mode
npm run build           # Compile TypeScript
npm run start           # Run compiled backend
npm run prisma:migrate  # Run Prisma migrations
npm run prisma:generate # Generate Prisma client
npm run prisma:studio   # Open Prisma Studio
npm run db:seed         # Seed backend database
```

### 3. Set up the Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
npm install
npx prisma migrate dev
npm run dev
```

Example Variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/where_is_waldo"
ALLOWED_ORIGIN="http://localhost:5173"
NODE_ENV="development"
LOG_LEVEL="debug"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

- Backend runs on `http://localhost:3000` by default

### 4. Set up the Frontend

```bash
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

Example Variable:

```env
VITE_API_BASE_URL="http://localhost:3000/api"
```

- Frontend runs on `http://localhost:5173` by default (Vite dev server)

### 5. Optional: Seed Database

```bash
npm run db:seed
```

- Populates database with initial data for testing

---

## What Was Refactored & Why

- Migrated legacy components to modern React with hooks for improved readability and performance
- Replaced the old user context with Zustand to manage global state more cleanly and efficiently
- Introduced **React Query** for server state management, leveraging features like caching, background refetching, and automatic stale‑state handling
- Added a typed **Axios** API layer to ensure predictable, maintainable, and well‑structured network requests
- Implemented **Pino** for structured logging and improved backend observability

### Backend Restructure

- Reorganized the entire `src/` folder for better scalability and separation of concerns

  - Added `zodSchemas/` for request/response validation
  - Added `core/` to house foundational logic
  - Moved `config/` inside `core/`
  - Added `error/` to centralize the server's error handling system

### Frontend Restructure

- Reorganized the `src/` directory to clearly separate logic layers

  - Added `zodSchemas/` for frontend validation
  - Added `api/` for Axios endpoint definitions and clients
  - Added `queries/` for React Query hooks
  - Added `stores/` for Zustand global state
  - Added `services/` to encapsulate UI‑independent business logic

- Updated the architecture to move away from React Context for user/game state and adopt a fully Zustand‑driven state model

> **Note**:
>
> The previous version of this project is preserved in the `legacy-v1` branch for reference, historical comparison, and transparency.

---

## Architecture Overview

### High‑Level Flow

```bash
React (Vite) ── Axios ──> Express API ──> Prisma ──> PostgreSQL
        │               │
     Zustand         Zod Validation
                       │
                    Pino Logs
```

### Components

- **Frontend**: React UI, game logic, state, timer, dialogs
- **Backend**: REST API, validation, logging, DB operations
- **Database**: Prisma schema + PostgreSQL

---

## API Documentation (Overview)

- **Base URL**: `http://localhost:3000/api`

### Key Endpoints

| Module            | Core Functionality                      | Example Endpoints                              |
| ----------------- | --------------------------------------- | ---------------------------------------------- |
| Images            | Fetch all images/scenes, add new images | `GET /images`, `GET /image/:id`, `POST /image` |
| CharacterLocation | Submit coordinates of characters        | `POST /image/:id/character-location`           |
| GameCompletion    | Submit completed game data              | `POST /image/:id/game-completion`              |
| Leaderboard       | Retrieve sorted leaderboard entries     | `GET /image/:id/leaderboard`                   |

---

## Logging (Pino)

- Structured JSON logs in production
- Colorized and readable logs in development
- Enabled for request lifecycle + error handling
- Easily extendable for metrics or external log storage

---

## State Management (Zustand)

Zustand handles core game UI and logic state:

- Timer & game session
- Pause/resume logic
- Character hitbox selection
- UI panels (modals, overlays)

---

## API Layer (Axios)

- Centralized Axios instance with base URL
- Interceptors for error handling
- Zod‑validated responses
- Strongly typed API client

---

## Roadmap

- Add new game scenes
- Add admin UI for uploading scenes & defining hitboxes
- Add authentication (optional)
- Improve accessibility and keyboard navigation
- Add real‑time leaderboard updates
- Add full test coverage

---

## License

Licensed under the **MIT License**.

---
