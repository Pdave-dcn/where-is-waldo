# Features Breakdown

Detailed explanation of major features and their internal implementation.

## Game Mechanics

### Overview

The game simulates the classic "Where's Waldo" experience where players find hidden characters in crowded images. Key mechanics:

1. **Image Selection** - Choose from available game scenes
2. **Character Finding** - Click on characters hidden in images
3. **Timed Competition** - Speed determines leaderboard ranking
4. **Progress Tracking** - Found characters are marked

### Character Detection Algorithm

Characters are detected using coordinate tolerance zones:

```typescript
// From: frontend/src/utils/gameImage.util.ts
export const scaleCharacterPositions = (imageData, displayWidth, displayHeight) => {
  return imageData.characterLocations.map(char => ({
    characterName: char.characterName,
    position: {
      x: char.targetXRatio * displayWidth,   // Scale ratio to pixels
      y: char.targetYRatio * displayHeight,
    },
    tolerance: {
      x: char.toleranceXRatio * displayWidth,  // Scale tolerance
      y: char.toleranceYRatio * displayHeight,
    }
  }))
}
```

**Hit Detection Flow:**
```
1. User clicks at (clickX, clickY)
2. For each character with tolerance (charX ± tolX, charY ± tolY):
   if (|clickX - charX| <= tolX && |clickY - charY| <= tolY)
     → Character found!
```

### Character Tolerance Zones

Each character has a tolerance zone defined in the database:

| Character | toleranceXRatio | toleranceYRatio |
|-----------|-----------------|-----------------|
| Waldo | ~0.03 | ~0.05 |
| Odlaw | ~0.03 | ~0.05 |
| Wenda | ~0.03 | ~0.05 |
| Wizard | ~0.04 | ~0.06 |
| Woof | ~0.05 | ~0.07 |

Larger characters (Woof the dog) have larger tolerance zones.

## Game States

```
┌─────────┐
│  IDLE   │ ◄─── Initial state, image selection
└────┬────┘
     │ handleStartGame()
     ▼
┌─────────┐
│ RUNNING │ ◄─── Timer running, finding characters
└────┬────┘
     │ togglePause() / resume
     ▼
┌─────────┐
│ PAUSED  │ ◄─── Timer paused, overlay shown
└────┬────┘
     │
     ▼
┌─────────┐
│  ENDED  │ ◄─── All characters found
└─────────┘
```

### State Transitions

**IDLE → RUNNING:**
```typescript
// From: frontend/src/services/gameActions.service.ts
startGame: () => {
  useGameStatusStore.getState().setStatus("RUNNING")
  useTimerStore.getState().start()
  useGameProgressStore.getState().resetGame()
}
```

**Any → IDLE:**
```typescript
// On quit or reset
resetGame: () => {
  useGameStatusStore.getState().setStatus("IDLE")
  useTimerStore.getState().reset()
  useGameProgressStore.getState().resetGame()
  useGameDataStore.getState().reset()
}
```

## Image Selector

### Preloading Strategy

When a user selects an image:
1. Image metadata is fetched via `useSingleImageQuery`
2. Character positions are stored in `gameDataStore`
3. Actual image binary is preloaded for faster display:

```typescript
// From: frontend/src/utils/gameImage.util.ts
export const preloadImageBinary = (url: string) => {
  const img = new Image()
  img.src = url
}
```

### Thumbnail Generation

Images use Cloudinary transformations for thumbnails:

```typescript
// From: frontend/src/utils/imageSelectorUtils.ts
export const getThumbnailUrl = (originalUrl, width = 400, height = 300) => {
  // Extract public ID and generate transformation URL
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_fill/${publicId}`
}
```

## Timer System

### Architecture

The timer uses a closure-based interval pattern:

```typescript
// From: frontend/src/stores/gameTimer.store.ts
export const useTimerStore = create<TimerState>()(
  devtools(
    (set, get) => {
      // intervalId is in CLOSURE, not state
      let intervalId: ReturnType<typeof setInterval> | null = null

      return {
        seconds: 0,
        isRunning: false,
        isPaused: false,

        start: () => {
          intervalId = setInterval(() => {
            if (!get().isPaused) {
              set((s) => ({ seconds: s.seconds + 1 }))
            }
          }, 1000)
          set({ isRunning: true, isPaused: false })
        },

        stop: () => {
          if (intervalId) clearInterval(intervalId)
          const { seconds } = get()
          set({ isRunning: false })
          return seconds
        },
        // ...
      }
    }
  )
)
```

**Why this matters:** If `intervalId` were stored in state, every tick would trigger re-renders in ALL subscribed components. By using a closure, only components reading `seconds` re-render.

## Leaderboard System

### Scoring Logic

Scores are sorted by time (ascending = fastest = best):

```typescript
// From: backend/src/controllers/leaderboard.controller.ts
const leaderboard = await prisma.gameCompletion.findMany({
  where: { imageId: id },
  orderBy: { timeTakenSeconds: "asc" },  // Fastest first
  take: 10,  // Top 10 only
})
```

### Submission Flow

```
1. User finds all characters
2. GameActions.endGame() called
   → useTimerStore.stop() returns seconds
   → useGameStatusStore.setStatus("ENDED")
