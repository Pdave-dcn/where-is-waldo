import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "../ui/button";

interface LeaderboardErrorProps {
  onRetry: () => void;
}

export const LeaderboardError = ({ onRetry }: LeaderboardErrorProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <Alert variant="destructive" className="border-2">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-xl font-semibold">
            Failed to Load Leaderboard
          </AlertTitle>
          <AlertDescription className="text-base mt-2">
            We couldn't retrieve the leaderboard data. This could be due to a
            network issue or server error.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-3">
          <Button
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2"
            size="lg"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full"
            size="lg"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
