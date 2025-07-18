# 📦 Backend – Where's Waldo?

This folder contains the backend for the **Where's Waldo?** game.

---

## ⚙️ Tech Stack

- **Node.js** + **Express** (v5)
- **TypeScript** (ESM modules)
- **Prisma ORM** with PostgreSQL
- **Zod** for schema validation
- **Cloudinary** for image storage
- **dotenv** for environment variables

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a .env file in the root of the backend folder with the following values:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/where_is_waldo
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ALLOWED_ORIGIN=http://localhost:5173
```

### 3. Set up the database

Run the following commands to apply your schema and seed the database:

```bash
npm run prisma:migrate
npm run prisma:generate
npm run db:seed

```

To view your database with a visual editor:

```bash
npm run prisma:studio

```

### 4. Start the server

```bash
npm run dev

```

To build and run in production:

```bash
npm run build
npm run start

```

## 🛠️ Available Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `dev`             | Run dev server with live reload via `tsx` |
| `build`           | Compile TypeScript to `dist/`             |
| `start`           | Run the built project with Node           |
| `prisma:migrate`  | Apply migrations with Prisma              |
| `prisma:generate` | Generate the Prisma client                |
| `prisma:studio`   | Open Prisma Studio                        |
| `db:seed`         | Seed the database (via `tsx src/seeds/`)  |

## 🧼 Code Quality

- ESLint and Prettier are configured

- TypeScript with strict type-checking

- Project uses ESM ("type": "module")

## 📁 Folder Structure

```bash
backend/
├── prisma/           # Prisma schema
├── src/
│   ├── config/       # cors and PrismaClient configs
│   ├── controllers/  # Request logic
│   ├── routes/       # Express route handlers
│   ├── seeds/        # Seed script
│   └── index.ts      # App entry point
└── .env              # Environment variables

```
