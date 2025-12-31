import rateLimit, { type Options } from "express-rate-limit";

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
  skipFailedRequests?: boolean;
  skipSuccessfulRequests?: boolean;
}

const createRateLimiter = ({
  windowMs,
  max,
  message,
  skipFailedRequests = false,
  skipSuccessfulRequests = false,
}: RateLimitConfig) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests,
    skipSuccessfulRequests,
    message: {
      code: "RATE_LIMIT_EXCEEDED",
      message,
    },
  } satisfies Partial<Options>);
};

// Image upload (prevent spam/abuse)
const imageUploadLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: "Too many images uploaded. You can upload up to 10 images per hour.",
  skipFailedRequests: true, // Don't count failed uploads
});

// Game attempts (generous - allow players to play frequently)
const gameAttemptLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  message: "You've played a lot! Take a break and try again in an hour.",
  skipFailedRequests: true, // Don't count incomplete games
});

// Character validation (prevent spam clicking for coordinates)
const characterValidationLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
  message: "Too many clicks! Slow down and look carefully.",
});

// Leaderboard submission (after game completion)
const leaderboardSubmitLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  message: "Too many score submissions. Please try again later.",
  skipFailedRequests: true, // Only count successful submissions
});

// Leaderboard viewing (read-heavy, very generous)
const leaderboardViewLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: "Please wait a moment before refreshing the leaderboard.",
});

// Image selection/fetching
const imageSelectionLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: "Too many image requests. Please wait a moment.",
});

// General API
const generalApiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: "API rate limit exceeded. Please slow down.",
});

export {
  imageUploadLimiter,
  gameAttemptLimiter,
  characterValidationLimiter,
  leaderboardSubmitLimiter,
  leaderboardViewLimiter,
  imageSelectionLimiter,
  generalApiLimiter,
};