3. WinnerForm displayed
4. User enters name (optional) and submits
5. POST /api/image/:id/game-completion
6. Backend validates and stores
7. React Query invalidates leaderboard cache
8. Navigate to leaderboard page
```

### Rank Icons

Top 3 players get special icons:

```typescript
// From: frontend/src/utils/leaderboardUtils.tsx
export const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Trophy className="text-yellow-500" />    // Gold
    case 2: return <Medal className="text-gray-400" />       // Silver
    case 3: return <Award className="text-amber-600" />     // Bronze
    default: return <span className="font-bold">{rank}</span>
  }
}
```

## Image Display

### Position Scaling

Original positions are stored as ratios (0-1):
```json
{
  "characterName": "Waldo",
  "targetXRatio": 0.45,
  "targetYRatio": 0.32,
  "toleranceXRatio": 0.03,
  "toleranceYRatio": 0.05
}
```

These are scaled to actual display pixels:
```
displayX = targetXRatio * imageDisplayWidth
displayY = targetYRatio * imageDisplayHeight
```

### Resize Handling

The `useCharacterPositions` hook uses `ResizeObserver` to detect size changes:

```typescript
// From: frontend/src/hooks/use-resizeObserver.ts
const observer = new ResizeObserver(() => callback())
observer.observe(element)
```

Positions are recalculated whenever the image resizes (e.g., window resize, responsive layout changes).

## Found Markers

Found characters are marked on the image with animated checkmarks:

```tsx
// From: frontend/src/components/FoundMark.tsx
const FoundMark = ({ characterName, position }) => (
  <motion.div
    className="absolute w-8 h-8 bg-green-500 rounded-full..."
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    style={{ left: position.x, top: position.y }}
  >
    <Check className="w-6 h-6 text-white" />
  </motion.div>
)
```

Markers use `React.memo` and Zustand selectors to minimize re-renders:

```typescript
// From: frontend/src/components/GameImage/CharacterMarkers.tsx
const CharacterMarkers = memo(({ characterData }) => {
  const foundCharacters = useGameProgressStore((s) => s.foundCharacters)
  // Only re-renders when foundCharacters Set changes
})
```

## Theme System

### Provider Architecture

```tsx
// From: frontend/src/contexts/ThemeProvider.tsx
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem("theme") || "system"
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.add(systemTheme ? "dark" : "light")
    } else {
      root.classList.add(theme)
    }
    
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
```

### CSS Variables

```css
/* From: frontend/src/index.css */
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #ea580c;
  /* ... */
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --primary: #fb923c;
  /* ... */
}
```

## Modal System

### Instruction Modal

Shown when a new image is selected:

```typescript
// From: frontend/src/hooks/use-gameOrchestrator.ts
useEffect(() => {
  if (selectedImageId && isIdle()) {
    setShowInfoModal(true)
  }
}, [selectedImageId, isIdle, setShowInfoModal])
```

### Pause Overlay

Full-screen overlay when game is paused:

```typescript
// From: frontend/src/components/PauseOverlay.tsx
const PauseOverlay = ({ onRestart, onResume, onQuit }) => {
  // Shows game image blurred behind
  // Action buttons: Resume, Restart, Quit
}
```

### Winner Form

Completion form after finding all characters:

```typescript
// From: frontend/src/components/WinnerFormModal/WinnerForm.tsx
const WinnerForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    await createGameCompletion({ playerName: name, timeTakenSeconds }, imageId)
    navigate(`/leaderboard/${imageId}`)
  }
}
```

## Rate Limiting

### Backend Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| Image upload | 10/hour | 60 min |
| Image list/view | 30/min | 60 sec |
| Game completion | 100/hour | 60 min |
| Leaderboard view | 60/min | 60 sec |
| General API | 1000/15min | 15 min |

These limits prevent abuse while allowing legitimate usage.

## Data Seeding

### Seeded Images

The database is pre-populated with 6 game scenes:

1. **The Siege Begins** - Medieval scene, 1 character (Waldo)
2. **The Toyport Invasion** - Toy dock scene, 1 character (Waldo)
3. **Robin Hood's Merry Mess-up** - Medieval chaos, 2 characters (Waldo, Odlaw)
4. **Kick-Off Chaos** - Soccer game, 4 characters (Waldo, Odlaw, Wizard, Wenda)
5. **The Green Maze** - Hedge maze, 5 characters (all)
6. **Roller Coasters** - Amusement park, 5 characters (all)

### Idempotent Seeding

Uses `prisma.image.upsert()` for safe re-seeding:

```typescript
// From: backend/src/seeds/seed.ts
await prisma.image.upsert({
  where: { name: image.name },
  update: { description: image.description },  // Update if exists
  create: image  // Create if not exists
})
```
