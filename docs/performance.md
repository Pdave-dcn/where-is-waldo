# Performance Optimizations

Documentation of performance optimizations implemented in the codebase, with explanations of why they matter.

## Overview

The Where's Waldo frontend underwent a performance audit based on [Vercel's React Best Practices](https://vercel.com/blog/react-best-practices). Several optimizations were implemented to improve rendering performance, reduce bundle size, and optimize data fetching.

---

## Critical Optimizations

### 1. Timer Store - Interval in Closure

**File:** `frontend/src/stores/gameTimer.store.ts`

**Before (Anti-pattern):**

```typescript
interface TimerState {
  seconds: number;
  _intervalId: NodeJS.Timeout | null; // ❌ Stored in state!
  // ...
}
```

**After (Optimized):**

```typescript
export const useTimerStore = create<TimerState>()(
  devtools((set, get) => {
    // ✅ Interval ID in CLOSURE, not state
    let intervalId: ReturnType<typeof setInterval> | null = null;

    return {
      seconds: 0,
      // ... intervalId never touches state
    };
  }),
);
```

**Why it matters:**

- If `intervalId` were in state, every `setInterval` tick would trigger `useSyncExternalStore` updates
- ALL components subscribed to the store would receive a notification
- Result: Every second, CharacterMarkers, Timer, PauseOverlay, etc. all re-render unnecessarily
- With closure storage, only components reading `seconds` re-render

**Impact:** High - eliminates cascade re-renders every second during gameplay

---

### 2. Leaderboard Query - staleTime Configuration

**File:** `frontend/src/queries/leaderboard.query.ts`

**Before:**

```typescript
export const useLeaderboardQuery = (imageId: string) => {
  return useQuery({
    queryKey: ["leaderboard", imageId],
    queryFn: () => getLeaderboard(imageId),
    // ❌ No staleTime - defaults to 0 (always stale)
  });
};
```

**After:**

```typescript
export const useLeaderboardQuery = (imageId: string) => {
  return useQuery({
    queryKey: ["leaderboard", imageId],
    queryFn: () => getLeaderboard(imageId),
    staleTime: 5 * 60 * 1000, // ✅ 5 minutes
  });
};
```

**Why it matters:**

- Without `staleTime`, React Query considers data stale immediately
- Component mount triggers refetch even if data is fresh
- Results in unnecessary network requests and loading states

**Impact:** Medium - reduces API calls and improves perceived performance

---

### 3. CharacterMarkers - Memoization + Selector

**File:** `frontend/src/components/GameImage/CharacterMarkers.tsx`

**Before:**

```typescript
export const CharacterMarkers = ({ characterData }) => {
  const { isCharacterFound } = useGameProgressStore()
  // ❌ Destructures entire store

  return (
    <>
      {characterData.map(char =>
        isCharacterFound(char.characterName) && <FoundMark ... />
      )}
    </>
  )
}
```

**After:**

```typescript
const CharacterMarkersComponent = ({ characterData }) => {
  const foundCharacters = useGameProgressStore((s) => s.foundCharacters)
  // ✅ Only subscribes to foundCharacters Set

  return (
    <>
      {characterData.map(char =>
        foundCharacters.has(char.characterName) && <FoundMark ... />
      )}
    </>
  )
}

export const CharacterMarkers = memo(CharacterMarkersComponent)
// ✅ React.memo prevents re-render on parent state changes
```

**Why it matters:**

- `React.memo` prevents re-render when parent components update
- Selector subscription only triggers on `foundCharacters` changes
- Previously: re-rendered every second with timer tick

**Impact:** High - prevents ~60 unnecessary re-renders per minute during gameplay

---

### 4. ResizeObserver - Stable Callback

**File:** `frontend/src/hooks/use-resizeObserver.ts`

**Before:**

```typescript
useEffect(() => {
  const observer = new ResizeObserver(() => callback());
  // ❌ callback in deps - new reference each render
}, [ref, callback]);
```

**After:**

```typescript
const callbackRef = useRef(callback);
callbackRef.current = callback;

useEffect(() => {
  const observer = new ResizeObserver(() => callbackRef.current());
  // ✅ Stable callback reference
}, [ref]); // ✅ No callback dependency
```

**Why it matters:**

- Without the ref pattern, every render creates a new callback
- New callback = `useEffect` runs = ResizeObserver disconnects/reconnects
- Causes position recalculation loop and janky resize behavior

**Impact:** Medium - smooth image resize handling

---

### 5. CharacterList - Array Caching

**File:** `frontend/src/components/CharacterList.tsx`

**Before:**

```typescript
const CharacterList = () => {
  const { notFoundCharacters } = useGameProgressStore()

  return (
    <>
      {Array.from(notFoundCharacters).map(...) /* ❌ First call */}
      {Array.from(notFoundCharacters).map(...).length /* ❌ Second call */}
    </>
  )
}
```

**After:**

```typescript
const CharacterList = () => {
  const { notFoundCharacters } = useGameProgressStore()

  const characters = Array.from(notFoundCharacters)  // ✅ Cached
  const charactersLength = characters.length

  return (
    <>
      {characters.map(...)}
      {charactersLength > 0 && ...}
    </>
  )
}
```

**Why it matters:**

- `Set.toArray()` creates new array each call
- Called twice per render = double computation
- With large character sets, measurable overhead

**Impact:** Low-Medium - micro-optimization

---

### 6. Devtools - Environment Check

**Files:** All Zustand stores

**Before:**

```typescript
export const useTimerStore = create<TimerState>()(
  devtools(
    (set) => ({
      /* ... */
    }),
    { name: "Timer" }, // ❌ Always enabled
  ),
);
```

**After:**

```typescript
export const useTimerStore = create<TimerState>()(
  devtools(
    (set) => ({
      /* ... */
    }),
    process.env.NODE_ENV === "development" ? { name: "Timer" } : {},
    // ✅ Only in development
  ),
);
```

**Why it matters:**

- Redux DevTools integration adds overhead
- Message serialization for every state change
- Should not ship to production

**Impact:** Low-Medium in dev, cleaner production builds

---

## Bundle Optimizations

### Dynamic Imports (Future)

For modals that are rarely used:

```typescript
// Instead of:
import { HowToPlayModal } from "./HowToPlayModal"

// Use:
const HowToPlayModal = lazy(() => import("./HowToPlayModal"))

// Then wrap with Suspense:
<Suspense fallback={<Loader />}>
  {showModal && <HowToPlayModal />}
</Suspense>
```

### Barrel File Avoidance

The codebase avoids barrel exports (index files re-exporting everything). Import directly:

```typescript
// ❌ Avoid barrel imports
import { Button, Card, Dialog } from "@/components/ui";

// ✅ Import directly
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

---

## React Query Patterns

### SWR-Style Deduplication

React Query automatically deduplicates requests:

```typescript
// If 3 components call useLeaderboardQuery with same imageId:
// Only ONE network request is made
const { data } = useLeaderboardQuery(imageId);
```

### Prefetching

Image preloading on selection:

```typescript
// From: frontend/src/hooks/use-prefetchImage.ts
export const usePrefetchImage = () => {
  const queryClient = useQueryClient();

  return {
    prefetchImage: async (imageId: string) => {
      await queryClient.prefetchQuery({
        queryKey: ["image", imageId],
        queryFn: () => getImageById(imageId),
      });
    },
  };
};
```

---

## State Management Best Practices

### Selector Patterns

```typescript
// ❌ Subscribe to entire store
const { seconds, isRunning, isPaused } = useTimerStore();

// ✅ Subscribe to specific slices (primitive selectors)
// Each only re-renders when its specific value changes
const seconds = useTimerStore((s) => s.seconds);
const isRunning = useTimerStore((s) => s.isRunning);

// ⚠️ Object selectors need shallow comparison
// This would cause infinite loops without shallow:
const { seconds, isRunning } = useTimerStore((s) => ({
  seconds: s.seconds,
  isRunning: s.isRunning,
}));
```

### Cross-Store Coordination

Using `getState()` to avoid re-render cascades:

```typescript
// From: frontend/src/services/gameActions.service.ts
export const GameActions = {
  endGame: () => {
    const seconds = useTimerStore.getState().stop();
    useGameMetricsStore.getState().setSecondsTaken(seconds);
    useGameStatusStore.getState().setStatus("ENDED");
  },
};
```

---

## Performance Monitoring

### React DevTools Profiler

Use the Profiler to identify:

- Components re-rendering unnecessarily
- "Highlight updates" to see what changed
- Commit phases taking too long

### Zustand DevTools

In development, Zustand devtools shows:

- State changes with action names
- Timing of updates
- Which components subscribed to changes

### Metrics to Track

| Metric                    | Target | Measurement     |
| ------------------------- | ------ | --------------- |
| Time to Interactive (TTI) | < 2s   | Lighthouse      |
| First Contentful Paint    | < 1s   | Lighthouse      |
| Character marker render   | < 16ms | React Profiler  |
| Timer tick overhead       | < 1ms  | Performance API |

---

## Future Optimizations

### Recommended

1. **Virtual Scrolling** - For leaderboards with 100+ entries
2. **Image Optimization** - Next-gen formats (WebP/AVIF)
3. **Code Splitting** - Lazy load modals and pages
4. **Service Worker** - Offline caching of assets

### Lower Priority

1. **Transition Deferral** - Use `startTransition` for non-urgent updates
2. **Deferred Values** - Use `useDeferredValue` for search filtering
3. **Web Workers** - Offload position calculations
