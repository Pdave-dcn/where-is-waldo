import { Loader } from "./ui/loader";

const ShimmerSkeleton = ({
  aspectRatio,
  className = "",
}: {
  aspectRatio: number;
  className?: string;
}) => {
  return (
    <div className={`relative w-full bg-muted overflow-hidden ${className}`}>
      <div
        className="w-full relative"
        style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer">
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted" />
        </div>

        {/* Loading indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-background/80 backdrop-blur-sm rounded-lg p-4">
            <Loader />
            <p className="mt-2 text-muted-foreground text-sm">
              Loading game image...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerSkeleton;
