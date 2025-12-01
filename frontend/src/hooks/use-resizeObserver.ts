import { useEffect, type RefObject } from "react";

/**
 * Observes element size changes and triggers a callback.
 * Automatically debounced via ResizeObserver's native batching.
 */
export function useResizeObserver(
  ref: RefObject<HTMLImageElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const observer = new ResizeObserver(() => callback());
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, callback]);
}
