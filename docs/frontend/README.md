# Frontend Documentation

React SPA built with Vite, Tailwind CSS, Zustand, and React Query.

## Project Structure

```bash
frontend/src/
├── api/                    # Axios client and API functions
│   ├── axios.ts            # Base axios instance with interceptors
│   ├── image.api.ts        # Image-related API calls
│   ├── leaderboard.api.ts  # Leaderboard API calls
│   └── completion.api.ts   # Game completion API calls
│
├── components/             # React components
│   ├── ui/                # Shadcn UI primitives (button, card, dialog, etc.)
│   ├── Layout/            # Header, Footer
│   ├── GameImage/          # Main game display components
│   ├── ImageSelector/      # Image selection grid
│   ├── Leaderboard/        # Leaderboard display components
│   ├── GameInstructionsModal/
│   ├── CreditsModal/
│   └── WinnerFormModal/
│
├── contexts/              # React contexts
│   ├── ThemeProvider.tsx   # Dark/light theme management
│   └── ThemeContext.tsx
│
├── hooks/                  # Custom React hooks
│   ├── use-gameOrchestrator.ts  # Main game coordination
│   ├── use-GameCompletion.ts     # Completion monitoring
│   ├── use-targetBox.ts          # Character selection logic
│   ├── use-CharacterPositions.ts # Position scaling
│   └── use-resizeObserver.ts     # Resize detection
│
├── pages/                  # Route pages
│   ├── Index.tsx           # Home/game page
│   ├── LeaderboardPage.tsx # Leaderboard display
│   └── NotFound.tsx
│
├── queries/                # React Query hooks
│   ├── image.query.ts      # Image data fetching
│   ├── leaderboard.query.ts # Leaderboard fetching
│   └── completion.query.ts  # Score submission
│
├── services/               # Business logic services
│   └── gameActions.service.ts # Cross-store game actions
│
├── stores/                 # Zustand state stores
│   ├── gameData.store.ts    # Selected image data
│   ├── gameStatus.store.ts  # Game lifecycle status
│   ├── gameTimer.store.ts   # Timer state
│   ├── gameProgress.store.ts # Found characters tracking
│   ├── gameUI.store.ts      # UI overlay state
│   └── gameMetrics.store.ts  # Final game metrics
│
├── utils/                  # Utility functions
│   ├── gameImage.util.ts    # Character position scaling
│   ├── formatTime.util.ts   # Time formatting (MM:SS)
│   ├── imageSelectorUtils.ts # Thumbnail generation
│   └── leaderboardUtils.tsx  # Rank icon helpers
│
├── zodSchemas/             # Zod validation schemas
│   ├── image.zod.ts
│   ├── leaderboard.zod.ts
│   └── character.zod.ts
│
├── App.tsx                 # Root component with routing
├── main.tsx                # Entry point with providers
└── index.css               # Global styles + Tailwind
```

## State Management

### Zustand Stores

The app uses 6 Zustand stores, each with a specific responsibility:

#### 1. `gameDataStore` (`stores/gameData.store.ts`)

Manages the currently selected game image.

```typescript
interface GameDataState {
  selectedImageId: string | null;
  selectedImageData: ImageData | null | undefined;
  aspectRatio: number;
  availableCharacterNames: string[];
  totalCharacters: number;
  isErrorFetchingImageData: boolean;
}
```

**Actions:** `selectImage()`, `setSelectedImageData()`, `reset()`

#### 2. `gameStatusStore` (`stores/gameStatus.store.ts`)

Tracks game lifecycle: `IDLE` → `RUNNING` → `PAUSED` → `ENDED`

```typescript
type GameStatus = "IDLE" | "RUNNING" | "PAUSED" | "ENDED";

interface GameStatusState {
  status: GameStatus;
  isIdle: () => boolean;
  isRunning: () => boolean;
  isPaused: () => boolean;
  isEnded: () => boolean;
  isActive: () => boolean; // RUNNING || PAUSED
}
```

#### 3. `gameTimerStore` (`stores/gameTimer.store.ts`)

Manages elapsed time. Uses closure for interval ID (not in state) to prevent unnecessary re-renders.

```typescript
interface TimerState {
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  stop: () => number; // Returns final seconds
}
```

**Note:** The `intervalId` is stored in a closure variable, not in state. This prevents cascade re-renders on every tick.

#### 4. `gameProgressStore` (`stores/gameProgress.store.ts`)

Tracks which characters have been found using `Set<string>`.

```typescript
interface GameProgressState {
  foundCharacters: Set<string>;
  notFoundCharacters: Set<string>;
  gameCompleted: boolean;
  totalCharacters: number;
  availableCharacterNames: string[];
  markCharacterAsFound: (charName: string) => void;
  isCharacterFound: (charName: string) => boolean;
  areAllCharactersFound: () => boolean;
}
```

#### 5. `gameUIStore` (`stores/gameUI.store.ts`)

Controls overlay elements.

```typescript
interface GameUIState {
  boxPosition: { x: number; y: number } | null;
  showInfoModal: boolean;
  setBoxPosition: (position: BoxPosition | null) => void;
  setShowInfoModal: (show: boolean) => void;
}
```

#### 6. `gameMetricsStore` (`stores/gameMetrics.store.ts`)

Stores final game metrics for submission.

```typescript
interface GameMetricsState {
  secondsTaken: number;
  startTime: number | null;
  setSecondsTaken: (seconds: number) => void;
  setStartTime: (time: number) => void;
}
```

### Devtools Middleware

All stores use the `devtools` middleware, but only in development:

```typescript
export const useTimerStore = create<TimerState>()(
  devtools(
    (set, get) => {
      /* ... */
    },
    process.env.NODE_ENV === "development" ? { name: "Timer" } : {},
  ),
);
```

