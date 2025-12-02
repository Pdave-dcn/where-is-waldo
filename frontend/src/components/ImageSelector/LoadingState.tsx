import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Loader } from "../ui/loader";

export const LoadingState = () => {
  return (
    <div className="flex items-center justify-center bg-accent py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-5xl">
          <CardContent className="p-8 flex items-center justify-center">
            <div className="text-center flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader />
              </motion.div>
              <motion.p
                className="mt-4 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading game...
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
