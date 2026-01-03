import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const LoadingState = () => {
  return (
    <div className="min-h-screen bg-accent">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Grid of Image Card Skeletons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="w-full aspect-square" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