## Data Fetching Strategy

### React Query Configuration

Defined in `main.tsx`:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes default
      retry: 2,
    },
  },
});
```

### Query Hooks

#### Image Queries (`queries/image.query.ts`)

```typescript
// All images - cached for 24 hours
export const useImagesQuery = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: getGameImages,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

// Single image with characters
export const useSingleImageQuery = (imageId: string) => {
  return useQuery({
    queryKey: ["image", imageId],
    queryFn: () => getImageById(imageId),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!imageId,
  });
};
```

#### Leaderboard Query (`queries/leaderboard.query.ts`)

```typescript
export const useLeaderboardQuery = (imageId: string) => {
  return useQuery({
    queryKey: ["leaderboard", imageId],
    queryFn: () => getLeaderboard(imageId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

#### Completion Mutation (`queries/completion.query.ts`)

```typescript
export const useCompletionMutation = () => {
  return useMutation({
    mutationFn: ({ data, imageId }) => createGameCompletion(data, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};
```

## API Layer

### Axios Client (`api/axios.ts`)

Base configuration with interceptors:

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Error interceptor shows toasts for 5xx errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status >= 500) {
      toast.error("Server Error", { description: error.message });
    }
    return Promise.reject(error);
  },
);
```

### API Functions

Each API file validates responses with Zod:

```typescript
// api/image.api.ts
export const getImageById = async (id: string) => {
  const response = await api.get(`/image/${id}`);
  return ImageDataSchema.parse(response.data);
};
```

## Component Patterns

### Component Structure

Follow this template for new components:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { someUi } from "@/components/ui/some-ui";

interface ComponentProps {
  className?: string;
  variant?: "default" | "secondary";
}

function MyComponent({ className, variant = "default" }: ComponentProps) {
  return <div className={cn("base-classes", className)}>Content</div>;
}

export { MyComponent, type ComponentProps };
```

### Memoization

Use `React.memo` for components that:

- Are rendered in lists
- Subscribe to store state
- Don't need to re-render on every parent render

```tsx
const CharacterMarkersComponent = ({
  characterData,
}: CharacterMarkersProps) => {
  const foundCharacters = useGameProgressStore((s) => s.foundCharacters);
  // ...
};

export const CharacterMarkers = memo(CharacterMarkersComponent);
```

### Store Selectors

Always use targeted selectors, not full store subscriptions:

```typescript
// GOOD - Only re-renders when foundCharacters changes
const foundCharacters = useGameProgressStore((s) => s.foundCharacters);

// BAD - Re-renders on any store change
const { foundCharacters, notFoundCharacters } = useGameProgressStore();

// OK - Re-renders when specific properties change (not an object)
const seconds = useTimerStore((s) => s.seconds);
```

## Key Custom Hooks

### `useCharacterPositions`

Calculates scaled character positions based on image dimensions.

```typescript
const { characterPositions, imageRef } = useCharacterPositions();
// Attach imageRef to <img> element
// characterPositions contains scaled { x, y, tolerance } for each character
```

**How it works:**

1. Takes original ratio positions (0-1) from `selectedImageData`
2. Uses `ResizeObserver` to detect image size changes
3. Scales positions to current display size
4. Recalculates on image load and window resize

### `useTargetBox`

Handles character click validation.

```typescript
const { targetRef, onCharacterClick, boxPosition } = useTargetBox();
// targetRef - attach to clickable image
// onCharacterClick - call with click coordinates
// boxPosition - position to render character dropdown
```

### `useGameOrchestrator`

Coordinates game lifecycle across all stores.

```typescript
const { isGameComplete, handleStartGame, handleQuitGame, handleResetGame } =
  useGameOrchestrator();
```

## Performance Optimizations

### 1. Timer Store (Critical)

```typescript
// Interval ID stored in closure, NOT in state
export const useTimerStore = create<TimerState>()(
  devtools((set, get) => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    return {
      // ...
    };
  }),
);
```

**Why:** If `intervalId` were in state, every tick would trigger re-renders in ALL subscribed components.

### 2. ResizeObserver Callback Stability

```typescript
export function useResizeObserver(ref, callback) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const observer = new ResizeObserver(() => callbackRef.current());
    // ...
  }, [ref]); // No callback dependency
}
```

**Why:** Prevents observer disconnect/reconnect on every resize event.

### 3. React.memo on List Components

Components like `CharacterMarkers`, `ImageCard` are memoized to prevent unnecessary re-renders when parent state changes.

### 4. Character Position Caching

`Array.from(notFoundCharacters)` is cached in a variable instead of being called multiple times per render.

## Dependencies

| Package                   | Purpose                      |
| ------------------------- | ---------------------------- |
| `react` + `react-dom`     | UI framework                 |
| `react-router-dom`        | Client-side routing          |
| `zustand`                 | State management             |
| `@tanstack/react-query`   | Server state (caching, sync) |
| `axios`                   | HTTP client                  |
| `zod`                     | Runtime validation           |
| `sonner`                  | Toast notifications          |
| `motion`                  | Animations                   |
| `lucide-react`            | Icons                        |
| `clsx` + `tailwind-merge` | Class name utilities         |
| `tailwindcss`             | Styling                      |

## Adding a New Feature

1. **API:** Add function to appropriate file in `src/api/`
2. **Schema:** Add Zod schema in `src/zodSchemas/`
3. **Query:** Create React Query hook in `src/queries/`
4. **Store:** Add state to existing store or create new one
5. **Component:** Create component in appropriate `src/components/` subfolder
6. **Test:** Verify with `npm run dev`
