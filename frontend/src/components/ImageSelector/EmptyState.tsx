import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";

export const EmptyState = () => {
  return (
    <div className="flex items-center justify-center bg-accent py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-5xl">
          <CardContent className="p-8 text-center">
            <motion.h2
              className="text-2xl font-bold text-muted-foreground"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              No Game Data
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              No game data available.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
