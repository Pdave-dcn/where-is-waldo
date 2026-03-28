# Backend Documentation

Express.js REST API with TypeScript, Prisma ORM, and Zod validation.

## Project Structure

```bash
backend/src/
├── core/
│   ├── config/
│   │   ├── cors.ts       # CORS configuration
│   │   ├── db.ts         # Prisma client singleton
│   │   └── logger.ts     # Pino logger setup
│   └── error/
│       ├── index.ts      # Central error handler
│       └── handlers/
│           ├── database.handler.ts  # Prisma error mapping
│           └── validation.handler.ts # Zod error mapping
│
├── controllers/           # Request handlers
│   ├── image.controller.ts
│   ├── characterLocation.controller.ts
│   ├── gameCompletion.controller.ts
│   └── leaderboard.controller.ts
│
├── middleware/
│   ├── error.middleware.ts        # Express error handler
│   ├── httpLogger.middleware.ts   # Request logging
│   ├── logContext.middleware.ts   # Request context
│   └── coreRateLimits.middleware.ts # Rate limiting
│
├── routes/               # Route definitions
│   ├── index.ts          # Main router (health + API routes)
│   ├── image.route.ts
│   ├── characterLocation.route.ts
│   ├── gameCompletion.route.ts
│   └── leaderboard.route.ts
│
├── zodSchemas/          # Input validation
│   ├── image.zod.ts
│   ├── location.zod.ts
│   └── completion.zod.ts
│
├── utils/
│   └── logger.util.ts    # Action logger factory
│
├── types/
│   └── types.d.ts        # TypeScript augmentations
│
├── seeds/
│   └── seed.ts           # Database seeding
│
└── index.ts              # App entry point
```

## Entry Point (`src/index.ts`)

```typescript
import express from "express";
import cors from "./core/config/cors.js";
import { logger } from "./core/config/logger.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { httpLogger } from "./middleware/httpLogger.middleware.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors);
app.use(express.json());
app.use(httpLogger);
app.use(traceMiddleware);

app.use(routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info({ port: PORT }, "Server started");
});
```

## API Endpoints

### Health Checks

| Method | Endpoint  | Description                 |
| ------ | --------- | --------------------------- |
| GET    | `/health` | Basic health check          |
| GET    | `/status` | Database connectivity check |

### Images

| Method | Endpoint         | Description      | Rate Limit |
| ------ | ---------------- | ---------------- | ---------- |
| POST   | `/api/image`     | Create new image | 10/hour    |
| GET    | `/api/images`    | List all images  | 30/min     |
| GET    | `/api/image/:id` | Get image by ID  | 30/min     |

### Character Locations

| Method | Endpoint                            | Description            | Rate Limit |
| ------ | ----------------------------------- | ---------------------- | ---------- |
| POST   | `/api/image/:id/character-location` | Add character position | 10/hour    |

### Game Completions

| Method | Endpoint                         | Description       | Rate Limit |
| ------ | -------------------------------- | ----------------- | ---------- |
| POST   | `/api/image/:id/game-completion` | Submit completion | 100/hour   |

### Leaderboard

| Method | Endpoint                     | Description       | Rate Limit |
| ------ | ---------------------------- | ----------------- | ---------- |
| GET    | `/api/image/:id/leaderboard` | Get top 10 scores | 60/min     |

## Route Example

```typescript
// routes/image.route.ts
import { Router } from "express";
import {
  addNewImage,
  getAllImages,
  getImage,
} from "../controllers/image.controller.js";
import { attachLogContext } from "../middleware/logContext.middleware.js";
import { generalApiLimiter } from "../middleware/coreRateLimits.middleware.js";

const router = Router();

router.use(attachLogContext("ImageRoute"));
router.use(generalApiLimiter);

router.post("/", imageUploadLimiter, addNewImage);
router.get("/", imageSelectionLimiter, getAllImages);
router.get("/:id", imageSelectionLimiter, getImage);

export default router;
```

## Controllers

### Image Controller (`controllers/image.controller.ts`)

```typescript
export const getImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const actionLogger = createActionLogger(controllerLogger, "getImage", req);

  try {
    // 1. Validate params
    const { id } = ImageIdParamSchema.parse(req.params);

    // 2. Fetch with relations
    const image = await prisma.image.findUnique({
      where: { id },
      include: { characterLocations: true },
    });

    // 3. Handle not found
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // 4. Return
    actionLogger.info({ imageId: id }, "Image fetched successfully");
    return res.status(200).json({ data: image });
  } catch (error) {
    return next(error);
  }
};
```

### Leaderboard Controller (`controllers/leaderboard.controller.ts`)

```typescript
export const getLeaderboardForImage = async (req, res, next) => {
  try {
    // 1. Validate
    const { id } = ImageIdParamSchema.parse(req.params);

    // 2. Verify image exists
    const image = await prisma.image.findUnique({ where: { id } });
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // 3. Get top 10, sorted by time (ascending = fastest first)
    const leaderboard = await prisma.gameCompletion.findMany({
      where: { imageId: id },
      orderBy: { timeTakenSeconds: "asc" },
      take: 10,
    });

    return res.status(200).json({ data: leaderboard });
  } catch (error) {
    return next(error);
  }
};
```

## Database Schema (Prisma)

