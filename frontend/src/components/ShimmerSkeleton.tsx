import { Skeleton } from "./ui/skeleton";
import { Loader } from "./ui/loader";

const ShimmerSkeleton = ({
  aspectRatio,
  className = "",
}: {
  aspectRatio: number;
  className?: string;
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Skeleton
        className="w-full"
        style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
      />

      {/* Loading indicator overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center bg-background/80 rounded-lg p-4">
          <Loader />
          <p className="mt-2 text-muted-foreground text-sm">
            Loading game image...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShimmerSkeleton;