```prisma
model Image {
  id               String             @id @default(uuid())
  name             String             @unique
  description      String
  imageUrl         String             @unique
  publicId         String             @unique
  originalWidth    Int
  originalHeight   Int
  characterLocations CharacterLocation[]
  gameCompletions  GameCompletion[]
  createdAt        DateTime           @default(now())
  updatedAt        DateTime           @updatedAt
}

model CharacterLocation {
  id              String  @id @default(uuid())
  characterName   String
  targetXRatio   Float   // 0-1 ratio
  targetYRatio   Float   // 0-1 ratio
  toleranceXRatio Float   // Hit detection tolerance
  toleranceYRatio Float   // Hit detection tolerance
  imageId        String
  image          Image   @relation(fields: [imageId], references: [id])

  @@unique([imageId, characterName])
}

model GameCompletion {
  id                String   @id @default(uuid())
  playerName        String?
  timeTakenSeconds  Float
  completedAt       DateTime @default(now())
  imageId           String
  image             Image    @relation(fields: [imageId], references: [id])
}
```

### Relationships

```bash
Image (1) ──────< CharacterLocation (many)
    │
    └─────────────< GameCompletion (many)
```

## Error Handling

### Central Error Handler (`core/error/index.ts`)

```typescript
export const handleError = (error: unknown, req: Request, res: Response) => {
  // Prisma known errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return DatabaseErrorHandler.handle(error, res);
  }

  // Zod validation errors
  if (error instanceof z.ZodError) {
    return ValidationErrorHandler.handle(error, res);
  }

  // Unknown errors
  logger.error({ error }, "Unhandled error");
  return res.status(500).json({ error: "Internal server error" });
};
```

### Database Error Handler

Maps Prisma error codes to HTTP responses:

| Prisma Code | HTTP Status | Description                 |
| ----------- | ----------- | --------------------------- |
| P2002       | 409         | Unique constraint violation |
| P2025       | 404         | Record not found            |
| P2003       | 400         | Foreign key constraint      |
| P2014       | 400         | Required relation violation |
| P2000       | 400         | Value too long              |
| P2024       | 503         | Connection timeout          |

### Validation Error Handler

Formats Zod errors for API responses:

```json
{
  "error": "Validation failed",
  "details": [
    { "field": "name", "message": "Name is required" },
    { "field": "imageUrl", "message": "Invalid URL format" }
  ]
}
```

## Middleware

### Rate Limiting (`middleware/coreRateLimits.middleware.ts`)

```typescript
export const imageUploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: "Too many image uploads",
});

export const leaderboardSubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many score submissions",
});

export const leaderboardViewLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: "Too many leaderboard views",
});
```

### Log Context (`middleware/logContext.middleware.ts`)

Attaches request tracing info:

```typescript
export const attachLogContext = (module: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.logContext = {
      requestId: req.headers["x-request-id"] || crypto.randomUUID(),
      module,
      ip: req.ip,
    };
    next();
  };
};
```

## Logging

Uses Pino with pretty printing in development:

```typescript
import { logger, createLogger } from "./core/config/logger.js";

// In controllers
const actionLogger = createActionLogger(controllerLogger, "getImage", req);
actionLogger.info({ imageId }, "Fetching image");

// Standalone
logger.info({ userId, action }, "User performed action");
logger.error({ errorType, stack }, "Request failed");
```

## Zod Schemas

### Image Schema

```typescript
// zodSchemas/image.zod.ts
export const ImageIdParamSchema = z.object({
  id: z.string().uuid("Invalid Image ID format"),
});

export const NewImageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Invalid image URL"),
  description: z.string().min(1, "Description is required"),
  publicId: z.string(),
  originalWidth: z.number().int().positive(),
  originalHeight: z.number().int().positive(),
});
```

### Location Schema

```typescript
// zodSchemas/location.zod.ts
export const CharacterLocationSchema = z.object({
  characterName: z.string().min(1),
  targetXRatio: z.number().min(0).max(1),
  targetYRatio: z.number().min(0).max(1),
  toleranceXRatio: z.number().min(0).max(1),
  toleranceYRatio: z.number().min(0).max(1),
});
```

### Completion Schema

```typescript
// zodSchemas/completion.zod.ts
export const GameCompletionSchema = z.object({
  playerName: z.string().optional(),
  timeTakenSeconds: z.number().positive(),
});
```

## Database Seeding

Located at `src/seeds/seed.ts`:

```typescript
async function main() {
  const images = [
    {
      name: "The Siege Begins",
      description: "A medieval scene with crowded streets",
      imageUrl: "cloudinary://...",
      publicId: "waldo/siege",
      characters: [{ characterName: "Waldo", targetXRatio: 0.5, ... }]
    },
    // ... more images
  ]

  for (const img of images) {
    await prisma.image.upsert({
      where: { name: img.name },
      update: { ... },
      create: { ... }
    })
  }
}
```

Run with: `npm run db:seed`

## Environment Variables

| Variable         | Required | Description                                 |
| ---------------- | -------- | ------------------------------------------- |
| `DATABASE_URL`   | Yes      | PostgreSQL connection string                |
| `ALLOWED_ORIGIN` | Yes      | CORS origin (e.g., `http://localhost:5173`) |
| `NODE_ENV`       | No       | `development` or `production`               |
| `LOG_LEVEL`      | No       | Pino log level (default: `info`)            |
| `CLOUDINARY_*`   | Yes      | Cloudinary CDN credentials                  |

## Adding a New Endpoint

1. **Schema:** Create/extend Zod schema in `src/zodSchemas/`
2. **Controller:** Add handler in `src/controllers/`
3. **Route:** Add route with middleware in `src/routes/`
4. **Register:** Import route in `src/routes/index.ts`
5. **Test:** Verify endpoint works
